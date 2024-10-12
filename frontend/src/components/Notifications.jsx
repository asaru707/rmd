const NotificationButton = ({ iconSrc, count, color }) => {
  return (
    <button className={color}>
      <img src={iconSrc} alt='Notification' className='w-6 h-6' />
      {count > 0 && (
        <span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1 py-0.5 transform translate-x-1/2 -translate-y-1/2'>
          {count}
        </span>
      )}
    </button>
  )
}

const Notifications = () => {
  return (
    <div className='hidden lg:flex items-center ml-4 space-x-4'>
      <NotificationButton
        iconSrc='notification-bell.svg'
        count={1}
        color={'relative bg-blue-200 rounded-lg p-2 hover:bg-blue-300 transition duration-200'}
      />
      <NotificationButton
        iconSrc='messages.svg'
        count={7}
        color={'relative bg-blue-200 rounded-lg p-2 hover:bg-blue-300 transition duration-200'}
      />
      <NotificationButton
        iconSrc='gift.svg'
        count={0}
        color={'relative bg-blue-200 rounded-lg p-2 hover:bg-blue-300 transition duration-200'}
      />
      <NotificationButton
        iconSrc='settings.svg'
        count={5}
        color={'relative bg-blue-200 rounded-lg p-2 hover:bg-blue-300 transition duration-200'}
      />
    </div>
  )
}

export default Notifications
