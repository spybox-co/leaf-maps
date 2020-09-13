import React from 'react';

import { TileLayer } from 'react-leaflet';

const MapOverlays = props => {
  const { activeLayers } = props;
  if (activeLayers.length > 0) {
    return activeLayers.map((layer, i) => <TileLayer key={i} url={layer.url} />);
  } else {
    return null;
  }
}

export default MapOverlays;