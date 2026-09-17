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
    // 1. Fetch store info
    const storeRes = await fetch('https://api.printful.com/stores', {
      headers: {
        'Authorization': `Bearer ${printfulKey}`,
      },
    });
    const storeData = await storeRes.json();

    // 2. Fetch sync products in the store
    const productsRes = await fetch('https://api.printful.com/store/products', {
      headers: {
        'Authorization': `Bearer ${printfulKey}`,
        'X-PF-Store-Id': printfulStoreId,
      },
    });
    const productsData = await productsRes.json();

    // 3. For each product, get variants
    const detailedProducts = [];
    if (productsData.result && Array.isArray(productsData.result)) {
      for (const prod of productsData.result) {
        const detailRes = await fetch(`https://api.printful.com/store/products/${prod.id}`, {
          headers: {
            'Authorization': `Bearer ${printfulKey}`,
            'X-PF-Store-Id': printfulStoreId,
          },
        });
        const detailData = await detailRes.json();
        detailedProducts.push(detailData.result);
      }
    }

    return NextResponse.json({
      storeId: printfulStoreId,
      stores: storeData,
      syncProductsList: productsData,
      detailedProducts,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
