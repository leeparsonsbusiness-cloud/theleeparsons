import { NextResponse } from 'next/server';
import Stripe from 'stripe';

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
      // Parse payload
      event = JSON.parse(body) as Stripe.Event;
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      console.log('✅ Payment succeeded for Stripe Session:', session.id);
      console.log('Customer Email:', session.customer_details?.email);
      console.log('Customer Shipping:', JSON.stringify(session.shipping_details || session.customer_details, null, 2));

      // Retrieve detailed line items
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      console.log('Ordered items:', JSON.stringify(lineItems.data, null, 2));

      // Check if Printify API credentials are configured
      const printifyKey = process.env.PRINTIFY_API_KEY;
      const printifyShopId = process.env.PRINTIFY_SHOP_ID;

      if (printifyKey && printifyShopId) {
        console.log('Triggering Printify automated fulfillment...');
        const shipping = session.shipping_details || session.customer_details;
        const address = shipping?.address;

        if (address) {
          const printifyOrderPayload = {
            external_id: session.id,
            label: `Order ${session.id.slice(-8)}`,
            line_items: lineItems.data.map((item) => ({
              product_id: (item.price?.product as any)?.metadata?.printifyProductId || undefined,
              variant_id: Number((item.price?.product as any)?.metadata?.printifyVariantId) || undefined,
              quantity: item.quantity || 1,
            })).filter(i => i.product_id && i.variant_id),
            shipping_method: 1,
            send_shipping_notification: true,
            address_to: {
              first_name: shipping.name?.split(' ')[0] || 'Customer',
              last_name: shipping.name?.split(' ').slice(1).join(' ') || 'Customer',
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
            console.log('Printify API response:', printifyData);
          } catch (pErr) {
            console.error('Failed to send order to Printify API:', pErr);
          }
        }
      } else {
        console.log('Printify keys not yet configured in environment variables. Order details logged above for fulfillment.');
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
