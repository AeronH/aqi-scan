import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function InfoPage() {

  const { uid } = useParams();
  const [ station, setStation ] = useState<any>();
  console.log(uid);
  

  useEffect(() => {
    axios.get(`https://api.waqi.info/feed/@${uid}/?token=${process.env.REACT_APP_AQI_API_KEY}`).then((response) => {
      console.log('info for a single station', response.data.data);
      console.log(uid);
      
      setStation(response.data.data);
    })
  }, [])

  return (
    <main>
      <NavBar />
      <section className='mt-[80px]'>
        {station && station.city.name}
      </section>
    </main>
  )
}

export default InfoPage