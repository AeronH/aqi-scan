import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { useNavigate } from 'react-router-dom'
import RoomIcon from '@mui/icons-material/Room';
import {Stations} from '../utils/typings'

interface Props {
  lat: number;
  lng: number;
  zoom: number;
  inInfoPage: boolean;
  stations: [Stations] | never[];
}

function Map({lat, lng, zoom, stations}: Props) {

  const navigate = useNavigate();

  const [popupStation, setPopupStation] = useState<Stations | null>(null);

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

          {stations?.map((station: Stations) => (
            <Marker 
              key={station.uid} 
              latitude={station.lat} 
              longitude={station.lon}
             >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPopupStation(station); 
                  console.log('popup station', popupStation);
                  console.log('clicked station', station);
              }}>
                <div>

                <RoomIcon 
                  style={
                    isNaN(parseInt(station.aqi)) ? {color: 'white', transform: 'scale(1.5)'} :
                    parseInt(station.aqi) <= 50 ? {color: 'green', transform: 'scale(1.5)'} : 
                    parseInt(station.aqi) <= 100 ? {color: 'yellow', transform: 'scale(1.5)'} :
                    parseInt(station.aqi) <= 150 ? {color: 'orange', transform: 'scale(1.5)'} : 
                    parseInt(station.aqi) <= 200 ? {color: '#c40d43', transform: 'scale(1.5)'} : 
                    parseInt(station.aqi) <= 300 ? {color: 'purple', transform: 'scale(1.5)'} : 
                    {color: '#580f0f', transform: 'scale(1.5'}
                }/>

                </div>

              </button>
            </Marker>
          ))}

          {popupStation && (
            <Popup
              latitude={popupStation.lat}
              longitude={popupStation.lon}
              anchor='bottom'
              offset={15}
              closeOnClick={false}
              onClose={() => setPopupStation(null)}
            >
              <div className=''>
                <h1 className='underline cursor-pointer' onClick={() => navigate(`/InfoPage/${popupStation.uid}`)}>{popupStation.station.name}</h1>
                <div>
                  <h2>AQI: {popupStation.aqi}</h2>
                </div>
              </div>
              
            </Popup>
          )}
          
      </ReactMapGL>
  )
}


export default Map

