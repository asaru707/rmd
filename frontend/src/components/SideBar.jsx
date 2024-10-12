import { useState } from 'react'
import {
  FaTimes,
  FaTachometerAlt,
  FaListAlt,
  FaUser,
  FaChartLine,
  FaMoneyBillWave,
  FaUtensils,
  FaInfoCircle,
  FaUserFriends,
  FaCalendarAlt,
  FaComments,
  FaWallet,
} from 'react-icons/fa'

const SideBar = ({ isOpen, toggleSidebar }) => {
  const [selectedItem, setSelectedItem] = useState('Dashboard')

  const menuItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt /> },
    { name: 'Order List', icon: <FaListAlt /> },
    { name: 'Order Details', icon: <FaInfoCircle /> },
    { name: 'Customer', icon: <FaUserFriends /> },
    { name: 'Analytics', icon: <FaChartLine /> },
    { name: 'Revenue', icon: <FaMoneyBillWave /> },
    { name: 'Foods', icon: <FaUtensils /> },
    { name: 'Food Details', icon: <FaInfoCircle /> },
    { name: 'Customer Details', icon: <FaUser /> },
    { name: 'Calendar', icon: <FaCalendarAlt /> },
    { name: 'Chat', icon: <FaComments /> },
    { name: 'Wallet', icon: <FaWallet /> },
  ]

  return (
    <>
      <aside
        className={`z-10 fixed inset-y-0 left-0 w-64 bg-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <button
          className='absolute top-5 right-4 text-gray-600 text-4xl p-2 md:hidden'
          onClick={toggleSidebar}
        >
          <FaTimes />
        </button>
        <div className='sidebar-logo text-center border-b p-4 hidden md:block'>
          <img className='w-44 mx-auto' src='logo.jpg' alt='Logo' />
        </div>
        <div className='p-4'>
          <ul className='list-none space-y-1'>
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={`flex items-center p-3 rounded-lg cursor-pointer ${
                  selectedItem === item.name
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedItem(item.name)}
              >
                <span className='mr-2'>{item.icon}</span>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}

export default SideBar
