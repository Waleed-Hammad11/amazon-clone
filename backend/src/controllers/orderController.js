const Order = require("../models/orderModel");
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
exports.createOrder = catchAsync(async function (req, res) {

    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        return next(new AppError('There is no order items',400))
    }

    const order =await Order.create({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        status: "Pending",
    });

    res.status(201).json({
        success: true,
        data: order,
        
    });

})
exports.getMyOrder= catchAsync(async function(req,res) {
        const orders =await Order.find({user:req.user._id}) 
        res.status(201).json({
            success:true,
            data:orders,
            count: orders.length
        })
})



