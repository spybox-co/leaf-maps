import React, { useState, useEffect, useContext } from 'react';
import useGeolocation from 'react-hook-geolocation';
import { 
  Map,
  TileLayer,
  // Marker, 
  Circle, 
  CircleMarker,
  useLeaflet,
  //withLeaflet
} from 'react-leaflet';
// import { useLeafletMap } from 'use-leaflet';

import { store } from '../../store.js';
import { cn } from '../../utils/helpers';
import Tile from "../../images/tile.png"


// import LayersControlGroup from './LayerControlGroup';
// import LocateControl from './LocateControl';

import "./Map.scss";

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
  marginLeft: `20rem`
}

const MapContainer = () => {
  const { state, dispatch } = useContext(store);
  // const { map } = useLeaflet();
  
  
  const {
    activeMap,
    activeLayers,
    autoCenterMap,
    position,
    viewport,
    coordsEnabled,
    startLocate
  } = state;

  const classes = {
    map: cn('lf-Map-container', autoCenterMap ? 'ac-enabled' : 'ac-disabled')
  };
  

  const mapProps = {
    layer: !activeMap.apikey ? activeMap.url : `${activeMap.url}${activeMap.apikey}`,
    maxZoom: activeMap.maxZoom || state.mapSettings.maxZoom,
    minZoom: state.mapSettings.minZoom,
    viewport: autoCenterMap && coordsEnabled ? { center: [position.lat, position.lng], zoom: viewport.zoom } : viewport,
    zoom: 6
  }

  const onViewportChanged = viewport => {
    // console.log("On Czeńdź Wiułport", viewport.center, viewport.zoom)
    // console.log("On Czeńdź Wiułport in kontekst", state.viewport.center, state.viewport.zoom)
    dispatch({ type: 'on change viewport', value: { center: viewport.center, zoom: viewport.zoom }})
    let position = JSON.stringify(viewport.center)
    localStorage.setItem("lastViewportDataPosition", position);
    localStorage.setItem("lastViewportDataZoomNumber", viewport.zoom);
    
  }
  console.log("start lokejt", startLocate)
  return(
    <div className={classes.map}>
      <Map
          onViewportChanged={onViewportChanged}
          setView={true}
          viewport={viewport}
          maxZoom={mapProps.maxZoom}
          minZoom={mapProps.minZoom}
          // scrollWheelZoom={this.props.scrollWheel ? mapZoom : false}
          touchZoom={mapProps.zoom}
          zoomControl={true} // next to disable default zoom control or make custom

          //onDrag={event => this.props.disableAutoCenterMap()}

          style={mapStyle}
        >
          <YourComponent />

          {startLocate && <ComponentWithGeolocation />}

          {position !== null && <PositionMarker position={position} />}

          {activeMap && <TileLayer url={mapProps.layer} />}

          {activeLayers.length > 0 && (
            <>
              {activeLayers.map((layer, i) => <TileLayer key={i} url={layer.url} />)}
            </>
          )}

        </Map>
    </div>
  )
}

export default MapContainer;


const PositionMarker = ({ position })=> (
  <>
    <Circle
      className="circle"
      center={position}
      radius={48}
    />
    <CircleMarker
      className="circle-marker"
      center={position}
      radius={8}
    />
  </>
)



const ComponentWithGeolocation = props => {
  // const { startLocate } = props;
  //const geolocation = useGeolocation()
  const { dispatch } = useContext(store);

  const onGeolocationUpdate = geolocation => {
    console.log('Here’s some new data from the Geolocation API: ', geolocation)
    dispatch({ type: 'center map on position', value: [ geolocation.latitude, geolocation.longitude ]})
    dispatch({ type: 'set my position', value: [ geolocation.latitude, geolocation.longitude ]})
  }


   
  const geolocation = useGeolocation({}, onGeolocationUpdate)

  // if error -> handle to store & context
 
  return !geolocation.error
    ? (
      <ul>
        <li>Latitude:          {geolocation.latitude}</li>
        <li>Longitude:         {geolocation.longitude}</li>
        <li>Location accuracy: {geolocation.accuracy}</li>
        <li>Altitude:          {geolocation.altitude}</li>
        <li>Altitude accuracy: {geolocation.altitudeAccuracy}</li>
        <li>Heading:           {geolocation.heading}</li>
        <li>Speed:             {geolocation.speed}</li>
        <li>Timestamp:         {geolocation.timestamp}</li>
      </ul>
    )
    : (
      <p>No geolocation, sorry.</p>
    )
}












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