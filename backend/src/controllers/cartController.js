import Cart from '../models/Cart.js';
import Product from '../models/Product.js';



export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity = 1 } = req.body;

        if (!productId) {
            return res.status(400).json({
                error: 'Product ID is required'
            });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                error: 'Insufficient product stock'
            });
        }

        const existingItem = await Cart.findOne({
            where: { userId, productId }
        });

        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();

            return res.json({
                message: 'Cart updated successfully',
                cartItem: existingItem
            });
        }

        const cartItem = await Cart.create({
            userId,
            productId,
            quantity
        });

        res.status(201).json({
            message: 'Product added to cart',
            cartItem
        });

    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({
            error: 'Server error while adding to cart'
        });
    }
};


export const getUserCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cartItems = await Cart.findAll({
            where: { userId },
            include: [
                {
                    model: Product,
                    as: 'product',
                    attributes: ['id', 'name', 'price', 'image']
                }
            ]
        });

        res.json({
            count: cartItems.length,
            cartItems
        });

    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({
            error: 'Server error while fetching cart',
            details: error.message,
            name: error.name,
        });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({
                error: 'Quantity must be at least 1'
            });
        }

        const cartItem = await Cart.findByPk(id);
        if (!cartItem) {
            return res.status(404).json({
                error: 'Cart item not found'
            });
        }

        if (cartItem.userId !== req.user.id) {
            return res.status(403).json({
                error: 'Unauthorized'
            });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.json({
            message: 'Cart item updated successfully',
            cartItem
        });

    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({
            error: 'Server error while updating cart'
        });
    }
};


export const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;

        const cartItem = await Cart.findByPk(id);
        if (!cartItem) {
            return res.status(404).json({
                error: 'Cart item not found'
            });
        }

        if (cartItem.userId !== req.user.id) {
            return res.status(403).json({
                error: 'Unauthorized'
            });
        }

        await cartItem.destroy();

        res.json({
            message: 'Cart item removed successfully'
        });

    } catch (error) {
        console.error('Remove cart error:', error);
        res.status(500).json({
            error: 'Server error while removing cart item'
        });
    }
};

/**
 * @desc    Clear user cart
 * @route   DELETE /api/cart
 * @access  Authenticated user
 */
export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        await Cart.destroy({
            where: { userId }
        });

        res.json({
            message: 'Cart cleared successfully'
        });

    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({
            error: 'Server error while clearing cart'
        });
    }
};
