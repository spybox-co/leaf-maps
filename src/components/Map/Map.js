import { useEffect, useContext } from 'react';
import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import styles from './Map.module.scss';

import { store } from 'store';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const { MapContainer, TileLayer, MapConsumer } = ReactLeaflet;

const Map = ({ children, className, ...rest }) => {
  const { state, dispatch } = useContext(store);

  const { activeMap } = state;

  let mapClassName = styles.map;

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
      });
    })();
  }, []);


  const maoOptions = {
    zoomControl: false,
    attributionControl: false
  }
  return (
    <MapContainer 
      className={mapClassName} 
      // no communication
      center={[50.5, 30.5]} 
      zoom={13}
      {...maoOptions}
      {...rest}
    >
      {/* <MapConsumer>
        {(map) => children(ReactLeaflet, map)}
      </MapConsumer> */}
      {/* {children} */}
      <TileLayer url={activeMap.url} detectRetina={false} />
    </MapContainer>
  )
}

export default Map;