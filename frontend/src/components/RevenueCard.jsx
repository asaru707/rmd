import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { month: 'Jan', revenue2022: 10000, revenue2023: 12000 },
  { month: 'Feb', revenue2022: 20000, revenue2023: 21000 },
  { month: 'Mar', revenue2022: 15000, revenue2023: 18000 },
  { month: 'Apr', revenue2022: 22000, revenue2023: 23000 },
  { month: 'May', revenue2022: 19000, revenue2023: 25000 },
  { month: 'Jun', revenue2022: 24000, revenue2023: 26000 },
  { month: 'Jul', revenue2022: 26000, revenue2023: 28000 },
  { month: 'Aug', revenue2022: 27000, revenue2023: 30000 },
  { month: 'Sep', revenue2022: 25000, revenue2023: 27000 },
  { month: 'Oct', revenue2022: 29000, revenue2023: 31000 },
  { month: 'Nov', revenue2022: 30000, revenue2023: 32000 },
  { month: 'Dec', revenue2022: 31000, revenue2023: 34000 },
]

const RevenueCard = () => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-6'>
      <h2 className='text-xl font-semibold mb-4'>Total Revenue</h2>
      <div className='h-64'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={data}>
            <CartesianGrid stroke='#f5f5f5' />
            <XAxis dataKey='month' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='revenue2022' stroke='#8884d8' />
            <Line type='monotone' dataKey='revenue2023' stroke='#82ca9d' />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RevenueCard
