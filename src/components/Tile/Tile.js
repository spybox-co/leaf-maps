import React from 'react';

import './Tile.scss';

const Tile = props => {
  const {
    children,
    clickable
  } = props;



  const classes = [
    'fbr--tile',
    clickable && 'fbr--tile--clickable'
  ].join(' ').trim();

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default Tile;