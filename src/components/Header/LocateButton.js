import React, { useContext } from 'react';
import Locate from '../Icon/Library/Locate';
import AddFilled16 from "@carbon/icons-react/es/add--filled/16";
import AddAlt16 from "@carbon/icons-react/es/add--alt/16";
import Launch16 from "@carbon/icons-react/es/launch/16";

import IconButton from "../IconButton";

import { store  } from '../../store.js';

const LocateButton = () => {
  const { state, dispatch } = useContext(store);
  const { startLocate, autoCenterMap } = state;

  const icon = Locate;
  // const icon = startLocate ? AddFilled16 : AddAlt16;
  
  const kind = startLocate
  ? autoCenterMap
    ? "primary"
    : "danger"
  : "secondary";


  const handleLocateClick = () => {
    // Initiate geolocation
    if (!startLocate) {
      dispatch({ type: 'start locate', value: true });
      dispatch({ type: 'center map', value: true });
    }
    // When geolocation is active but map is not centered on user position
    if (startLocate && !autoCenterMap) {
      dispatch({ type: 'center map', value: true });
      dispatch({ type: 'center map on position', value: state.position });
    }
    // Disable showing user's position on map
    if (startLocate && autoCenterMap) {
      dispatch({ type: 'start locate', value: false });
      dispatch({ type: 'center map', value: false });
    }
  }

  return(
    <IconButton
      id="locator"
      kind={kind}
      renderIcon={icon}
      iconDescription="Locate your position!"
      onClick={handleLocateClick}
    />
  )
}

export default LocateButton;