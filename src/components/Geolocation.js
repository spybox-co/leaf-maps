import { useEffect, useContext } from 'react';

import { store } from '../store.js';

export const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};


export default () => {

  const { dispatch } = useContext(store);

  // const userPosition = (position) => {
  //   console.log("Latitude is :", position.coords.latitude);
  //   console.log("Longitude is :", position.coords.longitude);
  //   console.log("Overall position data:", position);
  //   dispatch({ type: 'set my position', value: [ position.coords.latitude, position.coords.longitude ]})
  // }

  // const errorPosition = (error) => {
  //   console.warn('GEO ERROR(' + error.code + '): ' + error.message);
  // };

  // const handleUserPosition = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.watchPosition(userPosition, errorPosition, options);
  //   }
  //   // else throw error
  // }


  useEffect(
    () => {
      //handleUserPosition();
      // if(watchPosition) {
      //   handleUserPosition();
      // }
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            console.log("Overall position data:", position);
            dispatch({ type: 'set my position', value: [ position.coords.latitude, position.coords.longitude ]})
          }
        );
      }
    }, [dispatch]
  )



  return null;
  
}
