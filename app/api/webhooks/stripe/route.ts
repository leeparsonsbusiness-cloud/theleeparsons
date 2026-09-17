import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { resolvePrintifyTarget } from '@/lib/printifyMapping';

export async function POST(req: Request) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ error: 'Stripe key missing' }, { status: 500 });
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
      const nameParts = fullName.split(/\s+/);
      const firstName = nameParts[0] || 'Valued';
      const lastName = nameParts.slice(1).join(' ') || 'Customer';

      // 1. Resolve ordered items
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
            colorwayId: meta.colorwayId || 'washed-charcoal',
            size: meta.size || 'L',
            quantity: item.quantity || 1,
          };
        });
      }

      console.log('Normalized order items:', JSON.stringify(rawItems, null, 2));

      // 2. Map items to Printify Product and Variant IDs
      const printifyLineItems = rawItems.map((item) => {
        const target = resolvePrintifyTarget(item.productId, item.colorwayId, item.size);
        if (!target) {
          console.warn(`⚠️ No Printify variant match found for ${item.productId} / ${item.colorwayId} / ${item.size}`);
          return null;
        }
        return {
          product_id: target.productId,
          variant_id: target.variantId,
          quantity: item.quantity,
        };
      }).filter(Boolean);

      // 3. Submit to Printify Orders API
      const printifyKey = process.env.PRINTIFY_API_KEY;
      const printifyShopId = process.env.PRINTIFY_SHOP_ID;

      if (printifyKey && printifyShopId) {
        if (!printifyLineItems.length) {
          console.error('❌ All items lacked Printify variant mapping. Order logged for manual fulfillment.');
        } else {
          console.log(`🚀 Sending order to Printify for Shop ${printifyShopId}...`);

          const printifyOrderPayload = {
            external_id: session.id,
            label: `Order #${session.id.slice(-8).toUpperCase()}`,
            line_items: printifyLineItems,
            shipping_method: 1,
            send_shipping_notification: true,
            address_to: {
              first_name: firstName,
              last_name: lastName,
              email: session.customer_details?.email || '',
              phone: session.customer_details?.phone || '',
              country: address.country || 'US',
              region: address.state || '',
              address1: address.line1 || '',
              address2: address.line2 || '',
              city: address.city || '',
              zip: address.postal_code || '',
            },
          };

          try {
            const printifyRes = await fetch(`https://api.printify.com/v1/shops/${printifyShopId}/orders.json`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${printifyKey}`,
              },
              body: JSON.stringify(printifyOrderPayload),
            });

            const printifyData = await printifyRes.json();
            if (printifyRes.ok) {
              console.log('✅ Printify order created successfully! Order ID:', printifyData.id);
            } else {
              console.error('❌ Printify API returned error:', JSON.stringify(printifyData, null, 2));
            }
          } catch (pErr) {
            console.error('❌ Network error submitting to Printify API:', pErr);
          }
        }
      } else {
        console.warn('⚠️ PRINTIFY_API_KEY or PRINTIFY_SHOP_ID not yet set in environment. Order recorded for fulfillment.');
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

