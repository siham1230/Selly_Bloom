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
                set({ token: null, user: null, loading: false });
            },

            setLoading: (status) => set({ loading: status }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);