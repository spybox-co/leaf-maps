import React from 'react';
import { cn } from '../../../../utils/helpers';

import ActionButton from '../ActionButton';

import './MenuButton.scss';

const MenuButton = ({ expanded, onClick }) => {

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