import React from 'react';

import { TileLayer } from 'react-leaflet';

const BaseLayer = props => {
  const { activeMap, map } = props;
  if (activeMap) {
    return <TileLayer url={map} />
  }
  // else -> handle Error and custom tile load with error message
}

export default BaseLayer;