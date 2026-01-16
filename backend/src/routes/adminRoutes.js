// import express from 'express';
// import { authentication, authorize } from '../middleware/authMiddleware.js';
// import User from '../models/User.js';
// import Order from '../models/Order.js';

// const router = express.Router();


// router.get(
//     '/stats',
//     authentication,
//     authorize('admin'),
//     async (req, res) => {
//         try {
//             const usersCount = await User.count();
//             const ordersCount = await Order.count();

//             res.status(200).json({
//                 usersCount,
//                 ordersCount,
//             });
//         } catch (error) {
//             console.error('Admin stats error:', error);
//             res.status(500).json({ error: 'Server error' });
//         }
//     }
// );

// export default router;
