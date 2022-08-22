import { useState, useEffect} from 'react'
import Map from '../../components/Map'
import axios from 'axios'


function HomePage() {

  const [homePageStations, setHomePageStations] = useState([]);
  const randomStationGenerator = Math.floor((Math.random() * 50) + 250);

  useEffect(() => {
    axios.get(`https://api.waqi.info/map/bounds?token=${process.env.REACT_APP_AQI_API_KEY}&latlng=90,-180,-90,180`).then((response) => {
      const mapStations = response.data.data.filter((item: { uid: number; aqi: string; }) => (item.uid % randomStationGenerator === 0 && parseInt(item.aqi)));

      console.log('the current stations are', mapStations);
      
      setHomePageStations(mapStations);
    })
  },[])

  return (
    <div className="h-screen w-screen pt-16">
      <div className='w-full h-full'>
        <Map 
          lat={20} 
          lng={20} 
          zoom={1.75} 
          stations={homePageStations}/>
      </div>
    </div>
  )
}

export default HomePage