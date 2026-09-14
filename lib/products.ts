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
  slug: string;
  tagline: string;
  price: number;
  priceCents: number;
  description: string;
  details: string[];
  sizes: string[];
  colorways: Colorway[];
}

export const MAIN_PRODUCT: Product = {
  id: 'theleeparsons-shoutout-tee',
  name: 'SHOUTOUT TEE',
  slug: 'shoutout-tee',
  tagline: 'SHOUTOUT TO ALL THE GAYS THAT SAVE MORE CHICKS FOR ME',
  price: 25,
  priceCents: 2500,
  description: 'Heavyweight 7.5 oz boxy streetwear cut with relaxed drop shoulders, thick 1-inch ribbed collar, and authentic garment-dyed mineral wash. Centered high-density direct-to-garment statement print.',
  details: [
    '7.5 oz Heavyweight 100% Combed Cotton',
    'Thick 1" tight-knit ribbed crewneck collar',
    'Boxy oversized streetwear silhouette',
    'Garment-dyed mineral wash with natural tonal variation',
    'Crisp, durable direct-to-garment print',
    'Pre-shrunk to maintain fit'
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
};
