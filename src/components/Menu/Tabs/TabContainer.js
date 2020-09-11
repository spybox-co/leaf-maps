
import React, { useContext } from 'react';
import ScrollableArea from "../../ScrollableArea";

import styles from './Tab.module.scss';

const TabContainer = ({ children }) => (
  
    <ScrollableArea area={{ width: `100%`, height: `calc(100% - 3rem)` }}>
      <div className={styles.Container}>

        {children}
      
      </div>
    </ScrollableArea>
  
)

export default TabContainer;

export const TabHeader = ({ title }) => (
  <div className={styles.Header}>
    <h6>
      {title}
    </h6>
  </div>
);