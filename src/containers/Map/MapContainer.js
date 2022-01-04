import React, { useEffect, useContext } from 'react';

// import Geolocation from '../Geolocation';
import Geolocate from './Controls/Geolocate';
import { Map } from 'react-leaflet';

import { BaseLayer, MapOverlays } from './Layers';
import { PositionMarker, LocationMarker } from './Markers';


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
const mapFilterSettings = {
  saturation: 1,
  contrast: 100,
}


const mapStyle = {
  backgroundImage: `url(${Tile})`,
  filter: `saturate(${mapFilterSettings.saturation}) contrast(${mapFilterSettings.contrast}%)`
}

const MapContainer = () => {
  const { state, dispatch } = useContext(store);
 
  const {
    activeMap,
    activeLayers,
    autoCenterMap,
    position,
    location,
    viewport,
    startLocate
  } = state;

  // @Param maxZoom in the future
  //const [maxZoom, setMaxZoom] = useState(state.mapSettings.maxZoom); 

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
    scrollWheelZoom: autoCenterMap ? "center" : "true",
    setView: autoCenterMap ? true : false, // false if autocenter map is not true?
    style: mapStyle
  }

  const layersProps = {
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

  return(
    <div className={classes.map}>
      <Map
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

        {startLocate && <Geolocate />}
        {/* <Geolocation watchPosition={startLocate} /> */}
        
        {startLocate && position !== null && <PositionMarker position={position} />}

        {location.set && location.center !== null && location.label !== null && <LocationMarker position={location.center} label={location.label} />}
        <BaseLayer {...layersProps} />
        <MapOverlays {...layersProps} />

      </Map>
    </div>
  )
}

export default MapContainer;
