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

  static searchProducts = asyncHandler(async (req, res) => {
    const { featured, company, name, sort, fields, page, limit } = req.query
    const searchQuery = {}

    featured ? searchQuery.featured = (featured === 'true' ? true : false) : searchQuery
    company ? searchQuery.company = company : searchQuery
    name ? searchQuery.name = { $regex: name, $options: 'i' } : searchQuery

    let findProducts = Product.find(searchQuery)
    
    if (sort) {
      const sortList = sort.split(',').join(' ')
      findProducts = findProducts.sort(sortList)
    }

    if (fields) {
      const fieldsList = fields.split(',').join(' ')
      findProducts = findProducts.select(fieldsList)
    }

    const pageNo = Number(page) || 1
    const limitNo = Number(limit) || 10
    const skip = (pageNo - 1) * limitNo

    findProducts = findProducts.skip(skip).limit(limitNo)

    const products = await findProducts
    res.status(200).json({
      status: 'success',
      count: products.length,
      products
    })
  })
}

export default ProductsController