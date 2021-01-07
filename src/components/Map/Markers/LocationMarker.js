import React from 'react';

import { Marker, Popup } from 'react-leaflet';

const LocationMarker = ({ position, label }) => {
  return(
    <>
      <Marker position={position}>
        <Popup 
          className="Tooltip "
        >
          {label}
        </Popup>
      </Marker>
    </>
  );
}

export default LocationMarker;







