import React, { useContext } from 'react';


import { cn } from '../../../../../utils/helpers';

// eslint-disable-next-line
import { Button, IconButton } from '../../../../../components/Button';

import { store } from '../../../../../store.js';

import './LocateButton.scss';



const LocateButton = () => {
  const { state, dispatch } = useContext(store);
  const { startLocate, autoCenterMap, position } = state;

  const handleLocateClick = () => {
    // Initiate geolocation
    if (!startLocate) {
      dispatch({ type: 'start locate', value: true });
      dispatch({ type: 'center map', value: true });
    }
    // When geolocation is active but map is not centered on user position
    if (startLocate && !autoCenterMap && position !== null) {
      //dispatch({ type: 'center map', value: true });
      dispatch({ type: 'center map on position', value: position });
    }
    // Disable showing user's position on map
    if (startLocate && autoCenterMap) {
      // dispatch({ type: 'start locate', value: false });
      // dispatch({ type: 'center map', value: false });
      dispatch({ type: 'locate off' });
    }
  }

  const classes = cn('LocateButton', startLocate && position ? 'geolocation--on' : 'geolocation--off', autoCenterMap ? 'auto-center--on' : 'auto-center--off' );

  return(
    <div className={classes}>
      <IconButton
        id="geolocate"
        kind="ghost"
        iconDescription="Locate your position!"
        onClick={handleLocateClick}
      >
        <LocateIcon enabled={startLocate} follow={autoCenterMap}/>
      </IconButton>
    </div>
  )
}

export default LocateButton;


const LocateIcon = ({ enabled, follow }) => {
  const classes = cn('Icon', 'Icon-20', 'LocateIcon', follow && 'follow');
  const dot = follow ? 6 : 4;
  return(
    <div className={classes}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r={enabled ? dot : 0} />
        <circle cx="16" cy="16" r={enabled ? 11 : 9} stroke="currentColor" strokeWidth="2" fill="none" />
        <g>
          <rect x="26" y="15" width="6" height="2" />
          <rect y="15" width="6" height="2" />
          <rect x="15" width="2" height="6" />
          <rect x="15" y="26" width="2" height="6" />
        </g>
      </svg>
    </div>
  )
}
