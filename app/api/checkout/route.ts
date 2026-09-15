import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ error: 'Stripe secret key not configured in environment variables' }, { status: 500 });
    }

    const stripe = new Stripe(stripeKey);

    const body = await req.json();
    const { items } = body;

    if (!items || !items.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const origin = req.headers.get('origin') || 'https://theleeparsons.com';
    const totalItems = items.reduce((sum: number, i: any) => sum + i.quantity, 0);
    const isFreeShipping = totalItems >= 2;

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${item.name} (${item.colorwayName} - Size ${item.size})`,
          description: 'SHOUTOUT TO THE GAYS FOR LEAVING MORE CHICKS FOR ME - Premium Streetwear',
          images: item.image && item.image.startsWith('http') ? [item.image] : [`${origin}${item.image}`],
          metadata: {
            colorway: item.colorwayId,
            size: item.size,
          }
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const shipping_options: any[] = isFreeShipping
      ? [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: 0, currency: 'usd' },
              display_name: 'Free US Shipping (2+ Items Promo)',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 5 },
                maximum: { unit: 'business_day', value: 8 },
              },
            },
          },
        ]
      : [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: 500, currency: 'usd' },
              display_name: 'Standard US Shipping (5-8 Business Days)',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 5 },
                maximum: { unit: 'business_day', value: 8 },
              },
            },
          },
        ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
      shipping_options,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
      metadata: {
        orderSource: 'theleeparsons.com',
        promoApplied: isFreeShipping ? 'FREE_SHIPPING_2_PLUS' : 'NONE',
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}
