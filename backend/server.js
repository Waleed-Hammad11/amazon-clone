require('dotenv').config()
const connectDB = require('./src/config/db')
const express = require('express')
const path = require('path')
const cors = require('cors')
const productRoutes = require('./src/routes/productRoutes'); 
const authRoutes = require('./src/routes/AuthRoutes')
const orderRoutes =require('./src/routes/orderRoutes')
const app = express()

connectDB()

app.use(express.json());
app.use(cors({
    origin:'http://localhost:4200',
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
const globalErrorHandler = require('./src/controllers/errorController');
app.use(globalErrorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});