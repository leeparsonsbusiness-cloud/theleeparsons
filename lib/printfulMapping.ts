/**
 * Printful Product & Variant Mapping Configuration
 * Maps website items (product, colorway, size) to Printful catalog variant IDs and artwork files.
 */

export interface PrintfulFile {
  id?: number;
  url?: string;
  type: 'default';
}

export interface PrintfulVariantTarget {
  variantId: number;
  productId: number;
  colorName: string;
  files: PrintfulFile[];
}

export const PRINTFUL_FILES = {
  whiteText: {
    id: 1068746753,
    url: 'https://theleeparsons.com/design/SHOUTOUT_PRINT_WHITE_4500x5400.png',
    type: 'default' as const,
  },
  blackText: {
    url: 'https://theleeparsons.com/design/SHOUTOUT_PRINT_BLACK_4500x5400.png',
    type: 'default' as const,
  },
};

/**
 * Printful Catalog Map: [productId][colorwayId][size] -> PrintfulVariantTarget
 * - Gildan 5000 Unisex Classic Tee (Product ID: 438)
 * - Gildan 18500 Unisex Heavy Blend Hoodie (Product ID: 146)
 */
export const PRINTFUL_MAP: Record<string, Record<string, Record<string, PrintfulVariantTarget>>> = {
  'shoutout-tee': {
    'forest-green': {
      'S': { variantId: 20453, productId: 438, colorName: 'Forest Green', files: [PRINTFUL_FILES.whiteText] },
      'M': { variantId: 20454, productId: 438, colorName: 'Forest Green', files: [PRINTFUL_FILES.whiteText] },
      'L': { variantId: 20455, productId: 438, colorName: 'Forest Green', files: [PRINTFUL_FILES.whiteText] },
      'XL': { variantId: 20456, productId: 438, colorName: 'Forest Green', files: [PRINTFUL_FILES.whiteText] },
      '2XL': { variantId: 20457, productId: 438, colorName: 'Forest Green', files: [PRINTFUL_FILES.whiteText] },
      '3XL': { variantId: 20458, productId: 438, colorName: 'Forest Green', files: [PRINTFUL_FILES.whiteText] },
    },
    'washed-charcoal': {
      'S': { variantId: 15831, productId: 438, colorName: 'Charcoal', files: [PRINTFUL_FILES.whiteText] },
      'M': { variantId: 15832, productId: 438, colorName: 'Charcoal', files: [PRINTFUL_FILES.whiteText] },
      'L': { variantId: 15833, productId: 438, colorName: 'Charcoal', files: [PRINTFUL_FILES.whiteText] },
      'XL': { variantId: 15834, productId: 438, colorName: 'Charcoal', files: [PRINTFUL_FILES.whiteText] },
      '2XL': { variantId: 15835, productId: 438, colorName: 'Charcoal', files: [PRINTFUL_FILES.whiteText] },
      '3XL': { variantId: 15836, productId: 438, colorName: 'Charcoal', files: [PRINTFUL_FILES.whiteText] },
    },
    'vintage-white': {
      'S': { variantId: 11556, productId: 438, colorName: 'Natural', files: [PRINTFUL_FILES.blackText] },
      'M': { variantId: 11557, productId: 438, colorName: 'Natural', files: [PRINTFUL_FILES.blackText] },
      'L': { variantId: 11558, productId: 438, colorName: 'Natural', files: [PRINTFUL_FILES.blackText] },
      'XL': { variantId: 11559, productId: 438, colorName: 'Natural', files: [PRINTFUL_FILES.blackText] },
      '2XL': { variantId: 11560, productId: 438, colorName: 'Natural', files: [PRINTFUL_FILES.blackText] },
      '3XL': { variantId: 16246, productId: 438, colorName: 'Natural', files: [PRINTFUL_FILES.blackText] },
    },
  },
  'shoutout-hoodie': {
    'forest-green': {
      'S': { variantId: 20570, productId: 146, colorName: 'Forest Green', files: [PRINTFUL_FILES.whiteText] },
      'M': { variantId: 20571, productId: 146, colorName: 'Forest Green', files: [PRINTFUL_FILES.whiteText] },
      'L': { variantId: 20572, productId: 146, colorName: 'Forest Green', files: [PRINTFUL_FILES.whiteText] },
      'XL': { variantId: 20573, productId: 146, colorName: 'Forest Green', files: [PRINTFUL_FILES.whiteText] },
      '2XL': { variantId: 20574, productId: 146, colorName: 'Forest Green', files: [PRINTFUL_FILES.whiteText] },
      '3XL': { variantId: 20575, productId: 146, colorName: 'Forest Green', files: [PRINTFUL_FILES.whiteText] },
    },
    'washed-charcoal': {
      'S': { variantId: 16859, productId: 146, colorName: 'Charcoal', files: [PRINTFUL_FILES.whiteText] },
      'M': { variantId: 16860, productId: 146, colorName: 'Charcoal', files: [PRINTFUL_FILES.whiteText] },
      'L': { variantId: 16861, productId: 146, colorName: 'Charcoal', files: [PRINTFUL_FILES.whiteText] },
      'XL': { variantId: 16862, productId: 146, colorName: 'Charcoal', files: [PRINTFUL_FILES.whiteText] },
      '2XL': { variantId: 16863, productId: 146, colorName: 'Charcoal', files: [PRINTFUL_FILES.whiteText] },
      '3XL': { variantId: 16864, productId: 146, colorName: 'Charcoal', files: [PRINTFUL_FILES.whiteText] },
    },
    'vintage-white': {
      'S': { variantId: 12997, productId: 146, colorName: 'Sand', files: [PRINTFUL_FILES.blackText] },
      'M': { variantId: 12998, productId: 146, colorName: 'Sand', files: [PRINTFUL_FILES.blackText] },
      'L': { variantId: 12999, productId: 146, colorName: 'Sand', files: [PRINTFUL_FILES.blackText] },
      'XL': { variantId: 13000, productId: 146, colorName: 'Sand', files: [PRINTFUL_FILES.blackText] },
      '2XL': { variantId: 13001, productId: 146, colorName: 'Sand', files: [PRINTFUL_FILES.blackText] },
      '3XL': { variantId: 13002, productId: 146, colorName: 'Sand', files: [PRINTFUL_FILES.blackText] },
    },
  },
};

