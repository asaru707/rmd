const orderRouter = require('express').Router()
const Order = require('../models/order')
const User = require('../models/user')
const { userExtractor, tokenExtractor } = require('../utils/middleware')
const {
  getTotalOrdersAndDifference,
  getTotalDeliveredAndDifference,
  getTotalCancelledAndDifference,
  getTotalRevenueAndDifference,
  getSevenDayOrderCount,
} = require('../utils/order')

orderRouter.get('/', async (request, response) => {
  const page = parseInt(request.query.page) || 1
  const limit = parseInt(request.query.limit) || 10

  const skip = (page - 1) * limit

  try {
    const orders = await Order.find({}).skip(skip).limit(limit)

    const totalOrders = await Order.countDocuments()
    const totalPages = Math.ceil(totalOrders / limit)
    response.json({
      orders,
      totalPages,
      currentPage: page,
      totalOrders,
    })
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

orderRouter.get('/order-total', async (request, response) => {
  try {
    const totalOrders = await getTotalOrdersAndDifference()
    const totalDelivered = await getTotalDeliveredAndDifference()
    const totalCancelled = await getTotalCancelledAndDifference()
    const totalRevenue = await getTotalRevenueAndDifference()

    response.status(200).json({
      totalOrders,
      totalDelivered,
      totalCancelled,
      totalRevenue,
    })
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

orderRouter.get('/order-last-seven-days', async (request, response) => {
  try {
    const sevenDaysOrders = await getSevenDayOrderCount()

    response.status(200).json(sevenDaysOrders)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

orderRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
  const user = request.user

  const { productName, price, quantity } = request.body

  if (!productName || !price || !quantity) {
    return response.status(400).json({ error: 'Product name, price, and quantity are required' })
  }

  if (typeof price !== 'number' || price <= 0) {
    return response.status(400).json({ error: 'Price must be a positive number' })
  }

  if (typeof quantity !== 'number' || quantity < 1) {
    return response.status(400).json({ error: 'Quantity must be at least 1' })
  }

  const order = new Order({
    customerName: user.name,
    productName: productName,
    price: price,
    quantity: quantity,
  })

  try {
    const result = await order.save()
    user.orders = user.orders.concat(result._id)
    await User.findByIdAndUpdate(user._id, user)

    response.status(201).json(result)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

orderRouter.put('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const { id } = request.params
  const { status } = request.body

  if (!id) {
    return response.status(400).json({ error: 'Missing order ID' })
  }

  if (!status) {
    return response.status(400).json({ error: 'Missing order status' })
  }

  const allowedStatuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled']
  if (!allowedStatuses.includes(status)) {
    return response.status(400).json({ error: 'nvalid status' })
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
        context: 'query',
      }
    )

    response.status(200).json(updatedOrder)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

module.exports = orderRouter
