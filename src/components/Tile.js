import React from 'react';

const styles = {
  root: {
    cursor: `default`
  }
}

export default function Tile(props) {
  return (
    <div className="bx--tile bx--tile--clickable" style={{...props.style, ...styles.root }}>
      {props.children}
    </div>
  )
}