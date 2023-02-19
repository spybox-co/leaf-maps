import React from 'react';

import './Tag.scss';

const hexToRgb = (hex) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
}

// New solution
export const hexToRgb2 = hex => {
  let results = 
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16));

  return results ? results.join(',') : null;
}


export const Tag = props => {
  const { 
    children, 
    color, 
    type 
  } = props;

  const styles = {
    color: `${color}`,
    backgroundColor: `rgba(${hexToRgb(color)}, 0.25)`,
  }

  // if (color) {
  //   console.log(hexToRgb2(color));
  // }
  

  const classes = [
    'fbr--tag',
    type && `fbr--tag-${type}`
  ].join(' ').trim();

  return (
    <span 
      style={color ? styles : null}
      className={classes}
    >
      {children}
    </span>
  )
}