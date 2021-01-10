import React, { useState, useEffect, useContext } from 'react';

import { store } from '../store.js';
import { cn } from '../utils/helpers';

export default () => {

  const { state, dispatch } = useContext(store);
  // const { autoCenterMap, position, startLocate } = state;

  const componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        console.log("Overall position data:", position);
        dispatch({ type: 'set my position', value: [ position.coords.latitude, position.coords.longitude ]})
      });
    }
  }


  useEffect(
    () => {
      componentDidMount();

    }, []
  )



  return null;
  
}

// position, location, autoCenterMap, activeMap