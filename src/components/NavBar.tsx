import RoomIcon from '@mui/icons-material/Room';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios';

function NavBar() {

  const [searchedStation, setSearchedStation] = useState<string>('');

  useEffect(() => {
    axios.get(`https://api.waqi.info/search/?keyword=${searchedStation}&token=${process.env.REACT_APP_AQI_API_KEY}`).then((response) => {
      console.log(response.data);
      
    });
  }, [searchedStation]);

  useEffect(() => {
    
  }, [])

  return (
    <nav className='fixed w-full bg-black top-0 z-50'>
      <main className='max-w-7xl mx-auto flex p-3 items-center'>
        <Link to='/'>
          <h1 className='text-white text-xl ml-3'>AQI Scan</h1>
        </Link>
        <input 
          type="text"
          className='rounded-sm px-2 py-2 focus:outline-none ml-10'
          placeholder='Search a location'
          onChange={(e) => setSearchedStation(e.target.value)} />
        <Link to='/InfoPage'>
          <RoomIcon className='text-white ml-3 transform scale-125 hover:text-slate-300 hover:scale-150 hover:cursor-pointer'/>
        </Link>
        
      </main>
    </nav>
  )
}

export default NavBar