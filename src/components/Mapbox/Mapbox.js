import { useState, useEffect, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import { initializeMap } from "./initializeMap";

import { store } from 'store';

import 'mapbox-gl/dist/mapbox-gl.css';


// @DOCS ChangeMap
// https://docs.mapbox.com/mapbox-gl-js/example/setstyle/
// @DOCS Initialize Map with react
// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/


export default function Mapbox({ data }) {
  // const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();
  const { state, dispatch } = useContext(store);

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

  mapboxgl.accessToken = 'pk.eyJ1IjoiZG9taW5pY29tIiwiYSI6ImNsNjNrOWFlNTA5czMzY3BkNmg1c3NjMzAifQ.goJvrYudhO-le3B-_eaY_Q';
  
  useEffect(() => {
    // setPageIsMounted(true);

    let map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11",
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
      console.log("current zoom", zoom)
      dispatch({ 
        type: 'set zoom', 
        value: zoom
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
    console.log("fgh")
    if (coords !== null && zoom !== null) {
      const viewport = {
        center: [ coords.lng, coords.lat ],
        zoom: zoom
      }
      console.log("wiułsrort", viewport)
      // dispatch({ 
      //   type: 'on change viewport', 
      //   setState: {
      //     viewport: viewport
      //   } 
      // })
    }
  }, [])


  return <div id="map-container" className="lf--map-container" style={{ height: "100%", width: "100%" }} />

}
