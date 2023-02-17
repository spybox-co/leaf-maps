import React from 'react';

import './Tag.scss';

const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
}


export const Tag = ({ children, color, type }) => {

  const styles = {
    color: `${color}`,
    backgroundColor: `rgba(${hexToRgb(color)}, 0.25)`,
  }

  const classes = [
    'fbr--tag',
    type && `fbr--tag-${type}`
  ].join(' ').trim();

  if (color) {
    console.log(hexToRgb(color))
  } 

  return (
    <span 
      style={color ? styles : null}
      className={classes}
    >
      {children}
    </span>
  )
}