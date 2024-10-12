import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js'
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

const ChartOrderCard = ({ labels, datas }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Orders',
        data: datas,
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#E0E0E0',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return (
    <div className='bg-white shadow-lg rounded-lg p-6 w-full my-8'>
      <h3 className='text-lg font-semibold mb-4 text-gray-800'>Chart Order</h3>
      <div className='relative h-48'>
        <Line data={data} options={options} />
      </div>
      <div className='flex justify-between mt-4'>
        <span className='text-sm text-gray-500'>Last 7 days</span>
      </div>
    </div>
  )
}

export default ChartOrderCard
