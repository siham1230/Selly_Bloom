import { instance } from "./instance";

export const getAllProducts = async () => {
    try {
        const res = await instance.get("api/products");
        return {
            success: true,
            data: res.data.products
        };
    } catch (error) {
        console.error('Get products error:', error);
        return {
            success: false,
            message: error.response?.data?.error || "Failed to fetch products"
        };
    }
};

export const getProductById = async (id) => {
    try {
        console.log('Fetching product ID:', id)

        const res = await instance.get(`api/products/${id}`);
        console.log('Product response:', res.data);

        return {
            success: true,
            data: res.data.product
        };
    } catch (error) {
        console.error('Get product error:', error);
        console.error('Error details:', error.response?.data);

        return {
            success: false,
            message: error.response?.data?.error || "Failed to fetch product"
        };
    }
};

export const createProduct = async (token, productData) => {
    try {
        const res = await instance.post("api/products", productData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {
            success: true,
            data: res.data.product,
            message: res.data.message
        };
    } catch (error) {
        console.error('Create product error:', error);
        return {
            success: false,
            message: error.response?.data?.error || "Failed to create product"
        };
    }
};

export const updateProduct = async (token, id, productData) => {
    try {
        const res = await instance.put(`api/products/${id}`, productData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {
            success: true,
            data: res.data.product,
            message: res.data.message
        };
    } catch (error) {
        console.error('Update product error:', error);
        return {
            success: false,
            message: error.response?.data?.error || "Failed to update product"
        };
    }
};

export const deleteProduct = async (token, id) => {
    try {
        const res = await instance.delete(`api/products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {
            success: true,
            message: res.data.message
        };
    } catch (error) {
        console.error('Delete product error:', error);
        return {
            success: false,
            message: error.response?.data?.error || "Failed to delete product"
        };
    }
};
