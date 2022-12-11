import React from 'react';
// import { cn } from '../../../utils/helpers';

import './Content.scss';

export const Content = ({ className, children, expanded }) => {
  // const classes = cn(styles.SideNavigation, 'navigation', expanded && 'open')

  const classes = [className,'spbx--content', expanded ? 'menu-expanded' : null].join(' ').trim();

  return <main className={classes}>
    {children}
  </main>
}

