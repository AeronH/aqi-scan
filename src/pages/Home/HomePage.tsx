import React, { useState, useEffect} from 'react'
import Map from '../../components/Map'
import axios from 'axios'


function HomePage() {

  const [homePageStations, setHomePageStations] = useState([]);
  const randomStationGenerator = Math.floor((Math.random() * 50) + 400);

  useEffect(() => {
    axios.get(`https://api.waqi.info/map/bounds?token=${process.env.REACT_APP_AQI_API_KEY}&latlng=90,-180,-90,180`).then((response) => {
      const mapStations = response.data.data.filter((item: { uid: number; }) => (item.uid % randomStationGenerator === 0));

      console.log('the current stations are', mapStations);
      
      setHomePageStations(mapStations);
    })
  },[])

  return (
    <div className="max-w-7xl mx-auto h-screen w-screen mt-16">
      <div className='w-full h-[600px] p-10'>
        <Map 
          lat={20} 
          lng={20} 
          zoom={1} 
          inInfoPage={false} 
          stations={homePageStations}/>
      </div>
    </div>
  )
}

export default HomePage