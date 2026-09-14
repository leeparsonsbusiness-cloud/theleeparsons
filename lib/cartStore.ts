import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  colorwayId: string;
  colorwayName: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity' | 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (newItem) => {
        const id = `${newItem.productId}-${newItem.colorwayId}-${newItem.size}`;
        const existing = get().items.find(i => i.id === id);
        if (existing) {
          set({
            items: get().items.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i),
            isOpen: true
          });
        } else {
          set({
            items: [...get().items, { ...newItem, id, quantity: 1 }],
            isOpen: true
          });
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter(i => i.id !== id) });
      },
      updateQuantity: (id, delta) => {
        set({
          items: get().items.map(i => {
            if (i.id === id) {
              const q = i.quantity + delta;
              return q > 0 ? { ...i, quantity: q } : null;
            }
            return i;
          }).filter(Boolean) as CartItem[]
        });
      },
      clearCart: () => set({ items: [] }),
      totalPrice: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      totalCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'theleeparsons-cart-v1',
    }
  )
);
