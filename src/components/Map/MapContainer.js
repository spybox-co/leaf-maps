// eslint-disable-next-line
import React, { useState, useEffect, useContext } from 'react';
import useGeolocation from 'react-hook-geolocation';
import { 
  Map,
  useLeaflet,
  //withLeaflet
} from 'react-leaflet';

import { BaseLayer, MapOverlays } from './Layers';
import { PositionMarker } from './Markers';

// import L from 'leaflet';
// import { useLeafletMap } from 'use-leaflet';

import { store } from '../../store.js';
import { cn } from '../../utils/helpers';
import Tile from "../../images/tile.png"


// import LocateControl from './LocateControl';

import "./MapContainer.scss";

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

const mapStyle = {
  backgroundImage: `url(${Tile})`,
}

const MapContainer = () => {
  const { state, dispatch } = useContext(store);
  // const { map } = useLeaflet();

  // console.log("viewport store", state.viewport)
  
  
  const {
    activeMap,
    activeLayers,
    autoCenterMap,
    position,
    viewport,
    startLocate
  } = state;

  const classes = {
    map: cn('lf-Map-container', autoCenterMap ? 'ac-enabled' : 'ac-disabled')
  };

  const mapOptions = {
    minZoom: state.mapSettings.minZoom,
    zoom: viewport.zoom,
    scrollWheelZoom: autoCenterMap ? "center" : "true",
    setView: autoCenterMap ? true : false, // false if autocenter map is not true?
    style: mapStyle
  }

  const layersProps = {
    map: !activeMap.apikey ? activeMap.url : `${activeMap.url}${activeMap.apikey}`,
    activeMap: activeMap,
    activeLayers: activeLayers,
  }

  
  let maxZoom = activeMap.maxZoom ? activeMap.maxZoom : state.mapSettings.maxZoom;

  useEffect(
    () => {
      
      if (position !== null && autoCenterMap) {
        dispatch({ type: 'center map on position', value: position })
      }
      console.log("MaksZóm:", maxZoom)
    }, [position, autoCenterMap, maxZoom]
  )

  const onViewportChanged = viewport => {

    dispatch({ type: 'on change viewport', value: { center: viewport.center, zoom: viewport.zoom }})
    
    let position = JSON.stringify(viewport.center)
    localStorage.setItem("lastViewportDataPosition", position);
    localStorage.setItem("lastViewportDataZoomNumber", viewport.zoom);
    
  }

  return(
    <div className={classes.map}>
      <Map
          onViewportChanged={onViewportChanged}
          onDrag={() => dispatch({ type: 'center map', value: false })}
          viewport={viewport}
          {...mapOptions}
          maxZoom={maxZoom}
          // To-Do
          zoomControl={false} // next to disable default zoom control & make custom
          attributionControl={false} // maybe custom in the future
        >
          {/* <YourComponent /> */}

          {startLocate && <Geolocation />}

          {startLocate && position !== null && <PositionMarker position={position} />}

          <BaseLayer {...layersProps} />
          <MapOverlays {...layersProps} />

        </Map>
    </div>
  )
}

export default MapContainer;

// @Docs 
// https://www.npmjs.com/package/react-hook-geolocation
const Geolocation = props => {

  // const geolocation = useGeolocation()
  const { state, dispatch } = useContext(store);

  // eslint-disable-next-line
  const { autoCenterMap, position, startLocate } = state;



  
  const onGeolocationUpdate = geolocation => {
    console.log('Here’s some new data from the Geolocation API: ', geolocation)
    dispatch({ type: 'set my position', value: [ geolocation.latitude, geolocation.longitude ]})
  }
 
  // eslint-disable-next-line
  const geolocation = useGeolocation({}, onGeolocationUpdate)



  // if error -> handle to store & context
  return null;
  // return !geolocation.error
  //   ? (
  //     <ul>
  //       <li>Latitude:          {geolocation.latitude}</li>
  //       <li>Longitude:         {geolocation.longitude}</li>
  //       <li>Location accuracy: {geolocation.accuracy}</li>
  //       <li>Altitude:          {geolocation.altitude}</li>
  //       <li>Altitude accuracy: {geolocation.altitudeAccuracy}</li>
  //       <li>Heading:           {geolocation.heading}</li>
  //       <li>Speed:             {geolocation.speed}</li>
  //       <li>Timestamp:         {geolocation.timestamp}</li>
  //     </ul>
  //   )
  //   : (
  //     <p>No geolocation, sorry.</p>
  //   )
}











// eslint disable-next-line
const YourComponent = () => {
  const { map } = useLeaflet();
  const [bounds, setBounds] = React.useState({});

  React.useEffect(() => {
    const eventHandler = event => {
      setBounds(event.target.getBounds());
      //doSomethingElse();
    }
    map.on("moveend", eventHandler);

    return () => {
      map.off("moveend", eventHandler); // Remove event handler to avoid creating multiple handlers
    }
  }, [setBounds, map]);
  // Use bounds for whatever you need
  console.log(map);
  return (
    
    <div style={{ zIndex: 1000 }}>Lat: {bounds.lat}; long: {bounds.lng}</div>
  )
}