import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import {Link} from 'react-router-dom'
import RoomIcon from '@mui/icons-material/Room';
import {Stations} from '../utils/typings'

interface Props {
  lat: number;
  lng: number;
  zoom: number;
  inInfoPage: boolean;
  stations: [Stations] | never[];
  setSelectedStation: React.Dispatch<React.SetStateAction<undefined>>;
}

function Map({lat, lng, zoom, stations, setSelectedStation}: Props) {

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

                {popupStation?.station.name}
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

          {popupStation &&
            <Popup
              latitude={popupStation.lat}
              longitude={popupStation.lon}
              anchor='bottom'
              offset={15}
            >
              <Link to={`/InfoPage/${popupStation?.uid}`}>
                <h1>{popupStation.station.name}</h1>
              </Link>
            </Popup>
          }
          
      </ReactMapGL>
  )
}


export default Map

