const Product = require("../models/productModel");
const APIFeatures = require("../utils/apiFeatures");


exports.createProduct = async (req, res) => {
try {
    let imagePath = ''
    if(req.file){
        imagePath = `/uploads/${req.file.filename}`
    }
    const productData = {
        ...req.body,
        imagePath
    }

    const product = await Product.create(productData);

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
        
        const features = new APIFeatures(Product.find(),req.query).filter().sort().paginate()
        const products = await features.query
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