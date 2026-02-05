const Product = require("../models/productModel");


exports.createProduct = async (req, res) => {
try {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        data: product,
    });
} catch (error) {
    res.status(400).json({
        success: false,
        error: error.message,
    });
    }
};

exports.getAllProducts = async (req,res)=>{
    try {
        const products =await Product.find()
        res.status(200).json({
            data:products,
            success:true,
            count : products.length
        })
    } catch (error) {
        res.status(500).json({
            error: "Server Error",
            success:false
        })
    }
    
    
}