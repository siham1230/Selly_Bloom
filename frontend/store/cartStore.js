import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],

            addToCart: (product) =>
                set((state) => {
                    const existing = state.items.find((i) => i.id === product.id);
                    // items: [...state.items, product],
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.id === product.id
                                    ? { ...i, quantity: i.quantity + 1 }
                                    : i
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { ...product, quantity: 1 }],
                    };
                }),

            increaseQty: (id) =>
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === id
                            ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                })),

            decreaseQty: (id) =>
                set((state) => ({
                    items: state.items
                        .map((i) =>
                            i.id === id
                                ? { ...i, quantity: i.quantity - 1 } : i
                        )
                        .filter((i) => i.quantity > 0),
                })),


            removeFromCart: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),

            clearCart: () => set({ items: [] }),


            getTotalItems: () =>
                get().items.reduce((total, item) => total + item.quantity, 0),

            getTotalPrice: () =>
                get().items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                ),
        }),

        {
            name: 'cart-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
