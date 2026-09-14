export interface Colorway {
  id: string;
  name: string;
  colorName: string;
  hex: string;
  mockup: string;
  lifestyle: string;
  textColor: 'white' | 'black';
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
        lifestyle: '/lifestyle/fitgrid-charcoal.jpg',
        textColor: 'white'
      },
      {
        id: 'vintage-white',
        name: 'Vintage Bone',
        colorName: 'Unbleached Ecru',
        hex: '#e2ddcc',
        mockup: '/mockups/vintage-white.png',
        lifestyle: '/lifestyle/flatlay-white.jpg',
        textColor: 'black'
      },
      {
        id: 'forest-green',
        name: 'Faded Forest',
        colorName: 'Garment-Dyed Pine',
        hex: '#334839',
        mockup: '/lifestyle/macro-green.jpg',
        lifestyle: '/lifestyle/macro-green.jpg',
        textColor: 'white'
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
        lifestyle: '/mockups/hoodie-charcoal.png',
        textColor: 'white'
      },
      {
        id: 'vintage-white',
        name: 'Vintage Bone',
        colorName: 'Unbleached Ecru',
        hex: '#e2ddcc',
        mockup: '/mockups/hoodie-vintage-white.png',
        lifestyle: '/mockups/hoodie-vintage-white.png',
        textColor: 'black'
      },
      {
        id: 'forest-green',
        name: 'Faded Forest',
        colorName: 'Garment-Dyed Pine',
        hex: '#334839',
        mockup: '/lifestyle/macro-green.jpg',
        lifestyle: '/lifestyle/macro-green.jpg',
        textColor: 'white'
      }
    ]
  }
];
