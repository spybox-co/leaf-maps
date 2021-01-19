import { useEffect, useContext } from 'react';

import { store } from '../store.js';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};


export default ({ watchPosition }) => {

  const { dispatch } = useContext(store);

  const userPosition = (position) => {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
    console.log("Overall position data:", position);
    dispatch({ type: 'set my position', value: [ position.coords.latitude, position.coords.longitude ]})
  }

  const errorPosition = (error) => {
    console.warn('GEO ERROR(' + error.code + '): ' + error.message);
  };

  const handleUserPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(userPosition, errorPosition, options);
    }
    // else throw error
  }


  useEffect(
    () => {
      if(watchPosition) {
        handleUserPosition();
      }
    }, [handleUserPosition, watchPosition]
  )



  return null;
  
}
