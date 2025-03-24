const productsRouter = require('express').Router()
const Product = require('../models/product')
const { adminRequired } = require('../utils/middleware')
const userExtractor = require('../utils/middleware').userExtractor

productsRouter.get('/', async (request, response) => {
  const products = await Product.find({})
  response.json(products)
})

productsRouter.get('/:id', async (request, response) => {
  const product = await Product.findById(request.params.id)
  if (product) {
    response.json(product)
  } else {
    response.status(404).end()
  }
})

// admin required apis

productsRouter.post('/', userExtractor, adminRequired, async (request, response) => {
  const product = new Product(request.body)

  if (request.body.price < 0 || request.body.stock < 0) {
    return response.status(400).json({ error: 'price and stock must be non-negative' })
  }

  const savedProduct = await product.save()
  response.status(201).json(savedProduct)
})

productsRouter.put('/:id', userExtractor, adminRequired, async (request, response) => {
  const { provider, title, description, price, stock, category } = request.body

  const updatedProduct = await Product.findByIdAndUpdate(
    request.params.id,
    { provider, title, description, price, stock, category },
    { new: true, runValidators: true }
  )

  response.json(updatedProduct)
})

productsRouter.delete('/:id', userExtractor, adminRequired, async (request, response) => {

  await Product.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


module.exports = productsRouter