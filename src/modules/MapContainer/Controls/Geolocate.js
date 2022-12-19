import { useContext } from 'react';
import useGeolocation from 'react-hook-geolocation';
import { store } from '../../../store.js';

// ToDo improve accuracy 
const options = {
  enableHighAccuracy: true, 
  maximumAge:         0, 
  timeout:            6000
};

// @Docs 
// https://www.npmjs.com/package/react-hook-geolocation

const Geolocate = props => {
  const { dispatch } = useContext(store);




  
  const onGeolocationUpdate = geolocation => {
    console.log('Here’s some new data from the Geolocation API: ', geolocation)
    dispatch({ type: 'set my position', value: [ geolocation.latitude, geolocation.longitude ]})
    dispatch({ type: 'update geolocation details', value: geolocation })
  }
 
  // eslint-disable-next-line
  const geolocation = useGeolocation(options, onGeolocationUpdate)

  return null;
}

export default Geolocate;
