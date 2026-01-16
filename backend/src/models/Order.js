import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
        type: DataTypes.INTEGER, allowNull: false, field: 'user_id', references: {
            model: 'users',
            key: 'id'
        }
    },
    orderNumber: { type: DataTypes.STRING(50), allowNull: false, unique: true, field: 'order_number' },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    },
    totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: 'total_amount' },
    shippingAddress: { type: DataTypes.JSONB, allowNull: false, field: 'shipping_address' },
    paymentMethod: { type: DataTypes.STRING(50), allowNull: false, field: 'payment_method' },
    paymentStatus: {
        type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
        defaultValue: 'pending',
        field: 'payment_status'
    },
    notes: {
        type: DataTypes.TEXT, allowNull: true
    },
    deliveryDate: { type: DataTypes.DATE, allowNull: true, field: 'delivery_date' }
}, {
    tableName: 'orders',
    timestamps: true,
    underscored: true
});
export default Order;


