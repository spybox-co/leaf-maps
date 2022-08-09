// DOCS
// https://docs.mapbox.com/mapbox-gl-js/example/map-tiles/

// TEST
// https://codepen.io/pen/?&editable=true

export const openmap = {
  standard: {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: ['https://tile.osm.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '---'
      }
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 20
      }
    ],
    name: 'OSM Standard'
  },
  topo: {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: ['https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '---'
      }
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 20
      }
    ],
    name: 'OSM Topo'
  }
};

export const stamen = {
  toner: {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: ['https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution:
          'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
      }
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 20
      }
    ],
    name: 'Stamen Toner'
  },
  tonerLite: {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: [
          'https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png'
        ],
        tileSize: 256,
        attribution:
          'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
      }
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 20
      }
    ],
    name: 'Stamen Toner Lite'
  },
  terrain: {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: [
          'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg'
        ],
        tileSize: 256,
        attribution:
          'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
      }
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 20
      }
    ],
    name: 'Stamen Terrain'
  },
  watercolor: {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: [
          'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
        ],
        tileSize: 256,
        attribution:
          'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
      }
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 20
      }
    ],
    name: 'Stamen Watercolor'
  }
};

export const thunderforest = {
  cycle: {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: [
          'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=f44334560bdb4771a041609cc75a8983'
        ],
        tileSize: 256,
        attribution:
          'Map tiles by <a target="_top" rel="noopener" href="https://thunderforest.com">Thunder Forest</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
      }
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 20
      }
    ],
    name: 'Thunderforest Cycle'
  },
  outdoors: {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: [
          'https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=f44334560bdb4771a041609cc75a8983'
        ],
        tileSize: 256,
        attribution:
          'Map tiles by <a target="_top" rel="noopener" href="https://thunderforest.com">Thunder Forest</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
      }
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 20
      }
    ],
    name: 'Thunderforest Outdoors'
  },
  landscape: {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: [
          'https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=f44334560bdb4771a041609cc75a8983'
        ],
        tileSize: 256,
        attribution:
          'Map tiles by <a target="_top" rel="noopener" href="https://thunderforest.com">Thunder Forest</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
      }
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 20
      }
    ],
    name: 'Thunderforest Landscape'
  },
  transport: {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: [
          'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=f44334560bdb4771a041609cc75a8983'
        ],
        tileSize: 256,
        attribution:
          'Map tiles by <a target="_top" rel="noopener" href="https://thunderforest.com">Thunder Forest</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
      }
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 20
      }
    ],
    name: 'Thunderforest Transport'
  }
};

export const wikimedia = {
  standard: {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: ['https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '---'
      }
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 10
      }
    ],
    name: 'Wikimedia Standard'
  },
  hikebike: {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: ['http://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '---'
      }
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 20
      }
    ],
    name: 'Wikimedia Hike & Bike'
  }
};

export const maps4you = {
  default: {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: ['https://tileserver.4umaps.com/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '---'
      }
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 20
      }
    ],
    name: 'Maps 4 You'
  }
};

export const maptiler = {
  satellite: {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: ['https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg'],
        tileSize: 256,
        attribution: '---'
      }
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 20
      }
    ],
    name: 'MaptilerSatellite'
  }
};
