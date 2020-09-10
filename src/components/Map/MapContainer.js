import React, { useContext } from 'react';
import { 
  Map,
  TileLayer,
  // Marker, 
  // Circle, 
  // CircleMarker,
  useLeaflet,
  LeafletProvider,
  LeafletConsumer,
  withLeaflet
} from 'react-leaflet';
import { useLeafletMap } from 'use-leaflet';

import { store, StateProvider } from '../../store.js';
import { cn } from '../../utils/helpers';
import Tile from "../../images/tile.png"
import LayersControlGroup from './LayerControlGroup';

import "./Map.scss";

// Geolocate
// https://stackoverflow.com/questions/54099898/react-locate-on-map

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
  const context = useContext(store);
  // const { map } = useLeaflet();

  const leafletContextMap = useLeafletMap()
  // const mapiszcze = useLeaflet(map)

  const leafletContext = LeafletProvider;

  const {
    activeMap,
    activeLayers,
    autoCenterMap,
    position,
    viewport,
  } = context.state;

  const classes = {
    map: cn('lf-Map-container', autoCenterMap ? 'ac-enabled' : 'ac-disabled')
  };
  

  const mapProps = {
    layer: !activeMap.apikey ? activeMap.url : `${activeMap.url}${activeMap.apikey}`,
    maxZoom: activeMap.maxZoom || context.state.mapSettings.maxZoom, // activeMap.maxZoom ? activeMap.maxZoom : context.state.mapSettings.maxZoom,
    minZoom: context.state.mapSettings.minZoom,
  }

  const onViewportChanged = viewport => {
    console.log("On Czeńdź Wiułport", viewport)
    console.log("On Czeńdź Wiułport in kontekst", context.state.viewport)
    console.log("On Czeńdź Wiułport in kontekst hook", leafletContextMap)
    let position = JSON.stringify(viewport.center)
    localStorage.setItem("lastViewportDataPosition", position);
    localStorage.setItem("lastViewportDataZoomNumber", viewport.zoom);
    
  }
  
  return(
    <div className={classes.map}>
      <Map
          onViewportChanged={onViewportChanged}
          // viewport={
          //   autoCenterMap && coordsEnabled
          //     ? { center: [position.lat, position.lng], zoom: viewport.zoom }
          //     : viewport
          // }
          viewport={viewport}
          maxZoom={mapProps.maxZoom}
          minZoom={mapProps.minZoom}
          // scrollWheelZoom={this.props.scrollWheel ? mapZoom : false}
          // touchZoom={mapZoom}
          touchZoom={6}
          zoomControl={true} // disable default zoom control
          //onDrag={event => this.props.disableAutoCenterMap()}

          style={mapStyle}
        >
          <YourComponent />

          {activeMap && <TileLayer url={mapProps.layer} />}

          {activeLayers.length > 0 && (
            <>
              {activeLayers.map((layer, i) => <TileLayer url={layer.url} />)}
            </>
          )}

          {/* <LayersControlGroup /> */}
          {/* <LeafletConsumer>
            {context => console.log("kontekst lifleta", context.layerContainer)}
          </LeafletConsumer> */}
          
        </Map>
    </div>
  )
}

export default MapContainer;



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