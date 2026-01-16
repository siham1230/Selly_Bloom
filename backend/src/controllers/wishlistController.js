// import Product from '../models/Product.js';
// import Cart from '../models/Cart.js';


// export const getWishlist = async (req, res) => {
//     try {
//         const userId = req.user.userId;

//         const wishlistItems = await Cart.findAll({
//             where: { userId },
//             include: [
//                 {
//                     model: Product,
//                     as: 'product',
//                     attributes: ['id', 'name', 'description', 'price', 'stock', 'Image'],
//                     include: [
//                         {
//                             model: Category,
//                             as: 'category',
//                             attributes: ['id', 'name']
//                         }
//                     ]
//                 }
//             ],
//             order: [['createdAt', 'DESC']]
//         });

//         res.json({
//             success: true,
//             data: wishlistItems,
//             count: wishlistItems.length
//         });
//     } catch (error) {
//         console.error('Get wishlist error:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Server error while fetching wishlist'
//         });
//     }
// };

// export const addToWishlist = async (req, res) => {
//     try {
//         const userId = req.user.userId;
//         const { productId } = req.body;

//         if (!productId) {
//             return res.status(400).json({
//                 success: false,
//                 error: 'Product ID is required'
//             });
//         }

//         const product = await Product.findByPk(productId);
//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 error: 'Product not found'
//             });
//         }

//         const existingItem = await Cart.findOne({
//             where: { userId, productId }
//         });

//         if (existingItem) {
//             return res.status(400).json({
//                 success: false,
//                 error: 'Product already in wishlist'
//             });
//         }

//         const wishlistItem = await Cart.create({
//             userId,
//             productId,
//             quantity: 1
//         });

//         const newItem = await Cart.findByPk(wishlistItem.id, {
//             include: [
//                 {
//                     model: Product,
//                     as: 'product',
//                     attributes: ['id', 'name', 'description', 'price', 'stock', 'Image'],
//                     include: [
//                         {
//                             model: Category,
//                             as: 'category',
//                             attributes: ['id', 'name']
//                         }
//                     ]
//                 }
//             ]
//         });

//         res.status(201).json({
//             success: true,
//             message: 'Product added to wishlist',
//             data: newItem
//         });
//     } catch (error) {
//         console.error('Add to wishlist error:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Server error while adding to wishlist'
//         });
//     }
// };

// export const removeFromWishlist = async (req, res) => {
//     try {
//         const userId = req.user.userId;
//         const { productId } = req.params;

//         const wishlistItem = await Cart.findOne({
//             where: { userId, productId }
//         });

//         if (!wishlistItem) {
//             return res.status(404).json({
//                 success: false,
//                 error: 'Product not found in wishlist'
//             });
//         }

//         await wishlistItem.destroy();

//         res.json({
//             success: true,
//             message: 'Product removed from wishlist'
//         });
//     } catch (error) {
//         console.error('Remove from wishlist error:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Server error while removing from wishlist'
//         });
//     }
// };

// export const clearWishlist = async (req, res) => {
//     try {
//         const userId = req.user.userId;

//         await Cart.destroy({
//             where: { userId }
//         });

//         res.json({
//             success: true,
//             message: 'Wishlist cleared successfully'
//         });
//     } catch (error) {
//         console.error('Clear wishlist error:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Server error while clearing wishlist'
//         });
//     }
// };

// export const checkInWishlist = async (req, res) => {
//     try {
//         const userId = req.user.userId;
//         const { productId } = req.params;

//         const wishlistItem = await Cart.findOne({
//             where: { userId, productId }
//         });

//         res.json({
//             success: true,
//             inWishlist: !!wishlistItem
//         });
//     } catch (error) {
//         console.error('Check wishlist error:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Server error while checking wishlist'
//         });
//     }
// };

// export const getWishlistCount = async (req, res) => {
//     try {
//         const userId = req.user.userId;

//         const count = await Cart.count({
//             where: { userId }
//         });

//         res.json({
//             success: true,
//             count
//         });
//     } catch (error) {
//         console.error('Get wishlist count error:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Server error while counting wishlist items'
//         });
//     }
// };