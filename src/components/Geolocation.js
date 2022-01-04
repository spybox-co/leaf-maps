import { useEffect, useContext } from 'react';

import { store } from '../store.js';

/**
 * 
 * Pure component and replacement component for useGeolocation custom hook
 * 
*/

// ToDo - accuracy best settings
// const options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0
// };


export default () => {

  const { dispatch } = useContext(store);


  useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            console.log("Overall position data:", position);
            dispatch({ type: 'set my position', value: [ position.coords.latitude, position.coords.longitude ]})
          }
        );
      }
      // ToDo -> find out a parameter to update position like lifecycle method
    }, [navigator.geolocation]);



  return null;
  
}
