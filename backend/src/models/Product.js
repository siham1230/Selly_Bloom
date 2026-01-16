import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, validate: { min: 0 } },
    stock: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0 } },
    // categoryId: { type: DataTypes.INTEGER, allowNull: false, field: 'category_id', references: { model: 'categories', key: 'id' } },
    image: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true, defaultValue: [] },
}, {

    tableName: 'products',
    timestamps: true,
    underscored: true
});


export default Product;