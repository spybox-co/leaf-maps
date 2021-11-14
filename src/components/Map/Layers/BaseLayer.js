import React from 'react';

import { TileLayer } from 'react-leaflet';

import MapTileError from '../../../images/map_tile_error.png';

// Miss some zoom levels for your tiles?
// https://github.com/Zverik/Leaflet.LimitZoom

const BaseLayer = props => {
  const { activeMap, map, zoom, maxZoom } = props;

  const calcZoom = zoom > maxZoom;
  // console.log(activeMap);
  if (activeMap && activeMap.maxZoom) {
    return (
      <TileLayer 
        url={map} 
        maxNativeZoom={activeMap.maxZoom}
        detectRetina={true}
        errorTileUrl={MapTileError}
      />
    );
  }
  if (activeMap) {
    return (
      <TileLayer 
        url={map} 
        detectRetina={true}
        errorTileUrl={MapTileError}
      />
    );
  }
}

export default BaseLayer;