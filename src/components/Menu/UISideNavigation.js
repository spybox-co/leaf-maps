import React, { useContext } from 'react';

import styles from './Menu.module.scss'

const UISideNavigation = props => {
  const { children, expanded } = props;
  return(
    <nav className={styles.SideNavigation} style={expanded && { display: `none` }}>
        {children}
    </nav>
  );
}

export default UISideNavigation;