import React, { useContext } from 'react';


// import { cn } from '../../../../utils/helpers';

// import ActionButton from '../MenuButton';
import ActionButton from '../ActionButton';

// import { store  } from '../../../../store.js';

// import './MenuButton.scss';

const MenuButton = ({ expanded, onClick }) => {
  // const { state, dispatch } = useContext(store);
  // const { startLocate, autoCenterMap, position } = state;

  const icon = expanded ? "Close" : "Menu";

  return(
    <ActionButton
      className="MenuButton"
      id="hamburger"
      // kind={"secondary"}
      renderIcon={icon}
      iconDescription="Menu"
      onClick={onClick}
    />
  )
}

export default MenuButton;