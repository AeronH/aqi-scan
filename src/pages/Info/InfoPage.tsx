import React,{useEffect, useState} from 'react'
import NavBar from '../../components/NavBar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function InfoPage({selectedStation}: any) {

  const { uid } = useParams();
  const [ station, setStation] = useState<any>([]);

  useEffect(() => {
    axios.get(`https://api.waqi.info/feed/${uid}/?${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`).then((response) => {
      console.log('info for a single station', response.data);
      setStation(response.data);
    })
  }, [])

  return (
    <main>
      <NavBar />
      <div>
        {uid}
        {station[0].uid}
      </div>
    </main>
  )
}

export default InfoPage