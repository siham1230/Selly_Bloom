import express from 'express';
import { register, login, getCurrentUser, updateProfile, changePassword, logout } from '../controllers/authController.js';
import { authentication } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { registerSchema, loginSchema, updateProfileSchema, changePasswordSchema } from '../validators/authValidator.js';
const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);


router.get('/me', authentication, getCurrentUser);
router.put('/profile', authentication, validate(updateProfileSchema), updateProfile);
router.put('/change-password', authentication, validate(changePasswordSchema), changePassword);
router.post('/logout', authentication, logout);

export default router;





