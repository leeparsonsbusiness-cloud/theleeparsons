import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { resolvePrintfulTarget } from '@/lib/printfulMapping';

export async function POST(req: Request) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ error: 'Stripe secret key missing' }, { status: 500 });
    }

    const stripe = new Stripe(stripeKey);
    const body = await req.text();
    const sig = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;

    if (webhookSecret && sig) {
      try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
      } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
      }
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      console.log('✅ Payment succeeded for Stripe Session:', session.id);
      console.log('Customer Email:', session.customer_details?.email);

      // Extract shipping information
      const shipping = session.collected_information?.shipping_details || session.shipping_details || session.customer_details;
      const address = shipping?.address;

      if (!address) {
        console.error('❌ No valid shipping address found for session:', session.id);
        return NextResponse.json({ error: 'Missing shipping address' }, { status: 400 });
      }

      const fullName = (shipping.name || session.customer_details?.name || 'Customer').trim();

      // 1. Resolve ordered items from session metadata or Stripe line items
      let rawItems: Array<{ productId: string; colorwayId: string; size: string; quantity: number }> = [];

      if (session.metadata?.orderItems) {
        try {
          rawItems = JSON.parse(session.metadata.orderItems);
        } catch (e) {
          console.warn('Failed to parse session metadata.orderItems, falling back to line items:', e);
        }
      }

      if (!rawItems.length) {
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
          expand: ['data.price.product']
        });

        rawItems = lineItems.data.map((item: any) => {
          const product = item.price?.product as Stripe.Product | undefined;
          const meta = product?.metadata || {};
          return {
            productId: meta.productId || 'shoutout-tee',
            colorwayId: meta.colorwayId || 'forest-green',
            size: meta.size || 'L',
            quantity: item.quantity || 1,
          };
        });
      }

      console.log('Normalized order items:', JSON.stringify(rawItems, null, 2));

      // 2. Map items to Printful Variant IDs & Print Files
      const printfulLineItems = rawItems.map((item) => {
        const target = resolvePrintfulTarget(item.productId, item.colorwayId, item.size);
        if (!target) {
          console.warn(`⚠️ No Printful variant match found for ${item.productId} / ${item.colorwayId} / ${item.size}`);
          return null;
        }

        return {
          variant_id: target.variantId,
          quantity: item.quantity,
          files: target.files,
          name: `SHOUTOUT ${target.colorName} - Size ${item.size}`,
        };
      }).filter(Boolean);

      // 3. Submit automated order directly to Printful Orders API
      const printfulKey = process.env.PRINTFUL_API_KEY;
      const printfulStoreId = process.env.PRINTFUL_STORE_ID || '18755267';

      if (printfulKey) {
        if (!printfulLineItems.length) {
          console.error('❌ All items lacked Printful variant mapping. Order logged for manual fulfillment.');
        } else {
          console.log(`🚀 Dispatching automated order to Printful (Store ID: ${printfulStoreId})...`);

          const printfulOrderPayload = {
            external_id: session.id,
            shipping: 'STANDARD',
            recipient: {
              name: fullName,
              address1: address.line1 || '',
              address2: address.line2 || undefined,
              city: address.city || '',
              state_code: address.state || '',
              country_code: address.country || 'US',
              zip: address.postal_code || '',
              phone: session.customer_details?.phone || undefined,
              email: session.customer_details?.email || undefined,
            },
            items: printfulLineItems,
            confirm: true, // Automatically charges billing method & sends to production queue
          };

          try {
            const printfulRes = await fetch('https://api.printful.com/orders?confirm=true', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${printfulKey}`,
                'X-PF-Store-Id': printfulStoreId,
              },
              body: JSON.stringify(printfulOrderPayload),
            });

            const printfulData = await printfulRes.json();

            if (printfulRes.ok && (printfulData.code === 200 || printfulData.code === 201)) {
              console.log('✅ Printful order automatically created and confirmed!');
              console.log('Order ID:', printfulData.result?.id);
              console.log('Order Status:', printfulData.result?.status);
              console.log('Total Cost Charged to Printful:', printfulData.result?.costs?.total);
            } else {
              console.error('❌ Printful API rejected order:', JSON.stringify(printfulData, null, 2));
            }
          } catch (pErr) {
            console.error('❌ Network error submitting order to Printful:', pErr);
          }
        }
      } else {
        console.warn('⚠️ PRINTFUL_API_KEY is not configured in environment variables.');
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
