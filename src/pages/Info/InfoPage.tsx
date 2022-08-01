import React,{useEffect} from 'react'
import NavBar from '../../components/NavBar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function InfoPage() {

  const { uid } = useParams();

  useEffect(() => {
    axios.get(`https://api.waqi.info/feed/${uid}/?${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`).then((response) => {
      console.log('info for a single station', response.data);
    })
  }, [])

  return (
    <main>
      <NavBar />
      <div>
        
      </div>
    </main>
  )
}

export default InfoPage