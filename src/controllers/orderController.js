const Order = require("../models/orderModel");

exports.createOrder = async function (req, res) {
try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (orderItems && orderItems.lenght === 0) {
        res.status(400).json({
        success: false,
        error: "there is no order items",
    });
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
} catch (error) {
    res.status(400).json({
        success: false,
        error:error.message,
    })
}
}
exports.getMyOrder= async function(req,res) {
    try {
        const orders =await Order.find({user:req.user._id}) 
        res.status(201).json({
            success:true,
            data:orders,
            count: orders.length
        })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}


