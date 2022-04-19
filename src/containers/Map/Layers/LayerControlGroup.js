import React, { useContext } from 'react';
import { store } from '../../../store.js';
// import * as L from 'leaflet';
// import { Control, DomUtil, DomEvent } from 'leaflet';
import {
  LayersControl, 
  TileLayer,
  // Marker, 
  // Circle, 
  // Popup,
  // FeatureGroup 
} from 'react-leaflet';

import MapTileError from '../../../images/map_tile_error.png';

const { BaseLayer, Overlay } = LayersControl;

// Miss some zoom levels for your tiles?
// https://github.com/Zverik/Leaflet.LimitZoom


// console.log(Control, DomEvent);
// @Source
// https://github.com/Leaflet/Leaflet/blob/main/src/control/Control.Layers.js

// @Custom layer control
// https://stackoverflow.com/questions/54261651/creating-a-custom-leaflet-layer-control-in-react

// https://codesandbox.io/embed/competent-edison-wt5pl?fontsize=14
// https://github.com/PaulLeCam/react-leaflet/issues/706 for v.3.x

// https://stackoverflow.com/questions/59432189/remove-zoom-control-from-map-in-react-leaflet
// https://stackoverflow.com/questions/55202423/leaflet-allow-for-switching-to-another-base-layer-at-higher-than-max-zoom

// Leaflet docs
// https://leafletjs.com/SlavaUkraini/reference.html#control-layers

export default () => {
  const { state } = useContext(store);

  const { activeMap, activeLayers, mapSettings, maps, layers } = state;

  const mapUrl = (map) => {
    return `${map.url}${map.apikey ? map.apikey : ''}`
  }

  const checkActiveMap = (activeMap, map) => {
    const compareMaps = activeMap.url === map.url ? true : false;
    return compareMaps;
  }

  const checkActiveLayers = (activeLayer, layer) => {
    const compareArrays = activeLayer.map(active => active.url).includes(layer.url);
    return compareArrays;
  }

  const layerCotrolProps = {
    position: 'bottomright'
  }

  return(
    <LayersControl {...layerCotrolProps} >

      {maps.map((map, i) => (
        <BaseLayer 
          key={i}
          name={map.name}
          checked={checkActiveMap(activeMap, map)}
        >
          <TileLayer 
            url={mapUrl(map)} 
            maxNativeZoom={map.maxZoom || mapSettings.maxZoom}
            detectRetina={false}
            errorTileUrl={MapTileError}

          />
        </BaseLayer>
      ))}


      {layers.map((layer, i) => (
        <Overlay 
          key={i}
          name={layer.name}
          checked={checkActiveLayers(activeLayers, layer)}
        >
          <TileLayer 
            url={layer.url}
            detectRetina={false}
            maxNativeZoom={18} 
          />
        </Overlay>
      ))}

    </LayersControl> 
  )
}