import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getAqiColor, getAqiName } from '../../utils/getAqi'
import Map from '../../components/Map'
import { Stations } from '../../utils/typings'
import PollutantGraph from './PollutantGraph'

function InfoPage() {

  const { uid } = useParams();
  const [ station, setStation ] = useState<any>();
  const [ stationObj, setStationObj] = useState<Stations>();
  
  useEffect(() => {
    
  }, [station])
  

  useEffect(() => {
    axios.get(`https://api.waqi.info/feed/@${uid}/?token=${process.env.REACT_APP_AQI_API_KEY}`).then((response) => {
      const data = response.data.data;
      console.log('info for a single station using the uid', data);
      setStation(data);
      const stationMapInfo = {
        aqi: data.aqi,
        lat: data.city.geo[0],
        lon: data.city.geo[1],
        station: {
          name: data.city.name,
          time: data.time.iso
        },
        uid: data.idx
      }
  
      setStationObj(stationMapInfo);
    }) 
  }, [uid])

  return (
    <main>
      <NavBar />
      <section className='mt-[80px] max-w-6xl mx-auto p-10 h-fit'>
        {station && 
        <div className='h-fit'>
          <div className='flex flex-col items-center'> 
            <h1 className='text-3xl mt-10 text-center'>Station: {station.city.name}</h1>
            <p>More info on this station <a className='underline' href={station.city.url} target='_blank'>Here.</a></p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 grid-rows-4 md:grid-rows-2 gap-8 mt-10 w-full'>
            <div className='col-span-1 row-span-1 px-6 flex justify-around items-center h-[80px] rounded-lg text-lg' style={{backgroundColor: getAqiColor(station.aqi)}}>
              <p>AQI <span className='font-bold'>{station.aqi}</span></p>
              <p className='text-center'>The Air is <span className='font-bold'>{getAqiName(station.aqi)}</span></p>
            </div>

            {Object.keys(station.forecast.daily).slice(0, 3).map((key, index) => (
              <div className='col-span-1 row-span-1 bg-slate-200 rounded-lg' key={index}>
                <PollutantGraph pollutant={station.forecast.daily[key]} name={key}/>
              </div>
            ))}

            

            
            
          </div>
          <div className='w-full h-[500px] mt-8'>
              {stationObj && <Map lat={station.city.geo[0]} lng={station.city.geo[1]} zoom={8} stations={[stationObj]}/>} 
          </div>
          
          
          
        </div>
        
        
          
      }
        
      </section>
    </main>
  )
}

export default InfoPage