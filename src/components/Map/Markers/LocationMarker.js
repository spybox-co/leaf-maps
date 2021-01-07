import React from 'react';

import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';


const Icon = L.icon({
  iconUrl: require('../../../images/map_pin_marker.png'),
  iconSize: [64,64],
  iconAnchor: [32, 64],
  popupAnchor: [0, -42], // [0, -64] - 100% of pin height on top 
  // shadowUrl: null,
  // shadowSize: null,
  // shadowAnchor: null
});



const LocationMarker = ({ position, label }) => {
  return(
    <>
      <Marker icon={Icon} position={position}>
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







