

// https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/

// Classic
// https://www.toptal.com/react/react-context-api

import _ from 'lodash';
import axios from 'axios';


import { maps, layers } from 'utils/data';
import { createContext, useReducer, useEffect } from 'react';

const defaultMap = maps.filter(i => [true].includes(i.default));


const initialAppSettings = {
  menu: {
    expanded: false,
    activeTab: 0,
  },
  map: defaultMap
}

const initialMapData = {
  zoom: 6,
  center: [0, 0],
  mapFocus: 16,
  minZoom: 3,
  maxZoom: 20,  
}

const initialState = {
  maps: maps,
  layers: layers,
  activeMap: initialAppSettings.map,
  activeLayers: [],
  viewport: {
    center: initialMapData.center,
    zoom: initialMapData.zoom
  },
  mapSettings: {
    minZoom: initialMapData.minZoom,
    maxZoom: initialMapData.maxZoom,
  },
  position: null,
  location: {
    set: false,
    center: null,
    label: null,
    bounds: null
  },
  startLocate: false,
  geolocation: null,
  autoCenterMap: false,
  expanded: initialAppSettings.menu.expanded,
  compactMode: false,
  menuActiveTab: initialAppSettings.menu.activeTab,
  globalHeader: {
    expanded: false
  }
};

const store = createContext(initialState);
const { Provider } = store;




const StateProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer((state, action) => {
    const focusLocationOnMapZoom = initialMapData.mapFocus; // state.activeMap.maxZoom < state.mapSettings.maxZoom ? state.activeMap.maxZoom : 16;
    const focusPositionOnMapZoom = state.viewport.zoom < 14 ? focusLocationOnMapZoom : state.viewport.zoom;

    switch(action.type) {

      // Samples
      case 'sample action #1':
        const newState = { ...state, viewport: { ...state.viewport, center: action.value } }// do something with the action
        return newState;
      case 'sample action #2':
        return {...state, viewport: { ...state.viewport, center: action.value }};


      // Updating map overlayers
      case 'add layer':
        const addActiveLayer = [ ...state.activeLayers, action.value ];
        localStorage.setItem('lastStoredActiveLayers', JSON.stringify(addActiveLayer));
        return {...state, activeLayers: addActiveLayer };

      case 'delete layer':
        const updateActiveLayers = _.reject(state.activeLayers, (el) => { return el.url === action.value.url });
        localStorage.setItem('lastStoredActiveLayers', JSON.stringify(updateActiveLayers));
        return {...state, activeLayers: updateActiveLayers };



      // Initial position  
      case 'set initial position':
        return {...state, viewport: { ...state.viewport, center: action.value }};

      // Map actions  
      case 'change map':
        localStorage.setItem('lastMap', action.value);
        return {...state, activeMap: maps[action.value] };
      case 'on change viewport':
        return {...state, viewport: action.value };
      case 'center map on position':
        return {...state, autoCenterMap: true, viewport: { ...state.viewport, center: action.value, zoom: focusPositionOnMapZoom }};
      case 'set zoom':
        return {...state, viewport: { ...state.viewport, zoom: action.value }};
        case 'set center':
          return {...state, viewport: { ...state.viewport, center: action.value }};
      case 'zoom in':
        return {...state, viewport: { ...state.viewport, zoom: state.viewport.zoom + 1 }};

      // Search Location actions  
      case 'center map on location':
        return {...state,  autoCenterMap: false, viewport: { ...state.viewport, center: action.value, zoom: focusLocationOnMapZoom }};
      case 'set location':
        return {...state, location: { ...state.viewport, set: true, center: action.value, label: action.label }};
      case 'clear location':
        return {...state,  location: { ...state.viewport, set: false, center: null, label: null }};

      // Set user geolocation data
      case 'set my position':
        return {...state, position: action.value };

      // Update geolocation data details for console
      case 'update geolocation details':
        return {...state, geolocation: action.value };

      case 'start locate':
        return {...state, startLocate: action.value };
      case 'locate off':
        return {...state, startLocate: false, position: null, autoCenterMap: false };  
      case 'center map':
        return {...state, autoCenterMap: action.value };
      
      // Menu actions
      case 'open menu':
        return {...state, expanded: true };
      case 'close menu':
        return {...state, expanded: false };
      case 'toggle menu':
        return {...state, expanded: !state.expanded };

      // Local Storage
      case 'last stored position':
        return { ...state, ...action.setState};

      case 'last stored settings':
        return {
          ...state,
          ...action.setState, 
        };

      // No action...  
      default:
        //throw new Error();
        console.warn("No dispatchEvent set!")
    };
  }, initialState);


  const getDefaultUserLocationData = () => {
    let location = [];

    axios
    .get('https://www.geolocation-db.com/json/')
    .then(res => {
      const response = res.data;
      location = [response.latitude, response.longitude];

      // To-Do
      console.group("Initial user position");
        console.log("response from GEOLOCDB:", response);
        console.log("Position:", location);
      console.groupEnd(); 

      dispatch({ type: 'set initial position', value: location })
    })
    .catch(error => {
      // In case of error locating default posiotion use Greenwich as start location
      location = [51,0];
      console.log(error)
      dispatch({ type: 'set initial position', value: location })
    });
  };


  useEffect(
    () => {

      // getDefaultUserLocationData();
      //  @Param lastViewportDataPosition & lastViewportDataZoomNumber from localStorage is initially parsed as a string!
      let storedPosition = JSON.parse(localStorage.getItem('lastViewportDataPosition'));
      let storedZoom = parseInt(localStorage.getItem('lastViewportDataZoomNumber'), 10);
      let storedLastActiveMap = localStorage.getItem('lastMap');
      let lastStoredActiveLayers = JSON.parse(localStorage.getItem('lastStoredActiveLayers'));

      if (storedPosition && storedZoom) {
        dispatch({ 
          type: 'last stored position', 
          setState: {
            viewport: { center: storedPosition, zoom: storedZoom }
          } 
        })
      } else {
        getDefaultUserLocationData();
      }

      if (storedLastActiveMap || lastStoredActiveLayers) {
        dispatch({ 
          type: 'last stored settings', 
          setState: { 
            activeMap: storedLastActiveMap ? maps[storedLastActiveMap] : maps[0],
            activeLayers: lastStoredActiveLayers ? lastStoredActiveLayers : [] 
          } 
        })
      }    
    }, []
  );
  

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }