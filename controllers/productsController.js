import Product from "../models/product.js"

import asyncHandler from "../middlewares/asyncHandler.js"

class ProductsController {
  static getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
    res.status(200).json({
      status: 'success',
      count: products.length,
      products: products
    })
  })
}

export default ProductsController