const express = require('express')
const router = express.Router()
const {createProduct , getAllProducts} = require('../controllers/productController')
const {protect, restrictTo} = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware')

router.route('/').get(getAllProducts).post(protect,restrictTo('admin'),upload.single('image'),createProduct)

module.exports = router

