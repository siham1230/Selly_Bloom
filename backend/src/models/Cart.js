import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Cart = sequelize.define('Cart', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
        type: DataTypes.INTEGER, allowNull: false, field: 'user_id', references: {
            model: 'users',
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER, allowNull: false, field: 'product_id',
        references: {
            model: 'products',
            key: 'id'
        }
    },

    quantity: { type: DataTypes.INTEGER, allowNull: false },
}, {
    tableName: 'carts',
    timestamps: true,
    underscored: true
});

// Cart.belongsTo(Product, { foreignKey: 'productId', as: 'Product' })

export default Cart;