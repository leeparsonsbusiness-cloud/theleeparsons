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
      event = JSON.parse(body) as Stripe.Event;
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      console.log('✅ Payment succeeded for Stripe Session:', session.id);
      console.log('Customer Email:', session.customer_details?.email);
      console.log('Customer Shipping:', JSON.stringify(session.shipping_details || session.customer_details, null, 2));

      // Retrieve line items
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      console.log('Ordered items:', JSON.stringify(lineItems.data, null, 2));

      // 1. Printful Fulfillment API Sync
      const printfulKey = process.env.PRINTFUL_API_KEY;
      const printfulStoreId = process.env.PRINTFUL_STORE_ID || '18755267';

      if (printfulKey) {
        console.log('Triggering Printful automated fulfillment...');
        const shipping = session.shipping_details || session.customer_details;
        const address = shipping?.address;

        if (address) {
          const printfulOrderPayload = {
            external_id: session.id,
            shipping: 'STANDARD',
            recipient: {
              name: shipping.name || 'Valued Customer',
              address1: address.line1 || '',
              address2: address.line2 || '',
              city: address.city || '',
              state_code: address.state || '',
              country_code: address.country || 'US',
              zip: address.postal_code || '',
              email: session.customer_details?.email || '',
              phone: session.customer_details?.phone || '',
            },
            items: lineItems.data.map((item) => ({
              name: item.description || 'Shoutout Streetwear Garment',
              quantity: item.quantity || 1,
              retail_price: ((item.amount_total || 2799) / 100 / (item.quantity || 1)).toFixed(2),
            })),
            retail_costs: {
              currency: 'USD',
              total: ((session.amount_total || 0) / 100).toFixed(2),
            },
          };

          try {
            const printfulRes = await fetch('https://api.printful.com/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${printfulKey}`,
                'X-PF-Store-Id': printfulStoreId,
              },
              body: JSON.stringify(printfulOrderPayload),
            });

            const printfulData = await printfulRes.json();
            console.log('Printful API order response:', JSON.stringify(printfulData, null, 2));
          } catch (pErr) {
            console.error('Failed to send order to Printful API:', pErr);
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
