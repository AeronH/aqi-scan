import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl'
import Link from 'react-router-dom'

interface Props {
  lat: number;
  lng: number;
  zoom: number;
}

function Map({lat, lng, zoom}: Props) {

  const API_TOKEN = process.env.REACT_APP_AQI_API_KEY;
  const [stations, setStations] = useState([]);
  const randomStationGenerator = Math.floor((Math.random() * 50) + 200);

  useEffect(() => {
    axios.get(`https://api.waqi.info/map/bounds?token=${API_TOKEN}&latlng=90,-180,-90,180`).then((response) => {
      const mapStations = response.data.data.filter((item: { uid: number; }) => (item.uid % randomStationGenerator === 0));

      console.log('the current stations are', mapStations);
      
      setStations(mapStations);
    })
    

    axios.get(`https://api.waqi.info/feed/here?token=${API_TOKEN}`).then((response) => {
      console.log(response.data);
    })
  }, [])

  return (
      <ReactMapGL 
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom
        }}
        style={{width: '100%', height: '100%'}}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle={'mapbox://styles/mapbox/dark-v10'}>
          {stations.map((station: { uid: number; lat: number; lon: number}) => (
            <Link to={`/InfoPage/${station.uid}`}>
              <Marker latitude={station.lat} longitude={station.lon}/>
            </Link>
          ))}
          
      </ReactMapGL>
  )
}


export default Map

