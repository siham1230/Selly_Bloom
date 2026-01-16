// import express from 'express';
// import sequelize from '../config/database.js';

// const Wishlist = sequelize.define('Wishlist', {
//     id: { type: DataTypes.INTEGER, primaryKey, authoIncrement: true },
//     userId: {
//         type: DataTypes.INTEGER, allowNull: false, field: 'iser_id', references: {
//             model: 'users', key: 'id'
//         }
//     },
//     productId: {
//         type: DataTypes.INTEGER, allowNull: false, field: 'product_id', references: {
//             model: 'products', key: 'id'
//         }
//     },
// }, {
//     tableName: 'wishlissts',
//     timestamps: true,
//     underscored: true
// });