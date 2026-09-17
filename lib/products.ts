export interface Colorway {
  id: string;
  name: string;
  colorName: string;
  hex: string;
  mockup: string;
  lifestyle: string;
  textColor: 'white' | 'black';
  stockLeft?: number;
}

export interface Product {
  id: string;
  name: string;
  type: 'tee' | 'hoodie';
  slug: string;
  tagline: string;
  price: number;
  priceCents: number;
  description: string;
  details: string[];
  sizes: string[];
  colorways: Colorway[];
}

export interface DisplayItem {
  id: string;
  productType: 'tee' | 'hoodie';
  productIndex: number;
  colorwayIndex: number;
  title: string;
  subtitle: string;
  price: number;
  mockup: string;
  colorHex: string;
  colorName: string;
  badge: string;
  stockLeft?: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 'shoutout-tee',
    name: 'SHOUTOUT HEAVYWEIGHT TEE',
    type: 'tee',
    slug: 'shoutout-tee',
    tagline: 'SHOUTOUT TO THE GAYS FOR LEAVING MORE CHICKS FOR ME',
    price: 27.99,
    priceCents: 2799,
    description: '7.5 oz Heavyweight boxy streetwear cut with relaxed drop shoulders, thick 1-inch tight-knit ribbed crewneck collar, and authentic garment-dyed mineral wash. Centered high-density direct-to-garment statement print.',
    details: [
      '7.5 oz Heavyweight 100% Combed Ringspun Cotton',
      'Thick 1" tight-knit ribbed crewneck collar',
      'Boxy oversized streetwear silhouette with drop shoulders',
      'Garment-dyed mineral wash with natural tonal depth',
      'High-density direct-to-garment statement print',
      'Pre-shrunk to maintain shape and fit'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colorways: [
      {
        id: 'washed-charcoal',
        name: 'Washed Charcoal',
        colorName: 'Vintage Faded Black',
        hex: '#2b2c30',
        mockup: '/mockups/washed-charcoal.png',
        lifestyle: '/lifestyle/lookbook-tee-charcoal.jpg',
        textColor: 'white',
        stockLeft: 4
      },
      {
        id: 'vintage-white',
        name: 'Vintage Bone',
        colorName: 'Unbleached Ecru',
        hex: '#e2ddcc',
        mockup: '/mockups/vintage-white.png',
        lifestyle: '/lifestyle/lookbook-tee-bone.jpg',
        textColor: 'black',
        stockLeft: 7
      },
      {
        id: 'forest-green',
        name: 'Faded Forest',
        colorName: 'Garment-Dyed Pine',
        hex: '#334839',
        mockup: '/mockups/forest-green.png',
        lifestyle: '/lifestyle/lookbook-tee-green.jpg',
        textColor: 'white',
        stockLeft: 6
      }
    ]
  },
  {
    id: 'shoutout-hoodie',
    name: 'SHOUTOUT HEAVYWEIGHT HOODIE',
    type: 'hoodie',
    slug: 'shoutout-hoodie',
    tagline: 'SHOUTOUT TO THE GAYS FOR LEAVING MORE CHICKS FOR ME',
    price: 49.99,
    priceCents: 4999,
    description: '10 oz Heavyweight premium streetwear fleece pullover. Double-layer hood, thick ribbed cuffs and waistband, front kangaroo pocket, and oversized relaxed silhouette. High-density center chest print.',
    details: [
      '10.0 oz Heavyweight 80% Cotton / 20% Polyester Fleece',
      'Double-layer 3-panel structured hood with round drawcords',
      'Heavy 1x1 ribbing at cuffs and waistband',
      'Spacious front kangaroo pouch pocket',
      'Relaxed oversized streetwear drape',
      'Fleece-lined interior for ultimate comfort'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colorways: [
      {
        id: 'washed-charcoal',
        name: 'Washed Charcoal',
        colorName: 'Vintage Faded Black',
        hex: '#2b2c30',
        mockup: '/mockups/hoodie-charcoal.png',
        lifestyle: '/lifestyle/lookbook-hoodie-charcoal.jpg',
        textColor: 'white',
        stockLeft: 2
      },
      {
        id: 'vintage-white',
        name: 'Vintage Bone',
        colorName: 'Unbleached Ecru',
        hex: '#e2ddcc',
        mockup: '/mockups/hoodie-vintage-white.png',
        lifestyle: '/lifestyle/lookbook-hoodie-bone.jpg',
        textColor: 'black',
        stockLeft: 4
      },
      {
        id: 'forest-green',
        name: 'Faded Forest',
        colorName: 'Garment-Dyed Pine',
        hex: '#334839',
        mockup: '/mockups/hoodie-forest-green.png',
        lifestyle: '/lifestyle/lookbook-hoodie-green.jpg',
        textColor: 'white',
        stockLeft: 5
      }
    ]
  }
];

export const DISPLAY_GRID_ITEMS: DisplayItem[] = [
  {
    id: 'tee-charcoal',
    productType: 'tee',
    productIndex: 0,
    colorwayIndex: 0,
    title: 'SHOUTOUT TEE',
    subtitle: 'Washed Charcoal (Faded Black)',
    price: 27.99,
    mockup: '/mockups/washed-charcoal.png',
    colorHex: '#2b2c30',
    colorName: 'Washed Charcoal',
    badge: '7.5 OZ HEAVYWEIGHT',
    stockLeft: 4
  },
  {
    id: 'tee-bone',
    productType: 'tee',
    productIndex: 0,
    colorwayIndex: 1,
    title: 'SHOUTOUT TEE',
    subtitle: 'Vintage Bone (Unbleached Ecru)',
    price: 27.99,
    mockup: '/mockups/vintage-white.png',
    colorHex: '#e2ddcc',
    colorName: 'Vintage Bone',
    badge: '7.5 OZ HEAVYWEIGHT',
    stockLeft: 7
  },
  {
    id: 'tee-forest',
    productType: 'tee',
    productIndex: 0,
    colorwayIndex: 2,
    title: 'SHOUTOUT TEE',
    subtitle: 'Faded Forest (Garment-Dyed Pine)',
    price: 27.99,
    mockup: '/mockups/forest-green.png',
    colorHex: '#334839',
    colorName: 'Faded Forest',
    badge: '7.5 OZ HEAVYWEIGHT',
    stockLeft: 6
  },
  {
    id: 'hoodie-charcoal',
    productType: 'hoodie',
    productIndex: 1,
    colorwayIndex: 0,
    title: 'SHOUTOUT HOODIE',
    subtitle: 'Washed Charcoal Pullover',
    price: 49.99,
    mockup: '/mockups/hoodie-charcoal.png',
    colorHex: '#2b2c30',
    colorName: 'Washed Charcoal',
    badge: '10.0 OZ FLEECE',
    stockLeft: 2
  },
  {
    id: 'hoodie-bone',
    productType: 'hoodie',
    productIndex: 1,
    colorwayIndex: 1,
    title: 'SHOUTOUT HOODIE',
    subtitle: 'Vintage Bone Pullover',
    price: 49.99,
    mockup: '/mockups/hoodie-vintage-white.png',
    colorHex: '#e2ddcc',
    colorName: 'Vintage Bone',
    badge: '10.0 OZ FLEECE',
    stockLeft: 4
  },
  {
    id: 'hoodie-forest',
    productType: 'hoodie',
    productIndex: 1,
    colorwayIndex: 2,
    title: 'SHOUTOUT HOODIE',
    subtitle: 'Faded Forest Pullover',
    price: 49.99,
    mockup: '/mockups/hoodie-forest-green.png',
    colorHex: '#334839',
    colorName: 'Faded Forest',
    badge: '10.0 OZ FLEECE',
    stockLeft: 5
  }
];
