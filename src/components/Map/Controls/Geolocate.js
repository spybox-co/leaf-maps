import React, { useContext } from 'react';
import useGeolocation from 'react-hook-geolocation';
import { store } from '../../../store.js';

// ToDo improve accuracy 
const options = {
  enableHighAccuracy: true, 
  maximumAge:         15000, 
  timeout:            12000
};

// @Docs 
// https://www.npmjs.com/package/react-hook-geolocation
const Geolocate = props => {

  // const geolocation = useGeolocation()
  const { state, dispatch } = useContext(store);

  // eslint-disable-next-line
  const { autoCenterMap, position, startLocate } = state;



  
  const onGeolocationUpdate = geolocation => {
    console.log('Here’s some new data from the Geolocation API: ', geolocation)
    dispatch({ type: 'set my position', value: [ geolocation.latitude, geolocation.longitude ]})
    dispatch({ type: 'update geolocation details', value: geolocation })
  }
 
  // eslint-disable-next-line
  const geolocation = useGeolocation(options, onGeolocationUpdate)

  // useEffect(() => {
  //   console.log("update!")
  // }, [geolocation])

  // if error -> handle to store & context
  return null;
}

export default Geolocate;


// eslint-disable-next-line
export const Status = geolocation => {

  return !geolocation.error
    ? (
      <ul>
        <li>Latitude:          {geolocation.latitude}</li>
        <li>Longitude:         {geolocation.longitude}</li>
        <li>Location accuracy: {geolocation.accuracy}</li>
        <li>Altitude:          {geolocation.altitude}</li>
        <li>Altitude accuracy: {geolocation.altitudeAccuracy}</li>
        <li>Heading:           {geolocation.heading}</li>
        <li>Speed:             {geolocation.speed}</li>
        <li>Timestamp:         {geolocation.timestamp}</li>
      </ul>
    )
    : (
      <p>No geolocation, sorry.</p>
    )
}