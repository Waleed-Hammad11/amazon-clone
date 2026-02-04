require('dotenv').config()
const connectDB = require('./src/config/db')
const express = require('express')

const app = express()

connectDB()

app.get('/',(req,res)=>{
    res.send('Amazon Clone API is Running!');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});