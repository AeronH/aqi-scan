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
          <section className='flex flex-col md:flex-row gap-8 mb-10'>
            <header className=' w-full md:w-1/2 flex flex-col justify-around bg-slate-200 p-8 rounded-md shadow-lg'> 

              <div className='mb-10 md:mb-0'>
                <h1 className='text-3xl mb-2 font-bold'>{station.city.name}</h1>
                <p className='opacity-70'>More info on this station <a className='underline font-bold' href={station.city.url} target='_blank'>Here.</a></p>
              </div>  

              <div className='w-full flex flex-col gap-8'>
                <div className='p-6 flex justify-around items-center rounded-md text-lg shadow-lg w-full' style={{backgroundColor: getAqiColor(station.aqi)}}>
                  <p>AQI <span className='font-bold'>{station.aqi}</span></p>
                  <p className='text-center'>The Air is <span className='font-bold'>{getAqiName(station.aqi)}</span></p>
                </div>

                <div className='rounded-md text-lg shadow-lg w-full bg-slate-400 p-6 flex items-center justify-center'>
                  <p>Dominant Pollutant: <span className='font-bold'>{station.dominentpol}</span></p>
                </div>
              </div> 
              
            </header>

            <figure className='w-full md:w-1/2 h-[480px] shadow-lg'>
              {stationObj && <Map lat={station.city.geo[0]} lng={station.city.geo[1]} zoom={8} stations={[stationObj]} rounded='6px'/>} 
            </figure>
          </section>


          <section className='flex flex-col items-center gap-4 sm:gap-8 h-fit p-4 sm:p-8 rounded-md bg-slate-400 shadow-lg'>
            <h1 className='text-2xl opacity-80'>Pollutants</h1>

            {Object.keys(station.forecast.daily).slice(0, 3).map((key, index) => (
              <figure className='bg-slate-200 rounded-md p-5 shadow-lg w-full' key={index}>
                <h1 className='mb-5 text-xl opacity-80'>{key}</h1>
                <PollutantGraph pollutant={station.forecast.daily[key]} name={key} station={station}/>
                {key === 'o3' ? 
                  <p className='p-5'><span className='font-bold'>Ground-level ozone (o3)</span> comes from pollution emitted from cars, power plants, industrial boilers, refineries, and chemical plants. 
                  Ozone pollution can even come from paints, cleaners, solvents, and motorized lawn equipment.</p> : 
                key === 'pm10' ? 
                  <p className='p-5'><span className='font-bold'>Pm10</span> is any particulate matter in the air with a diameter of 10 micrometers or less, including smoke, dust, soot, salts, acids, and metals.</p> 
                : 
                  <p className='p-5'><span className='font-bold'>Pm25</span> is any particulate matter in the air with a diameter of 2.5 micrometers or less, including smoke, dust, soot, salts, acids, and metals.</p>}
              </figure>
            ))}

          </section>          
        </div>
      }
      </section>
    </main>
  )
}

export default InfoPage