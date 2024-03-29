import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

import { cn } from '../../utils/helpers';

//import './Preview.scss';

const Preview = props => {
  const { 
    source, 
    layer, 
    center, 
    // zoom, 
    className 
  } = props;

  const classes = cn(className, 'ui--item-preview');

  const previewStyle = {
    height: `100%`
    // filter: `saturate(0.75) contrast(70%)`,
    // filter: `invert(90%) hue-rotate(175deg)`
    // filter: `brightness(0.7) saturate(150%) contrast(100%) hue-rotate(30deg)`
  }

  //  const zoomPrev = (zoom < 12 ? 10 : zoom-2)

  return(
    <div className={classes}>
      <Map 
        zoomControl={false}
        attributionControl={false}
        style={previewStyle}
        center={center}
        zoom={13}
        // zoom={layer ? zoomPrev : zoom-2}
        scrollWheelZoom={false}
        dragging={false}
        touchZoom={false}
      >
        <TileLayer url={source} className="map-prev" />
        {layer && <TileLayer url={layer} />}
      </Map>
    </div>
  )
}

export default Preview;