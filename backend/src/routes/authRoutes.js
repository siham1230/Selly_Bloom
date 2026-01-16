import express from 'express';
import { register, login, getCurrentUser, updateProfile, changePassword, logout } from '../controllers/authController.js';
import { authentication } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// testing
// router.get('/admin/dashbord', authentication, authorize('admin'), (req, res) => {
//     res.status(200).json({ message: 'Welcome to the admin dashboard!' });
// });

router.get('/me', authentication, getCurrentUser);
router.put('/profile', authentication, updateProfile);
router.put('/change-password', authentication, changePassword);
router.post('/logout', authentication, logout);

export default router;





