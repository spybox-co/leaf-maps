import React, { useContext } from 'react';


import { cn } from '../../../../utils/helpers';



import { IconButton } from "../../../Button";
import ActionButton from '../ActionButton';

import { store  } from '../../../../store.js';

import './LocateButton.scss';

const LocateIcon = ({ enabled }) => (
  <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="2" />
    <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="2" fill="none" />
    <rect x="26" y="15" width="6" height="2" />
    <rect y="15" width="6" height="2" />
    <rect x="15" width="2" height="6" />
    <rect x="15" y="26" width="2" height="6" />
  </svg>
)

const LocateButton = () => {
  const { state, dispatch } = useContext(store);
  const { startLocate, autoCenterMap, position } = state;

  // if (position) console.log("User detected position", position);
  
  // const kind = startLocate && position && (autoCenterMap
  //   ? "autocentermap-enabled"
  //   : "autocentermap-disabled");

  const kind = startLocate
  ? autoCenterMap
    ? "autocentermap-enabled"
    : "autocentermap-disabled"
  : "gps-off";


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

  const classes = cn("LocateButton", startLocate && position ? "geolocation-on" : "geolocation-off");

  const icon = <LocateIcon />;

  

  return(
    <ActionButton
      className={classes}
      id="geolocate"
      kind={kind}
      renderIcon={LocateIcon}
      iconDescription="Locate your position!"
      onClick={handleLocateClick}
    />
  )
}

export default LocateButton;



