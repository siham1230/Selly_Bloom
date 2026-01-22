import { create } from 'zustand';

export const usePaymentStore = create((set) => ({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
    paymentMethod: 'cash',
    totalAmount: 65.99,

    setFullName: (name) => set({ fullName: name }),
    setPhone: (phone) => set({ phone }),
    setCity: (city) => set({ city }),
    setAddress: (address) => set({ address }),
    setNotes: (notes) => set({ notes }),
    setPaymentMethod: (method) => set({ paymentMethod: method }),

    resetPaymentData: () => set({
        fullName: '',
        phone: '',
        city: '',
        address: '',
        notes: '',
        paymentMethod: 'cash',
    }),
}));
