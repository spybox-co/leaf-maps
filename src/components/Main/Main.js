import React, { useContext } from 'react';
import { store } from '../../store.js';
import { Content } from '../../modules/Shell';

import styles from './Main.module.scss';


export const Main = ({ children }) => {
  const { state } = useContext(store);


  const { expanded, compactMode } = state;

  const classes = [styles.root, expanded ? styles.expanded : null].join(' ').trim();

  return(
    <Content className={classes}>
      {children}
    </Content>
  )
} 