/**
 * Printify Product and Variant Mapping Configuration
 * Maps store products, colorways, and sizes to Printify product_id and variant_id.
 */

export interface PrintifyVariantTarget {
  productId: string; // Printify Product ID (e.g. "66e5a...")
  variantId: number; // Printify numerical Variant ID (e.g. 12345)
  title?: string;
}

// Structured mapping: [productId][colorwayId][size] -> PrintifyVariantTarget
export type PrintifyCatalogMap = Record<string, Record<string, Record<string, PrintifyVariantTarget>>>;

/**
 * Static mapping table. Can be updated manually or automatically synced via scripts/syncPrintifyVariants.js
 */
export const PRINTIFY_MAP: PrintifyCatalogMap = {
  'shoutout-tee': {
    'washed-charcoal': {
      'S': { productId: process.env.PRINTIFY_TEE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_TEE_CHARCOAL_S) || 0 },
      'M': { productId: process.env.PRINTIFY_TEE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_TEE_CHARCOAL_M) || 0 },
      'L': { productId: process.env.PRINTIFY_TEE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_TEE_CHARCOAL_L) || 0 },
      'XL': { productId: process.env.PRINTIFY_TEE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_TEE_CHARCOAL_XL) || 0 },
      '2XL': { productId: process.env.PRINTIFY_TEE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_TEE_CHARCOAL_2XL) || 0 },
      '3XL': { productId: process.env.PRINTIFY_TEE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_TEE_CHARCOAL_3XL) || 0 },
    },
    'vintage-white': {
      'S': { productId: process.env.PRINTIFY_TEE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_TEE_WHITE_S) || 0 },
      'M': { productId: process.env.PRINTIFY_TEE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_TEE_WHITE_M) || 0 },
      'L': { productId: process.env.PRINTIFY_TEE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_TEE_WHITE_L) || 0 },
      'XL': { productId: process.env.PRINTIFY_TEE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_TEE_WHITE_XL) || 0 },
      '2XL': { productId: process.env.PRINTIFY_TEE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_TEE_WHITE_2XL) || 0 },
      '3XL': { productId: process.env.PRINTIFY_TEE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_TEE_WHITE_3XL) || 0 },
    },
    'forest-green': {
      'S': { productId: process.env.PRINTIFY_TEE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_TEE_GREEN_S) || 0 },
      'M': { productId: process.env.PRINTIFY_TEE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_TEE_GREEN_M) || 0 },
      'L': { productId: process.env.PRINTIFY_TEE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_TEE_GREEN_L) || 0 },
      'XL': { productId: process.env.PRINTIFY_TEE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_TEE_GREEN_XL) || 0 },
      '2XL': { productId: process.env.PRINTIFY_TEE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_TEE_GREEN_2XL) || 0 },
      '3XL': { productId: process.env.PRINTIFY_TEE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_TEE_GREEN_3XL) || 0 },
    },
  },
  'shoutout-hoodie': {
    'washed-charcoal': {
      'S': { productId: process.env.PRINTIFY_HOODIE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_HOODIE_CHARCOAL_S) || 0 },
      'M': { productId: process.env.PRINTIFY_HOODIE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_HOODIE_CHARCOAL_M) || 0 },
      'L': { productId: process.env.PRINTIFY_HOODIE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_HOODIE_CHARCOAL_L) || 0 },
      'XL': { productId: process.env.PRINTIFY_HOODIE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_HOODIE_CHARCOAL_XL) || 0 },
      '2XL': { productId: process.env.PRINTIFY_HOODIE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_HOODIE_CHARCOAL_2XL) || 0 },
      '3XL': { productId: process.env.PRINTIFY_HOODIE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_HOODIE_CHARCOAL_3XL) || 0 },
    },
    'vintage-white': {
      'S': { productId: process.env.PRINTIFY_HOODIE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_HOODIE_WHITE_S) || 0 },
      'M': { productId: process.env.PRINTIFY_HOODIE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_HOODIE_WHITE_M) || 0 },
      'L': { productId: process.env.PRINTIFY_HOODIE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_HOODIE_WHITE_L) || 0 },
      'XL': { productId: process.env.PRINTIFY_HOODIE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_HOODIE_WHITE_XL) || 0 },
      '2XL': { productId: process.env.PRINTIFY_HOODIE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_HOODIE_WHITE_2XL) || 0 },
      '3XL': { productId: process.env.PRINTIFY_HOODIE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_HOODIE_WHITE_3XL) || 0 },
    },
    'forest-green': {
      'S': { productId: process.env.PRINTIFY_HOODIE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_HOODIE_GREEN_S) || 0 },
      'M': { productId: process.env.PRINTIFY_HOODIE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_HOODIE_GREEN_M) || 0 },
      'L': { productId: process.env.PRINTIFY_HOODIE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_HOODIE_GREEN_L) || 0 },
      'XL': { productId: process.env.PRINTIFY_HOODIE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_HOODIE_GREEN_XL) || 0 },
      '2XL': { productId: process.env.PRINTIFY_HOODIE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_HOODIE_GREEN_2XL) || 0 },
      '3XL': { productId: process.env.PRINTIFY_HOODIE_PRODUCT_ID || '', variantId: Number(process.env.PRINTIFY_HOODIE_GREEN_3XL) || 0 },
    },
  },
};

/**
 * Resolves Printify product ID and variant ID from item details with robust normalization
 */
export function resolvePrintifyTarget(
  productId: string,
  colorwayId: string,
  size: string
): PrintifyVariantTarget | null {
  const normProduct = productId.toLowerCase().includes('hoodie') ? 'shoutout-hoodie' : 'shoutout-tee';
  
  // Normalize colorway
  let normColor = colorwayId.toLowerCase();
  if (normColor.includes('green') || normColor.includes('forest')) normColor = 'forest-green';
  else if (normColor.includes('white') || normColor.includes('bone') || normColor.includes('ecru')) normColor = 'vintage-white';
  else if (normColor.includes('charcoal') || normColor.includes('black')) normColor = 'washed-charcoal';

  // Normalize size (e.g. "large" -> "L", "2xl" -> "2XL")
  let normSize = size.toUpperCase().trim();
  if (normSize === 'SMALL') normSize = 'S';
  else if (normSize === 'MEDIUM') normSize = 'M';
  else if (normSize === 'LARGE') normSize = 'L';
  else if (normSize === 'EXTRA LARGE' || normSize === 'X-LARGE') normSize = 'XL';
  else if (normSize === 'XXL' || normSize === '2X-LARGE') normSize = '2XL';
  else if (normSize === 'XXXL' || normSize === '3X-LARGE') normSize = '3XL';

  const productGroup = PRINTIFY_MAP[normProduct];
  if (!productGroup) return null;

  const colorGroup = productGroup[normColor];
  if (!colorGroup) return null;

  const target = colorGroup[normSize];
  if (!target || !target.productId || !target.variantId) return null;

  return target;
}
