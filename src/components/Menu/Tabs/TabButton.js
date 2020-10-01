import React from 'react';
import { IconButton } from "../../Button";

import './styles.scss';

const TabButton = props => {
  return(
    <li className="Tab">
      <IconButton
        kind={props.active ? "active" : "inactive"}
        disabled={false}
        onClick={props.onClick}
        renderIcon={props.icon}
        iconDescription="Tab icon"
      />
    </li>
  )
}
export default TabButton;