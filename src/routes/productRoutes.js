const express = require('express')
const router = express.Router()
const {createProduct , getAllProducts} = require('../controllers/productController')
const {protect} = require('../middleware/authMiddleware')
router.route('/').get(getAllProducts).post(protect,createProduct)

module.exports = router

