import React from 'react';

import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';


const Icon = L.icon({
  // iconUrl: require('../../../images/map_pin_marker.png'),
  iconUrl: require('../../../images/marker/02_pin_blue.png'),
  iconSize: [48,48],
  iconAnchor: [24, 48],
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







