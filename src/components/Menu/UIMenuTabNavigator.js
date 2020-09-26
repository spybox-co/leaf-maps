import React from 'react';
// import { store  } from '../../store.js';
import IconButton from "../IconButton";
import styles from './Menu.module.scss'


const UIMenuTabnavigator = props => {
  // const { state, dispatch } = useContext(store);



  return(
    <div className={styles.TabNavigator}>
      <ul>
        {props.children}
      </ul>
    </div>
  );
}

export default UIMenuTabnavigator;

export const TabButton = props => {
  // const { state, dispatch } = useContext(store);
  return(
    <li className={styles.Tab}>
      <IconButton
        kind="secondary"
        disabled={false}
        onClick={props.onClick}
        renderIcon={props.icon}
        iconDescription="Tab icon"
      />
    </li>
  )
}


