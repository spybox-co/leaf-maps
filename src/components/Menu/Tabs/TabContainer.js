
import React, { useContext } from 'react';
import { store } from '../../../store.js';
import ScrollableArea from '../../ScrollableArea';

import { IconButton } from "../../Button";

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
    
      <ScrollableArea className={styles.root} area={{ width: `100%`, height: `calc(100% - 3rem)` }}>
        <div className={classes}>

          {/* {component} */}
          {children}
        
        </div>
      </ScrollableArea>
    
  )
}

export default TabContainer;

const CloseButton = props => <IconButton {...props} />

export const TabHeader = ({ title, expanded }) => {
  const { state, dispatch } = useContext(store);
  const { compactMode } = state;

  return(
    <div className={styles.Header}>
      <h6>
        {title}
      </h6>
      {!compactMode && (
        <CloseButton          
          kind={"secondary"}
          renderIcon="Close"
          iconDescription="Close"
          onClick={() => dispatch({ type: 'close menu'})}
        />
      )}
    </div>
  );
}
