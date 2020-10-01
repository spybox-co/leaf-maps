import React from 'react';
// import { store  } from '../../store.js';

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




