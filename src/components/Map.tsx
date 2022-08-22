import { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { useNavigate } from 'react-router-dom'
import { Stations } from '../utils/typings'
import { getAqiColor } from '../utils/getAqi'

interface MapProps {
  lat: number;
  lng: number;
  zoom: number;
  stations: [Stations] | never[];
  rounded: string;
}

interface Viewstate {
  latitude: number;
  longitude: number;
  zoom: number;
}

function Map({lat, lng, zoom, stations, rounded}: MapProps) {

  const navigate = useNavigate();

  const [popupStation, setPopupStation] = useState<Stations | null>(null);
  const [viewState, setViewState] = useState<Viewstate | null>(null);

  useEffect(() => {
    setViewState({
      latitude: lat,
      longitude: lng,
      zoom
    });
  },[stations]);
  
  return (
      <ReactMapGL 
        {...viewState}
        style={{width: '100%', height: '100%', borderRadius: rounded}}
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
                className='w-9 h-7 rounded-lg flex justify-center items-center text-lg opacity-90 hover:opacity-100 z-0 hover:z-10 shadow-xl'
                style={{backgroundColor: getAqiColor(station.aqi)}}
                onMouseEnter={() => setPopupStation(station)}
                onMouseLeave={() => setPopupStation(null)}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/InfoPage/${station.uid}`);
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
              style={{fontSize: '16px'}}
            >
                {popupStation.station.name}
            </Popup>
          )}
          
      </ReactMapGL>
  )
}

Map.defaultProps = {
  rounded: '0',
}


export default Map

