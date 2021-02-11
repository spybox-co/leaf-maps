import React from 'react';

import { TileLayer } from 'react-leaflet';

// Miss some zoom levels for your tiles?
// https://github.com/Zverik/Leaflet.LimitZoom

const MapOverlays = props => {
  const { activeLayers } = props;
  if (activeLayers.length > 0) {
    return activeLayers.map((layer, i) => <TileLayer key={i} url={layer.url} maxNativeZoom={18} />);
  } else {
    return null;
  }
}

export default MapOverlays;