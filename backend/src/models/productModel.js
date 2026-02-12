const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter a value"],
        trim:true,
        maxLenght:[100,"the name is too long"]
    },
    image: {
    type: String,
    required: true,
    default: '/uploads/default-product.webp' 
    },
    price:{
        type:Number,
        required: [true, "Enter a price"],
        min: [0, "Enter a positive price"],
    },
    description: {
    type: String,
    required: [true, "Disciption is required"],
    },
    category: {
    type: String,
    required: [true, "category is required"],
    enum: {
    values: ['Electronics', 'Clothing', 'Books', 'Home'],
    message: '{VALUE} invalid category'}
    },
    stock: {
    type: Number,
    default: 0
    },
    createdAt: {
    type: Date,
    default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);