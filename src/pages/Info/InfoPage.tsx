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
  const [station, setStation] = useState<any>();
  const [stationObj, setStationObj] = useState<Stations>();
  

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
          <div className='flex flex-col items-center pb-10'> 
            <h1 className='text-3xl mt-10 text-center mb-3'>{station.city.name}</h1>
            <p className='opacity-70'>More info on this station <a className='underline' href={station.city.url} target='_blank'>Here.</a></p>
          </div>

          <div className='flex flex-col gap-8 mt-10 w-full'>
            <div className='w-full flex flex-col sm:flex-row gap-8'>
              <div className='p-6 flex justify-around items-center rounded-xl text-lg shadow-lg w-full sm:w-1/2' style={{backgroundColor: getAqiColor(station.aqi)}}>
                <p>AQI <span className='font-bold'>{station.aqi}</span></p>
                <p className='text-center'>The Air is <span className='font-bold'>{getAqiName(station.aqi)}</span></p>
              </div>
              <div className='rounded-xl text-lg shadow-lg w-full sm:w-1/2 bg-slate-200 p-6 flex items-center justify-center'>
                <p>Dominant Pollutant: <span className='font-bold'>{station.dominentpol}</span></p>
              </div>
            </div> 

            <section className='flex flex-col items-center gap-4 sm:gap-8 h-fit p-4 sm:p-8 rounded-xl bg-slate-400'>
              <h1 className='text-2xl opacity-80'>Pollutants</h1>
              {Object.keys(station.forecast.daily).slice(0, 3).map((key, index) => (
                <div className='bg-slate-200 rounded-xl p-5 shadow-lg w-full' key={index}>
                  <h1 className='mb-5 text-xl opacity-80'>{key}</h1>
                  <PollutantGraph pollutant={station.forecast.daily[key]} name={key} station={station}/>
                </div>
              ))}
            </section>

          </div>

          <div className='w-full h-[500px] mt-8'>
              {stationObj && <Map lat={station.city.geo[0]} lng={station.city.geo[1]} zoom={8} stations={[stationObj]}  rounded='12px'/>} 
          </div>
          
          
          
        </div>
      }
      </section>
    </main>
  )
}

export default InfoPage