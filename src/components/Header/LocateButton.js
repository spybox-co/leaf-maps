import React, { useContext } from 'react';


import { cn } from '../../utils/helpers';

import Locate from '../Icon/Library/Locate';

import { IconButton } from "../Button";

import { store  } from '../../store.js';

import './LocateButton.scss';

const LocateButton = () => {
  const { state, dispatch } = useContext(store);
  const { startLocate, autoCenterMap, position } = state;

  const icon = Locate;
  // const icon = startLocate ? AddFilled16 : AddAlt16;

  // if (position) console.log("User detected position", position);
  
  const kind = startLocate && position && (autoCenterMap
    ? "autocentermap-enabled"
    : "autocentermap-disabled");

  // const kind = startLocate
  // ? autoCenterMap
  //   ? "geolocation-on autocentermap-enabled"
  //   : "geolocation-on autocentermap-disabled"
  // : "geolocation-off";


  const handleLocateClick = () => {
    // Initiate geolocation
    if (!startLocate) {
      dispatch({ type: 'start locate', value: true });
      dispatch({ type: 'center map', value: true });
    }
    // When geolocation is active but map is not centered on user position
    if (startLocate && !autoCenterMap) {
      dispatch({ type: 'center map', value: true });
      dispatch({ type: 'center map on position', value: position });
    }
    // Disable showing user's position on map
    if (startLocate && autoCenterMap) {
      dispatch({ type: 'start locate', value: false });
      dispatch({ type: 'center map', value: false });
    }
  }

  const classes = cn("GeolocateButton", startLocate && position ? "geolocation-on" : "geolocation-off");

  return(
    <IconButton
      className={classes}
      id="geolocate"
      kind={kind}
      renderIcon={icon}
      iconDescription="Locate your position!"
      onClick={handleLocateClick}
    />
  )
}

export default LocateButton;