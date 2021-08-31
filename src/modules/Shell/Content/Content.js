import React from 'react';
// import { cn } from '../../../utils/helpers';

import './Content.scss';

export const Content = ({ children }) => {
  // const classes = cn(styles.SideNavigation, 'navigation', expanded && 'open')

  return <main className="spbx--content">
    {children}
  </main>
}

