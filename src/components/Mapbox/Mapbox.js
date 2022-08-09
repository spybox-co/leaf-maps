import { useState, useEffect, useContext, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { initializeMap } from "./initializeMap";

import { store } from 'store';

import { maps } from 'utils//maps/data';

import 'mapbox-gl/dist/mapbox-gl.css';


const selectedStyles = [
  maps.streets,
  maps.cycle,
  maps.outdoors,
  maps.transport,
  maps.outdoorsRaster,
  maps.satellite
];


// @DOCS ChangeMap
// https://docs.mapbox.com/mapbox-gl-js/example/setstyle/
// @DOCS Initialize Map with react
// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/


export default function Mapbox({ data }) {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();
  const { state, dispatch } = useContext(store);
  // const mapContainer = 'map-container'
  // const map = useRef(null);

  const [mapStyle, setMapStyle] = useState(maps.streets)

  let coords = null;
  let zoom = null;

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    // The latitude and longitude of the center of London
    latitude: 51.5074,
    longitude: -0.1278,
    zoom: 10
  });

  const functionSwitchMapStyle = () => {
    const currentIndex = selectedStyles.indexOf(mapStyle);
    const nextIndex = currentIndex === selectedStyles.length - 1 ? 0 : currentIndex + 1;

    setMapStyle(selectedStyles[nextIndex]);
    
    
    // dispatch({
    //   type: 'change map', 
    //   value: selectedStyles[nextIndex]
    // });
  };

  mapboxgl.accessToken = 'pk.eyJ1IjoiZG9taW5pY29tIiwiYSI6ImNsNjNrOWFlNTA5czMzY3BkNmg1c3NjMzAifQ.goJvrYudhO-le3B-_eaY_Q';
  


  useEffect(() => {
    setPageIsMounted(true);
    dispatch({
      type: 'change map', 
      value: selectedStyles[0]
    });


    let map = new mapboxgl.Map({
      container: "map-container",
      center: [data.longitude || viewport.longitude, data.latitude || viewport.latitude],
      zoom: viewport.zoom,
      attributionControl: false,
      // pitch: 45,
      // maxBounds: [
      //   [-77.875588, 38.50705], // Southwest coordinates
      //   [-76.15381, 39.548764], // Northeast coordinates
      // ],
    });


    map.on('zoomend', () => {
      const bounds = map.getBounds();
      zoom = map.getZoom();
      console.log(bounds)
      console.log("current zoom", zoom.toFixed(2))
      dispatch({ 
        type: 'set zoom', 
        value: zoom.toFixed(2)
      })
    });

    map.on('moveend', () => {
      coords = map.getCenter();
      console.log(coords.lng.toFixed(2), coords.lat.toFixed(2));
      dispatch({ 
        type: 'set center', 
        value: [coords.lng.toFixed(4), coords.lat.toFixed(4)]
      })
    });
    map.setStyle(selectedStyles[0]);
    /*
    map.addControl(
      new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
      })
    );
    */
    initializeMap(mapboxgl, map);
    setMap(map);
    
  }, []);

  useEffect(() => {
    if (pageIsMounted) {
      Map.setStyle(mapStyle)
    }
  }, [pageIsMounted, setMap, Map, mapStyle]);


  return(
    <div id="map-container" className="lf--map-container" style={{ height: "100%", width: "100%" }}>
      <SwitchMapButton onClick={functionSwitchMapStyle} />
    </div>
  )

}


const SwitchMapButton = ({ onClick }) => {
  const styles = {
    position: 'absolute',
    bottom: 8,
    left: 8,
    padding: 8,
    zIndex: 1000,
    height: 32,
    display: 'flex',
    alignItems: 'center'
  };
  return (
    <button style={styles} onClick={onClick}>
      Switch Map
    </button>
  );
};