export function initializeMap(mapboxgl, map) {


  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })
  );

  // map.on("mouseenter", "data", function () {
  //   map.getCanvas().style.cursor = "pointer";
  // });
  // map.on("mouseleave", "data", function () {
  //   map.getCanvas().style.cursor = "";
  // });
}