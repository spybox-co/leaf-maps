
import React, { useContext } from 'react';
import { store } from '../../../store.js';
import ScrollableArea from '../../ScrollableArea';

import { IconButton } from '../../Button';

import { cn } from '../../../utils/helpers';

import '../UIMenu.scss';
import styles from './Tab.module.scss';

const ActionPanel = props => {
  const { 
    children,
    expanded,
    name,
    theme, 
  } = props;

  const classes = cn(styles.Container, 'tab-container', expanded && 'open', theme && theme);

  return(
    
      <ScrollableArea className={styles.root} area={{ width: `100%`, height: `calc(100% - 3rem)` }}>
        <div className={classes}>
          {children}
        </div>
      </ScrollableArea>
    
  )
}

export default ActionPanel;

const CloseButton = props => <IconButton           
                                kind="ghost"
                                renderIcon="Close"
                                iconDescription="Close"{...props} 
                              />

export const Header = ({ title, expanded }) => {
  const { state, dispatch } = useContext(store);
  const { compactMode } = state;

  return(
    <div className={styles.Header} data-mode="dark">
      <h6>
        {title}
      </h6>
      {!compactMode && (
        <CloseButton          
          onClick={() => dispatch({ type: 'close menu'})}
        />
      )}
    </div>
  );
}
