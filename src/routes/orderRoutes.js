const express = require('express');
const router = express.Router();
const { createOrder, getMyOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect)

router.get('/myorders',  getMyOrder);

router.post('/', createOrder);

module.exports = router;