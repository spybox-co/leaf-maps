import React from 'react';
import {
  LayersControl, 
  TileLayer,
  Marker, 
  Circle, 
  Popup,
  FeatureGroup 
} from "react-leaflet";


// Miss some zoom levels for your tiles?
// https://github.com/Zverik/Leaflet.LimitZoom

export default () => (
  <LayersControl position="topleft">
    {/* <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
      />
    </LayersControl.BaseLayer>
    <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </LayersControl.BaseLayer> */}
    <LayersControl.Overlay name="Szlaky piesze">
      <TileLayer
        url="http://tile.lonvia.de/hiking/{z}/{x}/{y}.png"
        zIndex={10}
      />
    </LayersControl.Overlay>
    <LayersControl.Overlay name="Szlaky rowerowe">
      <TileLayer
        url="http://tile.lonvia.de/cycling/{z}/{x}/{y}.png"
        zIndex={10}
      />
    </LayersControl.Overlay>
    <LayersControl.Overlay name="Hillshading">
      <TileLayer
        url="https://tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png"
        zIndex={10}
      />
    </LayersControl.Overlay>
    <LayersControl.Overlay name="Marker with popup">
      <Marker position={[51.51, -0.06]}>
        <Popup>
          <span>
            A pretty CSS3 popup. <br /> Easily customizable.
          </span>
        </Popup>
      </Marker>
    </LayersControl.Overlay>
    <LayersControl.Overlay name="Feature group">
      <FeatureGroup color="purple">
        <Popup>
          <span>Popup in FeatureGroup</span>
        </Popup>
        <Circle center={[51.51, -0.06]} radius={200} />
      </FeatureGroup>
    </LayersControl.Overlay>
  </LayersControl> 
)