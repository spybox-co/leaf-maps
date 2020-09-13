import React from 'react';

import { Circle, CircleMarker } from 'react-leaflet';

const PositionMarker = ({ position }) => {
  return(
    <>
      <Circle
        className="circle"
        center={position}
        radius={48}
      />
      <CircleMarker
        className="circle-marker"
        center={position}
        radius={8}
      />
    </>
  );
}

export default PositionMarker;