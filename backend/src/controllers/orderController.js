import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import sequelize from '../config/database.js';


export const createOrder = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const userId = req.user.id;
        const { shippingAddress, paymentMethod, notes } = req.body;

        // if (!userId) {
        //     await transaction.rollback();
        //     return res.status(401).json({ error: 'Unauthorized' })
        // }
        if (!shippingAddress) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Shipping address is required' })
        }

        const cartItems = await Cart.findAll({
            where: { userId },
            include: [{ model: Product, as: 'product' }],
            transaction
        });

        if (!cartItems.length) {
            await transaction.rollback();
            return res.status(400).json({
                error: 'Cart is empty'
            });
        }

        let totalAmount = 0;

        for (const item of cartItems) {

            if (!item.product) {
                await transaction.rollback();
                return res.status(400).json({
                    error: 'Product not found cart item'
                });
            }

            if (item.product.stock < item.quantity) {
                await transaction.rollback();
                return res.status(400).json({
                    error: `Insufficient stock for ${item.product.name}`
                });
            }
            totalAmount += item.quantity * item.product.price;
        }

        const order = await Order.create({
            userId,
            orderNumber: `ORD-${Date.now()}`,
            totalAmount,
            shippingAddress,
            paymentMethod,
            notes
        }, { transaction });

        for (const item of cartItems) {
            item.product.stock -= item.quantity;
            await item.product.save({ transaction });
        }

        await Cart.destroy({
            where: { userId },
            transaction
        });

        await transaction.commit();

        res.status(201).json({
            message: 'Order placed successfully',
            order
        });
        console.log(error.message);


    } catch (error) {
        await transaction.rollback();
        console.error('Create order error:', error);
        return res.status(500).json({
            name: error.name,
            message: error.message,
            parent: error.parent?.message
        });
    }
};
