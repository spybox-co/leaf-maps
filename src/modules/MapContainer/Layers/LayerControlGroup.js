import React, { useContext } from 'react';
import { store } from '../../../store.js';
import {
  LayersControl, 
  TileLayer,
  // Marker, 
  // Circle, 
  // Popup,
  // FeatureGroup 
} from "react-leaflet";

import MapTileError from '../../../images/map_tile_error.png';

const { BaseLayer, Overlay } = LayersControl;

// Miss some zoom levels for your tiles?
// https://github.com/Zverik/Leaflet.LimitZoom




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

  // console.log(activeLayers);


  const checkActiveLayers = (activeLayer, layer) => {
    const checkLayer = activeLayer.map(active => active.url).filter(l => l === layer.url);
    return checkLayer[0] === layer.url ? true : false;
  }

  return(
    <LayersControl
      position="bottomright"
    >

      {maps.map((map, i) => (
        <BaseLayer 
          key={i}
          name={map.name}
          checked={activeMap.url === map.url ? true : false}
        >
          <TileLayer 
            url={`${map.url}${map.apikey ? map.apikey : ''}`} 
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