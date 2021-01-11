import { useEffect, useContext } from 'react';

import { store } from '../store.js';


export default () => {

  const { dispatch } = useContext(store);

  // const WatchUserPosition = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.watchPosition(function(position) {
  //       console.log("Latitude is :", position.coords.latitude);
  //       console.log("Longitude is :", position.coords.longitude);
  //       console.log("Overall position data:", position);
  //       dispatch({ type: 'set my position', value: [ position.coords.latitude, position.coords.longitude ]})
  //     });
  //   }
  // }


  useEffect(
    () => {
      // WatchUserPosition();
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(position) {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          console.log("Overall position data:", position);
          dispatch({ type: 'set my position', value: [ position.coords.latitude, position.coords.longitude ]})
        });
      }
    }, []
  )



  return null;
  
}