/**
 * Resolves Printful target (variantId, files, details) from item attributes with robust normalization.
 */
export function resolvePrintfulTarget(
  productId?: string,
  colorwayId?: string,
  size?: string
): PrintfulVariantTarget | null {
  const normProduct = (productId || '').toLowerCase().includes('hoodie') ? 'shoutout-hoodie' : 'shoutout-tee';

  // Normalize colorway
  let normColor = (colorwayId || '').toLowerCase().trim();
  if (normColor.includes('green') || normColor.includes('forest') || normColor.includes('pine')) {
    normColor = 'forest-green';
  } else if (normColor.includes('white') || normColor.includes('bone') || normColor.includes('ecru') || normColor.includes('sand') || normColor.includes('natural')) {
    normColor = 'vintage-white';
  } else {
    // Default to washed-charcoal for dark/charcoal/black
    normColor = 'washed-charcoal';
  }

  // Normalize size
  let normSize = (size || 'L').toUpperCase().trim();
  if (normSize === 'SMALL') normSize = 'S';
  else if (normSize === 'MEDIUM') normSize = 'M';
  else if (normSize === 'LARGE') normSize = 'L';
  else if (normSize === 'EXTRA LARGE' || normSize === 'X-LARGE') normSize = 'XL';
  else if (normSize === 'XXL' || normSize === '2X-LARGE') normSize = '2XL';
  else if (normSize === 'XXXL' || normSize === '3X-LARGE') normSize = '3XL';

  const productGroup = PRINTFUL_MAP[normProduct];
  if (!productGroup) return null;

  const colorGroup = productGroup[normColor];
  if (!colorGroup) return null;

  const target = colorGroup[normSize];
  return target || null;
}
