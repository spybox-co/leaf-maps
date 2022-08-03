import { maps } from 'utils//maps/data';


// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// https://docs.mapbox.com/mapbox-gl-js/example/mouse-position/

export function initializeMap(mapboxgl, map) {

  console.log(maps.outdoors);

  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })
  );
  // Add zoom and rotation controls to the map.
  map.addControl(
    new mapboxgl.NavigationControl()
  );

  map.addControl(
    new mapboxgl.ScaleControl({ position: 'bottom-right' })
  );

  // map.on('zoomend', () => {
  //   const bounds = map.getBounds();
  //   const zoom = map.getZoom();
  //   console.log(bounds)
  //   console.log("current zoom", zoom)
  // });
  // map.on('moveend', () => {
  //   const coords = map.getCenter();
  //   console.log(coords);
  //   console.log(coords.lng, coords.lat);
  // });

  // map.setStyle(maps.cycle);

  // map.on("mouseenter", "data", function () {
  //   map.getCanvas().style.cursor = "pointer";
  // });
  // map.on("mouseleave", "data", function () {
  //   map.getCanvas().style.cursor = "";
  // });
}