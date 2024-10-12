import PieChartCard from './PieChartCard'

const PieCard = ({ totalOrderPercentage, growthPercentage, revenuePercentage }) => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-6 flex flex-col w-full my-8'>
      <div className='text-lg font-semibold mb-4 text-gray-800'>Pie Chart</div>
      <div className='flex flex-wrap justify-center'>
        <div className='w-full md:w-1/3 p-2 flex justify-center'>
          <PieChartCard
            title='Total Order'
            percentage={totalOrderPercentage}
            backgroundColor={['#FF4C61', '#FFEBEE']}
          />
        </div>
        <div className='w-full md:w-1/3 p-2 flex justify-center'>
          <PieChartCard
            title='Growth'
            percentage={growthPercentage}
            backgroundColor={['#22C55E', '#E6F7EB']}
          />
        </div>
        <div className='w-full md:w-1/3 p-2 flex justify-center'>
          <PieChartCard
            title='Total Revenue'
            percentage={revenuePercentage}
            backgroundColor={['#3B82F6', '#EBF2FF']}
          />
        </div>
      </div>
    </div>
  )
}

export default PieCard
