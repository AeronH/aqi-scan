import { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { useNavigate } from 'react-router-dom'
import { Stations } from '../utils/typings'
import { getAqiColor } from '../utils/getAqi'

interface Props {
  lat: number;
  lng: number;
  zoom: number;
  stations: [Stations] | never[];
}

interface Viewstate {
  latitude: number;
  longitude: number;
  zoom: number;
}

function Map({lat, lng, zoom, stations}: Props) {

  const navigate = useNavigate();

  const [popupStation, setPopupStation] = useState<Stations | null>(null);
  const [viewState, setViewState] = useState<Viewstate | null>(null);

  useEffect(() => {
    setViewState({
      latitude: lat,
      longitude: lng,
      zoom
    });
  },[stations])
  
  return (
      <ReactMapGL 
        {...viewState}
        style={{width: '100%', height: '100%', borderRadius: '8px'}}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle={'mapbox://styles/mapbox/dark-v10'}
        onMove={(e: any) => setViewState(e.viewState)}
        >

          {stations?.map((station: Stations) => (
            <Marker 
              key={station.uid} 
              latitude={station.lat} 
              longitude={station.lon}
             >
              <button
                className='w-6 h-5 rounded-md flex justify-center items-center text-xs opacity-90 hover:opacity-100 shadow-xl'
                style={{backgroundColor: getAqiColor(station.aqi), transform: 'scale(1.5)'}}
                onMouseEnter={() => setPopupStation(station)}
                onMouseLeave={() => setPopupStation(null)}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/InfoPage/${station.uid}`)
              }}>

                {station.aqi}

              </button>
            </Marker>
          ))}

          {popupStation && (
            <Popup
              latitude={popupStation.lat}
              longitude={popupStation.lon}
              anchor='bottom'
              offset={15}
            >
                {popupStation.station.name}
            </Popup>
          )}
          
      </ReactMapGL>
  )
}


export default Map

