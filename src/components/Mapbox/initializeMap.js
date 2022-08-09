import { maps } from 'utils//maps/data';
import mapboxgl from 'mapbox-gl';

// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// https://docs.mapbox.com/mapbox-gl-js/example/mouse-position/


// https://stackoverflow.com/questions/63709340/how-to-add-a-custom-geolocate-me-button-in-mapbox-gl-js
// https://stackoverflow.com/questions/42541069/how-to-wrap-a-ui-control-mapbox-geolocation-control

class ToggleControl extends mapboxgl.GeolocateControl {
  // _onSuccess(position) {
  //   super._onSuccess(position)
  //     this.map.flyTo({
  //         center: [position.coords.longitude, position.coords.latitude],
  //         zoom: 17,
  //         bearing: 0,
  //         pitch: 0
  //     });
  // }

  onAdd(map, cs) {
      this.map = map;
      this.container = document.createElement('div');
      this.container.className = `mapboxgl-ctrl`;
      const button = this._createButton('monitor_button')
      this.container.appendChild(button);
      return this.container;
  }

  _createButton(className) {
      const el = window.document.createElement('button')
      el.className = className;
      el.textContent = 'Use my location';
      el.addEventListener('click', () => {
          this.trigger();
      });
      this._setup = true;
      return el;
  }
}

// @github
// https://github.com/mapbox/mapbox-gl-js/blob/main/src/ui/control/geolocate_control.js

class GeolocateControlWrapper extends mapboxgl.GeolocateControl {

  _setupUI (supported) {
    super._setupUI(supported)
    if (supported === false) return
  
    this._geolocateButton.className = ' lf--geolocation'
  }
}

export function initializeMap(mapboxgl, map) {

  // console.log(maps.outdoors);

  const toggleControl = new ToggleControl({})
  map.addControl(toggleControl, 'top-left')

  const geolocateControlWrapper = new GeolocateControlWrapper({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
      })
  map.addControl(geolocateControlWrapper, 'top-left')

  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
    })
  );

  // Add zoom and rotation controls to the map.
  map.addControl(
    new mapboxgl.NavigationControl()
  );

  map.addControl(
    new mapboxgl.ScaleControl(),
    'bottom-right'
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