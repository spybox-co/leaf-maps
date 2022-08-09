import * as tiles from './rasterMapsDB';
import * as vector from './vectorMapsDB';

// Vector Tiles hosting
// https://github.com/mapbox/awesome-vector-tiles

export const maps = {
  // streets: 'mapbox://styles/mapbox/streets-v11',
  streets: vector.mapbox.streets.url,
  outdoors: "mapbox://styles/mapbox/outdoors-v11",
  light: "mapbox://styles/mapbox/light-v10",
  dark: "mapbox://styles/mapbox/dark-v10",
  satellite: "mapbox://styles/mapbox/satellite-v9",
  toner: tiles.stamen.toner,
  tonerLite: tiles.stamen.toner,
  terrain: tiles.stamen.terrain,
  watercolor: tiles.stamen.watercolor,
  cycle: tiles.thunderforest.cycle,
  transport: tiles.thunderforest.transport,
  outdoorsRaster: tiles.thunderforest.outdoors,
  wikimedia: tiles.wikimedia.standard,
  hikebike: tiles.wikimedia.hikebike,
  maps4you: tiles.maps4you.default,
  mtSatellite: tiles.maptiler.satellite
};

export const mapbox = {
  streets: {
    type: "vector",
    url: "mapbox://styles/mapbox/streets-v11",
    name: "Streets",
    vendor: "Mapbox",
    tags: ["street", "city"]
  },
  outdoors: {
    type: "vector",
    url: "mapbox://styles/mapbox/outdoors-v11",
    name: "Outdoors",
    vendor: "Mapbox",
    tags: ["outdoor", "terrain", "bike", "hike", "trekking"]
  },
  light: {
    type: "vector",
    url: "mapbox://styles/mapbox/light-v10",
    name: "Light",
    vendor: "Mapbox",
    tags: ["street", "city", "light"]
  },
  dark: {
    type: "vector",
    url: "mapbox://styles/mapbox/dark-v10",
    name: "Dark",
    vendor: "Mapbox",
    tags: ["street", "city", "dark"]
  },
  satellite: {
    type: "vector",
    url: "mapbox://styles/mapbox/satellite-v9",
    name: "Satellite",
    vendor: "Mapbox",
    tags: ["street", "city", "satellite"]
  }
};
