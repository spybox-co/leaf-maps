import React from 'react';

import { TileLayer } from 'react-leaflet';

import MapTileError from '../../../images/map_tile_error.png';

const BaseLayer = props => {
  const { activeMap, map } = props;
  // console.log(activeMap);
  if (activeMap) {
    return (
      <TileLayer 
        url={map} 
        // maxZoom={20}
        // detectRetina={true}
        errorTileUrl={MapTileError}
      />
    );
  }
}

export default BaseLayer;