
import React, { useContext } from 'react';
import { store } from '../../../store.js';
import ScrollableArea from "../../ScrollableArea";

import { IconButton as CloseButton } from "../../Button";

import { cn } from '../../../utils/helpers';

import '../UIMenu.scss';
import styles from './Tab.module.scss';

const TabContainer = props => {
  const { 
    children, 
    // component, 
    expanded 
  } = props;

  const classes = cn(styles.Container, 'tab-container', expanded && 'open');

  return(
    
      <ScrollableArea area={{ width: `100%`, height: `calc(100% - 3rem)` }}>
        <div className={classes}>

          {/* {component} */}
          {children}
        
        </div>
      </ScrollableArea>
    
  )
}

export default TabContainer;

export const TabHeader = ({ title, expanded }) => {
  const { dispatch } = useContext(store);

  return(
    <div className={styles.Header}>
      <h6>
        {title}
      </h6>
      <CloseButton          
        kind={"secondary"}
        renderIcon={Close16}
        iconDescription="Close"
        onClick={() => dispatch({ type: 'close menu'})}
      />
    </div>
  );
}

const Close16 = () => (
  <svg
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-hidden="true"
    style={{ fill: `#fff` }}
  >
    <polygon points="12,4.7 11.3,4 8,7.3 4.7,4 4,4.7 7.3,8 4,11.3 4.7,12 8,8.7 11.3,12 12,11.3 8.7,8 " />
  </svg>
);
