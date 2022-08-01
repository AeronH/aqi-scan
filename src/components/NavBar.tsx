import RoomIcon from '@mui/icons-material/Room';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className='fixed w-full bg-black top-0 z-50'>
      <main className='max-w-7xl mx-auto flex p-3 items-center'>
        <h1 className='text-white text-xl ml-3'>AQI Scan</h1>
        <input 
          type="text"
          className='rounded-sm px-2 py-2 focus:outline-none ml-10'
          placeholder='Search a location' />
        <Link to='/InfoPage'>
          <RoomIcon className='text-white ml-3 transform scale-125 hover:text-slate-300 hover:scale-150 hover:cursor-pointer'/>
        </Link>
        
      </main>
    </nav>
  )
}

export default NavBar