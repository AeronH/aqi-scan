import { useState, useEffect} from 'react'
import Map from '../../components/Map'
import axios from 'axios'

function HomePage() {

  const [homePageStations, setHomePageStations] = useState([]);
  const randomStationGenerator = Math.floor((Math.random() * 50) + 250);

  useEffect(() => {
    axios.get(`https://api.waqi.info/map/bounds?token=${process.env.REACT_APP_AQI_API_KEY}&latlng=90,-180,-90,180`).then((response) => {
      const mapStations = response.data.data.filter((item: { uid: number; aqi: string; }) => (item.uid % randomStationGenerator === 0 && parseInt(item.aqi)));
      
      setHomePageStations(mapStations);
    })
  },[])

  return (
    <main className="h-screen w-screen pt-16">
        <Map 
          lat={20} 
          lng={20} 
          zoom={1.75} 
          stations={homePageStations}/>
    </main>
  )
}

export default HomePage