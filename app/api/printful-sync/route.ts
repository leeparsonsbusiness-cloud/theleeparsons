import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get('secret');

  if (secret !== 'lee-printful-sync-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const printfulKey = process.env.PRINTFUL_API_KEY;
  const printfulStoreId = process.env.PRINTFUL_STORE_ID || '18755267';

  if (!printfulKey) {
    return NextResponse.json({ error: 'PRINTFUL_API_KEY not configured in env' }, { status: 500 });
  }

  try {
    // 1. Product templates
    const templatesRes = await fetch('https://api.printful.com/product-templates', {
      headers: {
        'Authorization': `Bearer ${printfulKey}`,
        'X-PF-Store-Id': printfulStoreId,
      },
    });
    const templatesData = await templatesRes.json();

    // 2. Orders list
    const ordersRes = await fetch('https://api.printful.com/orders?limit=10', {
      headers: {
        'Authorization': `Bearer ${printfulKey}`,
        'X-PF-Store-Id': printfulStoreId,
      },
    });
    const ordersData = await ordersRes.json();

    // 3. File library (to see if print files were uploaded)
    const filesRes = await fetch('https://api.printful.com/files?limit=10', {
      headers: {
        'Authorization': `Bearer ${printfulKey}`,
      },
    });
    const filesData = await filesRes.json();

    return NextResponse.json({
      templates: templatesData,
      orders: ordersData,
      files: filesData,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
