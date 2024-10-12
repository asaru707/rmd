import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChartCard = ({ title, percentage, backgroundColor }) => {
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor,
        borderWidth: 0,
      },
    ],
  }

  const options = {
    cutout: '60%',
    plugins: {
      tooltip: { enabled: false },
    },
  }

  return (
    <div className='w-fullmd:w-1/2 lg:w-1/3 flex flex-col items-center'>
      <div className='relative w-32 h-32'>
        <Pie data={data} options={options} />
        <div className='absolute inset-0 flex mt-3 justify-center items-center'>
          <span className='font-bold'>{percentage}%</span>
        </div>
      </div>
      <div className='flex items-center justify-center mt-2 whitespace-nowrap'>
        <div className='text-xs'>{title}</div>
      </div>
    </div>
  )
}

export default PieChartCard
