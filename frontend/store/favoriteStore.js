import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useFavoriteStore = create(
    persist(
        (set, get) => ({
            favorites: [],

            addFavorite: (product) => {
                const exists = get().favorites.find((i) => i.id === product.id);
                if (!exists) {
                    set((state) => ({
                        favorites: [...state.favorites, product],
                    }));
                }
            },

            removeFavorite: (id) => {
                set((state) => ({
                    favorites: state.favorites.filter((item) => item.id !== id),
                }));
            },

            isFavorite: (id) => {
                return get().favorites.some((item) => item.id === id);
            },
            clearFavorites: () => set({ favorites: [] }),

        }),
        {
            name: 'favorite-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);