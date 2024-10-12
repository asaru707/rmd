import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL

const fetchTotalOrdersData = async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/order/order-total`)
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}

const fetchLastSevenDaysOrdersCount = async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/order/order-last-seven-days`)
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}

const fetchOrders = async (page) => {
  try {
    const res = await axios.get(`${apiUrl}/api/orders?page=${page}`)
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}

export default { fetchTotalOrdersData, fetchLastSevenDaysOrdersCount, fetchOrders }
