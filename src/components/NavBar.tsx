import RoomIcon from '@mui/icons-material/Room';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Autocomplete, TextField, Box } from '@mui/material';
import { Stations } from '../utils/typings';

function NavBar() {

  const navigate = useNavigate();

  const [searchedStation, setSearchedStation] = useState<string | null>(null);
  const [filteredStations, setFilteredStations] = useState<Stations[]>([]);

  useEffect(() => {
    axios.get(`https://api.waqi.info/search/?keyword=${searchedStation}&token=${process.env.REACT_APP_AQI_API_KEY}`).then((response) => {
      setFilteredStations(response.data.data);
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
          <h1 className='text-white text-2xl mx-5'>AQI Scan</h1>
        </Link>

        <Autocomplete 
          options={filteredStations}
          getOptionLabel={(filteredStation) => `${filteredStation.station.name}`}
          noOptionsText={'There are no stations with that name'}
          limitTags={3}
          sx={{ width: 300}}
          style={{borderRadius: '16px'}}
          renderOption={(props, filteredStations) => (

            <Box component='li' 
                 {...props} 
                 key={filteredStations.uid}
                 onClick={() => {
                   navigate(`/InfoPage/${filteredStations.uid}`);
                   setSearchedStation(null);
                 }}>
              {filteredStations.station.name}
            </Box>

          )}
          renderInput={(params) => <TextField {...params} 
                                      style={{borderRadius: '16px'}}
                                      onChange={(e) => setSearchedStation(e.target.value)}          
                                      value={params}
                                      sx={{background: 'white'}}
                                      label='Search stations'
                                      variant="filled" 
                                    />}/>

          <RoomIcon 
            className='text-white ml-3 transform scale-125 hover:text-slate-300 hover:scale-150 hover:cursor-pointer'
            onClick={() => getClosestStation()}/>
            
      </main>
    </nav>
  )
}

export default NavBar