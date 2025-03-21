const ordersRouter = require('express').Router()
const Order = require('../models/order')
const Product = require('../models/product')
const { userExtractor, adminRequired } = require('../utils/middleware')

ordersRouter.get('/', userExtractor, adminRequired, async (request, response) => {
  const orders = await Order.find({})
    .populate('user', { username: 1 })
    .populate('products.product')
  response.json(orders)
})

ordersRouter.get('/my', userExtractor, async (request, response) => {
  const orders = await Order.find({ user: request.user.id })
    .populate('products.product')
  response.json(orders)
})

ordersRouter.post('/', userExtractor, async (request, response) => {
  const { products } = request.body
  const user = request.user

  let totalAmount = 0
  const productUpdates = []

  for (let item of products) {
    const product = await Product.findById(item.product)
    if (!product) {
      return response.status(404).json({ error: `Product ${item.product} not found` })
    }
    if (product.stock < item.quantity) {
      return response.status(400).json({
        error: `Not enough stock for product ${product.title}`
      })
    }
    totalAmount += product.price * item.quantity
    productUpdates.push({
      product: product._id,
      newStock: product.stock - item.quantity
    })
  }

  const order = new Order({
    user: user.id,
    products,
    totalAmount
  })

  for (let update of productUpdates) {
    await Product.findByIdAndUpdate(update.product, { stock: update.newStock })
  }

  const savedOrder = await order.save()
  const populatedOrder = await Order.findById(savedOrder.id)
    .populate('user', { username: 1 })
    .populate('products.product')

  response.status(201).json(populatedOrder)
})

ordersRouter.put('/:id', userExtractor, adminRequired, async (request, response) => {
  const { status } = request.body

  const updatedOrder = await Order.findByIdAndUpdate(
    request.params.id,
    { status },
    { new: true }
  )
    .populate('user', { username: 1 })
    .populate('products.product')

  response.json(updatedOrder)
})

module.exports = ordersRouter