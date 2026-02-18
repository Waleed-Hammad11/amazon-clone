const Product = require("../models/productModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.createProduct = catchAsync(async (req, res) => {

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

})

exports.getAllProducts =  catchAsync(async (req,res)=>{
        
        const features = new APIFeatures(Product.find(),req.query).filter().sort().paginate()
        const products = await features.query
        res.status(200).json({
            data:products,
            success:true,
            count : products.length
        })
}) 