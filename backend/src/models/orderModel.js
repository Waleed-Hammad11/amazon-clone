const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    orderItems:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true,
            },
            name:{type:String , required:true},
            quantity:{type:Number , required:true , default:1},
            price:{type:Number , required:true },
            image: { type: String }
        }
    ],

    shippingAddress:{
        city:{type: String, required: true},
        postalCode:{type: String, required: true},
        address:{type: String, required: true},
        country:{type: String, required: true}
    },

    paymentMethod:{type:String,required:true,default:'cash'},

    totalPrice:{type:Number,required:true,default:0.0},

    status:{
    type:String,
    required:true,
    default:'Pending',
    enum:['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    },
    createdAt:{type:Date,default:Date.now}
})

module.exports = mongoose.model('Order',orderSchema)