const Order = require('../models/order')

async function getSevenDayOrderCount() {
  const now = new Date()
  const todayIndex = now.getDay()
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const dailyCounts = {}

  const orders = await Order.find({
    date: { $gte: new Date(now.setDate(now.getDate() - 6)), $lte: now },
  })

  orders.forEach((order) => {
    const orderDate = new Date(order.date)
    const differenceInDays = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24))

    if (differenceInDays >= 0 && differenceInDays < 7) {
      const targetDayIndex = (todayIndex - differenceInDays + 7) % 7
      const targetDayName = daysOfWeek[targetDayIndex]

      if (!dailyCounts[targetDayName]) {
        dailyCounts[targetDayName] = 0
      }

      dailyCounts[targetDayName] += 1
    }
  })

  const dailyOrderCounts = []
  for (let i = 0; i < 7; i++) {
    const currentDayIndex = (todayIndex - i + 7) % 7
    const currentDayName = daysOfWeek[currentDayIndex]
    dailyOrderCounts.push({
      day: currentDayName,
      count: dailyCounts[currentDayName] || 0,
    })
  }

  return dailyOrderCounts
}

async function getTotalOrdersAndDifference() {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30))

  const totalOrders = await Order.countDocuments()
  const totalOrdersLast30Days = await Order.countDocuments({ date: { $gte: thirtyDaysAgo } })

  const difference = totalOrders - totalOrdersLast30Days

  return {
    totalOrders,
    totalOrdersLast30Days,
    difference,
  }
}

async function getTotalDeliveredAndDifference() {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30))

  const totalDelivered = await Order.countDocuments({ status: 'Delivered' })
  const totalDeliveredLast30Days = await Order.countDocuments({
    status: 'Delivered',
    date: { $gte: thirtyDaysAgo },
  })

  const difference = totalDelivered - totalDeliveredLast30Days

  return {
    totalDelivered,
    totalDeliveredLast30Days,
    difference,
  }
}

async function getTotalCancelledAndDifference() {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30))

  const totalCancelled = await Order.countDocuments({ status: 'Cancelled' })
  const totalCancelledLast30Days = await Order.countDocuments({
    status: 'Cancelled',
    date: { $gte: thirtyDaysAgo },
  })

  const difference = totalCancelled - totalCancelledLast30Days

  return {
    totalCancelled,
    totalCancelledLast30Days,
    difference,
  }
}

async function getTotalRevenueAndDifference() {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30))

  const totalRevenue = await Order.aggregate([
    { $group: { _id: null, total: { $sum: { $multiply: ['$price', '$quantity'] } } } },
  ])

  const totalRevenueLast30Days = await Order.aggregate([
    { $match: { date: { $gte: thirtyDaysAgo } } },
    { $group: { _id: null, total: { $sum: { $multiply: ['$price', '$quantity'] } } } },
  ])

  const revenue = totalRevenue[0]?.total || 0
  const revenueLast30Days = totalRevenueLast30Days[0]?.total || 0
  const difference = revenue - revenueLast30Days

  return {
    totalRevenue: revenue,
    totalRevenueLast30Days: revenueLast30Days,
    difference,
  }
}

module.exports = {
  getTotalOrdersAndDifference,
  getTotalDeliveredAndDifference,
  getTotalCancelledAndDifference,
  getTotalRevenueAndDifference,
  getSevenDayOrderCount,
}
