// https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/

// Classic
// https://www.toptal.com/react/react-context-api



import maps from './utils/MapsData.json';
import layers from './utils/LayersData.json';

import React, { createContext, useReducer, useEffect } from 'react';

let storedPosition = localStorage.getItem("lastViewportDataPosition");
let storedZoom = localStorage.getItem("lastViewportDataZoomNumber");
let storedLastActiveMap = localStorage.getItem('lastMap')

const initialMapData = {
  zoom: 6,
  center: [0, 0],
  mapFocus: 17,
  minZoom: 4,
  maxZoom: 20,
}

const initialState = {
  maps: maps,
  layers: layers,
  activeMap: maps[0],
  activeLayers: [layers[0], layers[1], layers[2]],
  viewport: {
    center: initialMapData.center,
    zoom: initialMapData.zoom
  },
  mapSettings: {
    minZoom: initialMapData.minZoom,
    maxZoom: initialMapData.maxZoom,
  },
  position: null,
  startLocate: false,
  autoCenterMap: false,
  expanded: false,
  compactMode: false
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {

      // Samples
      case 'sample action #1':
        const newState = { ...state, viewport: { ...state.viewport, center: action.value } }// do something with the action
        return newState;
      case 'sample action #2':
        return {...state, viewport: { ...state.viewport, center: action.value }};


      // Initial position  
      case 'set initial position':
        return {...state, viewport: { ...state.viewport, center: action.value }};
      case 'change map':
        return {...state, activeMap: maps[action.value] };
      case 'on change viewport':
        return {...state, viewport: action.value };
      case 'center map on position':
        return {...state, viewport: { ...state.viewport, center: action.value }};
      case 'set zoom':
        return {...state, viewport: { ...state.viewport, zoom: action.value }};
      case 'zoom in':
        return {...state, viewport: { ...state.viewport, zoom: state.viewport.zoom + 1 }};

      // Set user geolocation data
      case 'set my position':
        return {...state, position: action.value };
        
      case 'start locate':
        return {...state, startLocate: action.value };
      case 'center map':
        return {...state, autoCenterMap: action.value };
      
      // Menu 
      case 'open menu':
        return {...state, expanded: true };
      case 'close menu':
        return {...state, expanded: false };
      case 'toggle menu':
        return {...state, expanded: !state.expanded };

      // Local store  
      case 'last stored settings':
        let location = JSON.parse(storedPosition)
        console.log(location)
        return {
          ...state, 
          activeMap: maps[storedLastActiveMap],
          viewport: { center: location, zoom: storedZoom }
        };

      // No action...  
      default:
        //throw new Error();
        console.warn("No dispatchEvent set!")
    };
  }, initialState);

  useEffect(
    () => {
      if (storedPosition && storedZoom && storedLastActiveMap) {
        dispatch({ type: 'last stored settings' })
      } else {
        dispatch({ type: 'set initial position', value: [50,19] })
      }
      
    }, []
  );
  

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }