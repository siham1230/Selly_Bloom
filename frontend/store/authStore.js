import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,

            loading: true,

            setAuth: (user, token) => {
                set({ user, token, loading: false });
            },

            logout: () => {
                // No need to manually call AsyncStorage.removeItem!
                set({ token: null, user: null });
            },

            setLoading: (status) => set({ loading: status }),
        }),
        {
            name: 'auth-storage', // unique name for the item in storage
            storage: createJSONStorage(() => AsyncStorage), // use AsyncStorage for React Native
        }
    )
);