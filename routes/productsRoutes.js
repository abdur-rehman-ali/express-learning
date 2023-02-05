import express from 'express'

import ProductsController from '../controllers/productsController.js'

const router = express.Router()

router.get('/', ProductsController.getProducts)
router.get('/search', ProductsController.searchProducts)

export default router