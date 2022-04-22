import React, { useEffect, useContext } from 'react';

import Geolocate from './Controls/Geolocate';
// import { Map } from 'react-leaflet';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet'

import LayerControl, { GroupedLayer } from './Layers/LayerControl';
import LayerControlGroup from './Layers/LayerControlGroup';
import { PositionMarker, LocationMarker } from './Markers';


// import L from 'leaflet';
// import { useLeafletMap } from 'use-leaflet';

import { store } from '../../store.js';
import { cn } from '../../utils/helpers';

import Tile from "../../images/tile.png"


import "./MapContainer.scss";


// ToDo -> Migration to Leaflet 3.x


// MapContainer & MapConsumer
// https://react-leaflet.js.org/docs/api-map/


// @Docs 2.x
// https://react-leaflet-v2-docs.netlify.app/

// dynamic minZoom & maxZoom (two last post)
// https://github.com/PaulLeCam/react-leaflet/issues/350

// Custom Controls
// @Stack  https://stackoverflow.com/questions/52012591/react-leaflet-create-a-custom-components/52067137#52067137
// @Sample https://codesandbox.io/s/p5zzmnlk8j?file=/src/MapInfo.js

// leaflet hooks - useLeaflet
// https://stackoverflow.com/questions/57240177/an-example-of-using-the-react-leaflet-new-useleaflet-hook

// Other hooks (installed)
// https://github.com/vadzim/use-leaflet
// @Sample https://codesandbox.io/embed/use-leaflet-jbftf


const mapFilterSettings = {
  saturation: 1,
  contrast: 100,
}


const mapStyle = {
  backgroundImage: `url(${Tile})`,
  filter: `saturate(${mapFilterSettings.saturation}) contrast(${mapFilterSettings.contrast}%)`
}

const Map = () => {
  const { state, dispatch } = useContext(store);
 
  const {
    activeMap,
    activeLayers,
    autoCenterMap,
    position,
    location,
    viewport,
    startLocate,
    maps
  } = state;

  // @Param maxZoom in the future
  //const [maxZoom, setMaxZoom] = useState(state.mapSettings.maxZoom); 


  // Context in React Leaflet 2.6.x
  // https://codesandbox.io/s/remove-zoom-control-from-map-in-react-leaflet-wv4vl?file=/src/Leaflet.jsx

  useEffect(
    () => {


      if (position !== null && autoCenterMap) {
        dispatch({ type: 'center map on position', value: position })
      }
      /*
      if (activeMap.maxZoom) {
        setMaxZoom(activeMap.maxZoom)
      } else {
        setMaxZoom(state.mapSettings.maxZoom)
      }
      */
    }, [position, location, autoCenterMap, activeMap, dispatch]
  )

  const classes = {
    map: cn('lf-Map-container', autoCenterMap ? 'ac-enabled' : 'ac-disabled')
  };

  const mapOptions = {
    minZoom: state.mapSettings.minZoom,
    zoom: viewport.zoom,
    center: viewport.center,
    scrollWheelZoom: autoCenterMap ? "center" : "true",
    setView: autoCenterMap ? true : false, // false if autocenter map is not true?
    style: mapStyle
  }

  const layersProps = {
    maps: maps,
    map: !activeMap.apikey ? activeMap.url : `${activeMap.url}${activeMap.apikey}`,
    activeMap: activeMap,
    activeLayers: activeLayers,
    zoom: viewport.zoom,
    maxZoom: state.mapSettings.maxZoom
  }



  const onViewportChanged = viewport => {

    dispatch({ type: 'on change viewport', value: { center: viewport.center, zoom: viewport.zoom }})
    
    let position = JSON.stringify(viewport.center)
    localStorage.setItem("lastViewportDataPosition", position);
    localStorage.setItem("lastViewportDataZoomNumber", viewport.zoom);
    
  }
  const onClickReset = () => {
    // Reset to position provided in props
    console.log("Clicked on the map!")
  }



  const onDrag = () => dispatch({ type: 'center map', value: false });

  const isPositionMarker = startLocate && position !== null;
  const isLocationMarker = location.set && location.center !== null && location.label !== null;


  function MyComponent() {
    const map = useMapEvents({
      click: () => {
        map.locate()
      },
      locationfound: (location) => {
        console.log('location found:', location)
      },
    })
  }

  return(
    <div className={classes.map}>
      <MapContainer
        onViewportChanged={onViewportChanged}
        onDrag={onDrag}
        onClick={onClickReset}
        viewport={viewport}
        
        {...mapOptions}

        maxZoom={activeMap.maxZoom ? activeMap.maxZoom : state.mapSettings.maxZoom}
        zoomend={event => console.log(event)}
        // ToDo
        zoomControl={false} // next to disable default zoom control & make custom
        attributionControl={false} // maybe custom in the future
      >
        {/* <MyComponent /> */}
        
        {startLocate && <Geolocate />}
        
        {isPositionMarker && <PositionMarker position={position} />}

        {isLocationMarker && <LocationMarker position={location.center} label={location.label} />}

        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <LayerControl>
          <GroupedLayer checked name="OpenStreetMap" group="Base Layers">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </GroupedLayer>

          <GroupedLayer name="OpenStreetMap B&W" group="Base Layers">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </GroupedLayer>

        </LayerControl>
        
        {/* <LayerControlGroup {...layersProps} /> */}

      </MapContainer>
    </div>
  )
}

export default Map;
