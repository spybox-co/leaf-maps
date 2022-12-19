import React from 'react';
import { cn } from '../../utils/helpers';

import './UIMenu.scss';
import styles from './Menu.module.scss';

const SideNav = props => {
  const { children, expanded } = props;

  const classes = cn(styles.SideNavigation, 'navigation', expanded && 'open')
  
  return(
    <nav className={classes}>
      <div>
        {children}
      </div>
    </nav>
  );
}

export default SideNav;