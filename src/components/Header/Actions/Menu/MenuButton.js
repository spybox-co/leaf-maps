import React, { useContext } from 'react';


import { cn } from '../../../../utils/helpers';

// import ActionButton from '../MenuButton';
import ActionButton from '../ActionButton';

// import { store  } from '../../../../store.js';

import './MenuButton.scss';

const MenuButton = ({ expanded, onClick }) => {
  // const { state, dispatch } = useContext(store);
  // const { startLocate, autoCenterMap, position } = state;

  const icon = expanded ? "Close" : "Menu";

  const classes = cn('MenuButton', expanded ? 'Menu--opened' : 'Menu--closed');

  return(
    <ActionButton
      className={classes}
      id="hamburger"
      renderIcon={icon}
      iconDescription="Menu"
      onClick={onClick}
    />
  )
}

export default MenuButton;