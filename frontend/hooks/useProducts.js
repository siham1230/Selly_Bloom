import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../services/product';
import { useAuthStore } from '../store/authStore';

// Query keys
export const productKeys = {
    all: ['products'],
    detail: (id) => ['products', id],
};

// Get all products
export const useProducts = () => {
    return useQuery({
        queryKey: productKeys.all,
        queryFn: async () => {
            const result = await getAllProducts();
            if (!result.success) {
                throw new Error(result.message);
            }
            return result.data;
        },
    });
};

// Get single product
export const useProduct = (id) => {
    return useQuery({
        queryKey: productKeys.detail(id),
        queryFn: async () => {
            console.log('useProduct hook - ID:', id);

            if (!id) {
                throw new Error('No product ID provided');
            }

            const result = await getProductById(id);

            if (!result.success) {
                throw new Error(result.message);
            }
            return result.data;
        },
        enabled: !!id,
        retry: 1,
    });
};

// Create product mutation
export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    const token = useAuthStore((state) => state.token);

    return useMutation({
        mutationFn: (productData) => createProduct(token, productData),
        onSuccess: () => {
            // Invalidate and refetch products
            queryClient.invalidateQueries({ queryKey: productKeys.all });
        },
    });
};

// Update product mutation
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    const token = useAuthStore((state) => state.token);

    return useMutation({
        mutationFn: ({ id, productData }) => updateProduct(token, id, productData),
        onSuccess: (data, variables) => {
            // Invalidate all products and specific product
            queryClient.invalidateQueries({ queryKey: productKeys.all });
            queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) });
        },
    });
};

// Delete product mutation
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    const token = useAuthStore((state) => state.token);

    return useMutation({
        mutationFn: (id) => deleteProduct(token, id),
        onSuccess: () => {
            // Invalidate products list
            queryClient.invalidateQueries({ queryKey: productKeys.all });
        },
    });
};