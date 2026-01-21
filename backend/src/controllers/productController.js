import Product from '../models/Product.js';
import sequelize from '../config/database.js';


export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, image, tags } = req.body;

        if (!name || price == null || stock == null) {
            return res.status(400).json({
                error: 'Required fields are messing'
            });
        }
        const product = await Product.create({
            name,
            description,
            price,
            stock,
            image,
            tags

        });
        res.status(201).json({
            message: 'Product created successfully',
            product
        });

    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({
            error: 'Server error while creating product'
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        console.log("PRODUCT COUNT:", await Product.count());
        const products = await Product.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.json({
            count: products.length,
            products
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            error: 'Server error while fetching products'
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }
        res.json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({
            error: 'Server error while fetching product'
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }
        await product.update(req.body);
        res.json({
            message: 'Product updated successfully',
            product
        });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({
            error: 'Server error while updating product'
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        await product.destroy();
        res.json({
            message: 'Product deleted successfully'
        });

    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({
            error: 'Server error while deleting product'
        });
    }
};