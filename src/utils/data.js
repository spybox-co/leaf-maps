export const maps = [
  {
    vendor: "Open Street Map",
    name: "Mapnik",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", 
    maxZoom: 19
  },
  {
    vendor: "Open Street Map",
    name: "Open Topo Map",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    maxZoom: 17
  },
  {
    vendor: "CyclOSM",
    name: "Bike Map",
    url: "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
    maxZoom: 18
  },
  {
    vendor: "Mapbox",
    name: "Streets",
    url: "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}",
    apikey: "?access_token=pk.eyJ1IjoiZG9taW5pY29tIiwiYSI6ImNqaWJ1djgxZjFtMXMzcGxndjVtY2kwNTcifQ.mSBj4uB0ilknv9tWABt8fQ"
  },
  {
    vendor: "Mapbox",
    name: "Outdoors",
    url: "https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}",
    apikey: "?access_token=pk.eyJ1IjoiZG9taW5pY29tIiwiYSI6ImNqaWJ1djgxZjFtMXMzcGxndjVtY2kwNTcifQ.mSBj4uB0ilknv9tWABt8fQ"
  },
  {
    vendor: "Mapbox",
    name: "Satellite Streets",
    url: "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}",
    apikey: "?access_token=pk.eyJ1IjoiZG9taW5pY29tIiwiYSI6ImNqaWJ1djgxZjFtMXMzcGxndjVtY2kwNTcifQ.mSBj4uB0ilknv9tWABt8fQ"
  },
  {
    vendor: "Thunder Forest",
    name: "Cycle",
    url: "https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png",
    apikey: "?apikey=f44334560bdb4771a041609cc75a8983"
  },
  {
    vendor: "Thunder Forest",
    name: "Outdoors",
    url: "https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png",
    apikey: "?apikey=f44334560bdb4771a041609cc75a8983"
  },
  {
    vendor: "Thunder Forest",
    name: "Landscape",
    url: "https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png",
    apikey: "?apikey=f44334560bdb4771a041609cc75a8983"
  },
  {
    vendor: "Thunder Forest",
    name: "Transport",
    url: "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png",
    apikey: "?apikey=f44334560bdb4771a041609cc75a8983"
  },
  {
    vendor: "Thunder Forest",
    name: "Neighbourhood",
    url: "https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png",
    apikey: "?apikey=f44334560bdb4771a041609cc75a8983"
  },
  {
    vendor: "Öpnvkarte",
    name: "Transport Map",
    url: "https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png",
    apikey: "?apikey=f44334560bdb4771a041609cc75a8983",
    maxZoom: 18
  },
  {
    vendor: "Carto",
    name: "Positron",
    url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
  },
  {
    vendor: "Carto",
    name: "Dark Matter",
    url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
    default: true
  },
  {
    vendor: "Esri",
    name: "World",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    maxZoom: 18,
    desc: "Satelite"
  },
  {
    vendor: "Stamen",
    name: "Toner Lite",
    url: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png",
    maxZoom: 18,
  }
];

export const layers = [
  {
    vendor: "Way Marked Trails",
    name: "Hiking Routes",
    url: "https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png"
  },
  {
    vendor: "Way Marked Trails",
    name: "Cycling Routes",
    url: "https://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png"
  },
  {
    vendor: "CyclOSM",
    name: "Bike Map Lite",
    url: "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm-lite/{z}/{x}/{y}.png"
  },
  {
    vendor: "Way Marked Trails",
    name: "Ski Slopes",
    url: "https://tile.waymarkedtrails.org/slopes/{z}/{x}/{y}.png"
  },
  {
    vendor: "Way Marked Trails",
    name: "Horse Riding",
    url: "https://tile.waymarkedtrails.org/riding/{z}/{x}/{y}.png"
  },
  {
    vendor: "Open Sea Map",
    name: "Sea Marks",
    url: "https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"
  },
]

