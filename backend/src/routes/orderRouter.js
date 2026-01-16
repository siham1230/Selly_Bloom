import express from 'express';
import { createOrder } from '../controllers/orderController.js';
import { authentication } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authentication, createOrder);

export default router;
