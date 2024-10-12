import { FaArrowCircleUp } from 'react-icons/fa'
const Card = ({ imgSrc, value, label, percentage, positive }) => (
  <div className='bg-white shadow-md px-10 py-3 rounded-lg flex items-center justify-between m-4 flex-col md:flex-row'>
    <div className='bg-gray-200 rounded-full p-3 mb-2 md:mb-0'>
      <img src={imgSrc} alt={label} className='w-16 md:w-10' />
    </div>
    <div className='flex-grow text-center md:text-left md:ml-3'>
      <div className='text-xl md:text-2xl font-bold'>{value}</div>
      <div className='text-gray-600 text-xs md:text-sm'>{label}</div>
      <div
        className={`flex items-center ${
          positive ? 'text-green-500' : 'text-red-500'
        } text-xs md:text-sm`}
      >
        <FaArrowCircleUp className={`${positive ? '' : 'rotate-180'} transform`} />
        <span className='ml-1'>{percentage} (30 days)</span>
      </div>
    </div>
  </div>
)
const calculatePercentageDifference = (total, lastDays, difference) => {
  if (lastDays === 0) {
    return total > 0 ? 100 : 0
  }

  const percentage = (difference / lastDays) * 100

  return percentage
}
const Cards = ({ totalCancelled, totalDelivered, totalOrders, totalRevenue }) => {
    console.log(totalRevenue)
  return (
    <div className='flex flex-wrap justify-center'>
      <Card
        imgSrc='bill.svg'
        value={totalOrders.totalOrders}
        label='Total Orders'
        percentage={calculatePercentageDifference(
          totalOrders.totalOrders,
          totalOrders.totalOrdersLast30Days,
          totalOrders.difference
        )}
        positive={totalOrders.difference > -1}
      />
      <Card
        imgSrc='box.svg'
        value={totalDelivered.totalDelivered}
        label='Total Delivered'
        percentage={calculatePercentageDifference(
          totalDelivered.totalDelivered,
          totalDelivered.totalDeliveredLast30Days,
          totalDelivered.difference
        )}
        positive={totalDelivered.difference > -1}
      />
      <Card
        imgSrc='bill.svg'
        value={totalCancelled.totalCancelled}
        label='Total Cancelled'
        percentage={calculatePercentageDifference(
          totalCancelled.totalCancelled,
          totalCancelled.totalCancelledLast30Days,
          totalCancelled.difference
        )}
        positive={totalCancelled.difference > -1}
      />
      <Card
        imgrc='bill.svg'
        value={totalRevenue.totalRevenue}
        label='Total Revenue'
        percentage={calculatePercentageDifference(
          totalRevenue.totalRevenue,
          totalRevenue.totalRevenueLast30Days,
          totalRevenue.difference
        )}
        positive={totalRevenue.difference > -1}
      />
    </div>
  )
}

export default Cards
