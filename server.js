require('dotenv').config()
const connectDB = require('./src/config/db')
const express = require('express')
const productRoutes = require('./src/routes/productRoutes'); 
const authRoutes = require('./src/routes/AuthRoutes')

const app = express()

connectDB()

app.use(express.json());


app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});