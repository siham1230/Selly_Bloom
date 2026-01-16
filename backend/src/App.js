import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../src/config/database.js';

import authRoutes from '../src/routes/authRoutes.js';
import productRoutes from '../src/routes/productRoutes.js';
import cartRoutes from '../src/routes/cartRoutes.js';
import orderRoutes from '../src/routes/orderRouter.js';
// import adminRoutes from '../src/routes/adminRoutes.js';
import './models/associations.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
    res.status(200).json({
        message: 'Server is running'
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
// app.use('/api/admin', adminRoutes);

app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!'
    });
});

const PORT = process.env.PORT || 4000;
console.log(PORT)

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    connectDB();
});
