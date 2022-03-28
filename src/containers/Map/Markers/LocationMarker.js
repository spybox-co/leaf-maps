import React, { useState } from 'react';

import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';


const Icon = L.icon({
  iconUrl: require('../../../images/marker/02_pin_blue.png'),
  iconSize: [48,48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -42], // [0, -64] - 100% of pin height on top 
  // shadowUrl: null,
  // shadowSize: null,
  // shadowAnchor: null
});


// Bind popup
// https://stackoverflow.com/questions/42894803/rendering-react-components-inside-popup-of-react-leaflet-draw-drawn-layer-on-rea

const LocationMarker = ({ position, label }) => {
  return(
    <>
      <Marker 
        icon={Icon} 
        position={position} 
        // eventHandlers={() => this.openPopup(position)}
      >
        <Popup 
          className="Tooltip"
        >
          {label}
        </Popup>
      </Marker>
    </>
  );
}

export default LocationMarker;