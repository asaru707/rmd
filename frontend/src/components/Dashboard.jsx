import React, { useEffect, useState } from 'react'
import ChartOrderCard from './ChartOrderCard'
import RevenueCard from './RevenueCard'
import OrderList from './OrderList'
import SideBar from './SideBar'
import Header from './Header'
import Cards from './Cards'
import PieCard from './PieCard'
import orderService from '../services/order'

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [totalOrders, setTotalOrders] = useState({
    totalOrders: 0,
    totalOrdersLast30Days: 0,
    difference: 0,
  })

  const [totalDelivered, setTotalDelivered] = useState({
    totalDelivered: 0,
    totalDeliveredLast30Days: 0,
    difference: 0,
  })

  const [totalCancelled, setTotalCancelled] = useState({
    totalCancelled: 0,
    totalCancelledLast30Days: 0,
    difference: 0,
  })

  const [totalRevenue, setTotalRevenue] = useState({
    totalRevenue: 0,
    totalRevenueLast30Days: 0,
    difference: 0,
  })

  const [lastSevenDays, setLastSevenDays] = useState([])
  useEffect(() => {
    orderService.fetchTotalOrdersData().then((data) => {
      if (data) {
        setTotalOrders(data.totalOrders)
        setTotalCancelled(data.totalCancelled)
        setTotalDelivered(data.totalDelivered)
        setTotalRevenue(data.totalRevenue)
      }
    })

    orderService.fetchLastSevenDaysOrdersCount().then((data) => {
      if (data) setLastSevenDays(data)
    })
  }, [])
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className='flex max-h-max bg-amber-100'>
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className='flex-grow m-5'>
        <Header toggleSidebar={toggleSidebar} />
        <div className='p-4'>
          <h1 className='text-2xl'>Welcome to the Dashboard</h1>
        </div>
        <Cards
          totalOrders={totalOrders}
          totalCancelled={totalCancelled}
          totalDelivered={totalDelivered}
          totalRevenue={totalRevenue}
        />
        <div className='flex flex-col md:flex-row mx-5'>
          <div className='w-full md:w-1/2 pr-4 flex'>
            <PieCard totalOrderPercentage={40} growthPercentage={20} revenuePercentage={30} />
          </div>
          <div className='w-full md:w-1/2 pl-0 md:pl-4 flex'>
            <ChartOrderCard
              labels={lastSevenDays.map((order) => order.day)}
              data={lastSevenDays.map((order) => order.count)}
            />
          </div>
        </div>
        <div className='mx-5 mb-8'>
          <RevenueCard />
        </div>
        <div className='mx-5 mb-8'>
          <OrderList />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
