import RoomIcon from '@mui/icons-material/Room';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';
import { Stations } from '../utils/typings';

function NavBar() {

  const navigate = useNavigate();

  const [searchedStation, setSearchedStation] = useState<string>('');
  const [filteredStations, setFilteredStations] = useState<string[]>([]);

  useEffect(() => {
    axios.get(`https://api.waqi.info/search/?keyword=${searchedStation}&token=${process.env.REACT_APP_AQI_API_KEY}`).then((response) => {

      let stations: string[] = [];
      response.data.data.forEach((station: Stations) => stations.push(station.station.name));
      
      setFilteredStations(stations);
    });
  }, [searchedStation]);

  const getClosestStation = () => {
    axios.get(`https://api.waqi.info/feed/here/?token=${process.env.REACT_APP_AQI_API_KEY}`).then((response) => {
      navigate(`/InfoPage/${response.data.data.idx}`);
    })
  }

  return (
    <nav className='fixed w-full bg-black top-0 z-50'>
      <main className='max-w-7xl mx-auto flex p-3 items-center'>
        <Link to='/'>
          <h1 className='text-white text-xl mx-3'>AQI Scan</h1>
        </Link>

        <Autocomplete 
          options={filteredStations}
          limitTags={3}
          sx={{ width: 300}}
          renderInput={(params) => <TextField {...params} 
                                      sx={{background: 'white'}}
                                      label='Search stations'
                                      variant="filled" 
                                      value={searchedStation} 
                                      onChange={(e) => setSearchedStation(e.target.value)} 
                                    />}/>

          <RoomIcon 
            className='text-white ml-3 transform scale-125 hover:text-slate-300 hover:scale-150 hover:cursor-pointer'
            onClick={() => getClosestStation()}/>
        
      </main>
    </nav>
  )
}

export default NavBar