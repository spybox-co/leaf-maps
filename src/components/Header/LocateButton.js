import React, { useContext } from 'react';
import AddFilled16 from "@carbon/icons-react/es/add--filled/16";
import AddAlt16 from "@carbon/icons-react/es/add--alt/16";
import Launch16 from "@carbon/icons-react/es/launch/16";

import IconButton from "../IconButton";

import { store  } from '../../store.js';

const LocateButton = () => {
  const { state, dispatch } = useContext(store);
  const icon = state.position ? AddFilled16 : AddAlt16;
  // const kind = coordsEnabled
  // ? autoCenterMap
  //   ? "primary"
  //   : "danger"
  // : "secondary";
  const kind = 'secondary';
  return(
    <IconButton
      id="locator"
      kind={kind}
      renderIcon={icon}
      iconDescription="Locate your position!"
      onClick={() => {
        dispatch({ type: 'start locate', value: !state.startLocate ? true : false })
      }}
    />
  )
}

export default LocateButton;