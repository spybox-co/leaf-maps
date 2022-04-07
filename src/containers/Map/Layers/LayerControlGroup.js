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

const { BaseLayer } = LayersControl;

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

export default (props) => {
  const { state } = useContext(store);
  const { maps } = props;

  const { activeMap, mapSettings } = state;

  // console.log(maps);

  return(
    <LayersControl 
      style={{ display: 'none' }}
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
            zoom={10}
          />
        </BaseLayer>
      ))}
    </LayersControl> 
  )
}