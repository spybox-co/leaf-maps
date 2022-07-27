import { useState, useEffect } from "react";
import mapboxgl from 'mapbox-gl';
import { initializeMap } from "./initializeMap";

import 'mapbox-gl/dist/mapbox-gl.css';




export default function Mapbox({ data }) {
  // const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();

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
      container: "lm-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [data.longitude || viewport.longitude, data.latitude || viewport.latitude],
      zoom: viewport.zoom,
      // pitch: 45,
      // maxBounds: [
      //   [-77.875588, 38.50705], // Southwest coordinates
      //   [-76.15381, 39.548764], // Northeast coordinates
      // ],
    });

    initializeMap(mapboxgl, map);
    setMap(map);
  }, []);


  return <div id="lm-map" style={{ height: "100%", width: "100%" }} />

}