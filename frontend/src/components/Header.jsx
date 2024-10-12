import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaCog,
  FaUser,
  FaSignOutAlt,
  FaSearch,
  FaBell,
  FaComment,
  FaGift,
  FaArrowCircleUp,
} from 'react-icons/fa'
import Notifications from './Notifications'
const Header = ({ toggleSidebar }) => {
  return (
    <div className='flex items-center justify-between p-2'>
      <button
        className='bg-transparent border-0 text-gray-600 md:hidden p-2 text-4xl'
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      <div className='flex-grow p-1 bg-white rounded-lg flex items-center max-w-md'>
        <input
          type='text'
          placeholder='Search Here'
          className='form-control h-10 w-full px-4 rounded-lg focus:outline-none'
        />
        <button className='btn btn-primary btn-search ml-2 text-blue-500 pr-4'>
          <FaSearch />
        </button>
      </div>
      <Notifications />
      <div className='flex items-center ml-4'>
        <span className='hidden md:inline text-gray-600'>
          Hello, <b>Samantha</b>
        </span>
        <button className='ml-2 bg-transparent border-0'>
          <img src='profile.jpeg' alt='Profile' className='w-8 rounded-full' />
        </button>
      </div>
    </div>
  )
}

export default Header
