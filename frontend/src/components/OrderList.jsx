import React, { useState, useEffect } from 'react'
import orderService from '../services/order'

const OrderList = () => {
  const [orders, setOrders] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    orderService.fetchOrders(currentPage).then((data) => {
      if (data) {
        setOrders(data.orders)
        setTotalPages(data.totalPages)
      }
    })
  }, [currentPage])

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className='bg-white shadow-md rounded-lg p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>Order List</h2>
        <button className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600'>
          Add Order
        </button>
      </div>

      <div className='overflow-x-auto'>
        <table className='table-auto w-full text-left'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-4 py-2'>Date</th>
              <th className='px-4 py-2'>Order Id</th>
              <th className='px-4 py-2'>Customer Name</th>
              <th className='px-4 py-2'>Product Name</th>
              <th className='px-4 py-2'>Price</th>
              <th className='px-4 py-2'>Quantity</th>
              <th className='px-4 py-2'>Location</th>
              <th className='px-4 py-2'>Status</th>
              <th className='px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className='border-b'>
                <td className='px-4 py-2'>{order.date}</td>
                <td className='px-4 py-2'>{order.orderId}</td>
                <td className='px-4 py-2'>{order.customerName}</td>
                <td className='px-4 py-2'>{order.productName}</td>
                <td className='px-4 py-2'>${order.price}</td>
                <td className='px-4 py-2'>{order.quantity}</td>
                <td className='px-4 py-2'>{order.location}</td>
                <td className='px-4 py-2'>
                  <span
                    className={`px-2 py-1 rounded ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className='px-4 py-2 flex space-x-2'>
                  <button className='text-blue-500 hover:text-blue-700'>✏️</button>
                  <button className='text-red-500 hover:text-red-700'>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='mt-4 flex justify-between items-center'>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <div className='flex space-x-2'>
          <button
            onClick={goToPreviousPage}
            className={`px-3 py-1 bg-gray-200 rounded ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={goToNextPage}
            className={`px-3 py-1 bg-gray-200 rounded ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderList
