import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

import { cn } from '../../../utils/helpers';

const Preview = props => {
  const { 
    source, 
    layer, 
    center, 
    // zoom, 
    className 
  } = props;

  const classes = cn(className, 'ui--item-preview');

  //  const zoomPrev = (zoom < 12 ? 10 : zoom-2)

  return(
    <div className={classes}>
      <Map 
        zoomControl={false}
        attributionControl={false}
        style={{ height: `100%` }}
        center={center}
        zoom={13}
        // zoom={layer ? zoomPrev : zoom-2}
        scrollWheelZoom={false}
        dragging={false}
        touchZoom={false}
      >
        <TileLayer url={source} />
        {layer && <TileLayer url={layer} />}
      </Map>
    </div>
  )
}

export default Preview;