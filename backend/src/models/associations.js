import Product from './Product.js';
import Cart from './Cart.js';
import Order from './Order.js';
import User from './User.js';

User.hasMany(Cart, { foreignKey: 'userId', as: 'carts' });
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });

//cart relation
Cart.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Cart.belongsTo(Product, { foreignKey: 'productId', as: 'product' });


//product relation
Product.hasMany(Cart, { foreignKey: 'productId', as: 'carts' });


//order relation
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { Product, Cart, Order, User };

