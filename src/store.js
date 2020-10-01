

// https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/

// Classic
// https://www.toptal.com/react/react-context-api

import _ from 'lodash';

import maps from './utils/MapsData.json';
import layers from './utils/LayersData.json';

import React, { createContext, useReducer, useEffect } from 'react';

//  @Param lastViewportDataPosition & lastViewportDataZoomNumber from localStorage is initially parsed as a string!
let storedPosition = JSON.parse(localStorage.getItem('lastViewportDataPosition'));
let storedZoom = parseInt(localStorage.getItem('lastViewportDataZoomNumber'), 10);
let storedLastActiveMap = localStorage.getItem('lastMap');
let lastStoredActiveLayers = JSON.parse(localStorage.getItem('lastStoredActiveLayers'));


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
      case 'change map':
        localStorage.setItem('lastMap', action.value);
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

      // Local Storage
      case 'last stored position':
        return {
          ...state, 
          viewport: { center: storedPosition, zoom: storedZoom }
        };
      case 'last stored settings':
        return {
          ...state, 
          activeMap: storedLastActiveMap ? maps[storedLastActiveMap] : maps[0],
          activeLayers: lastStoredActiveLayers ? lastStoredActiveLayers : [],
        };

      // No action...  
      default:
        //throw new Error();
        console.warn("No dispatchEvent set!")
    };
  }, initialState);

  useEffect(
    () => {
      if (storedPosition && storedZoom) {
        dispatch({ type: 'last stored position' })
      } else {
        dispatch({ type: 'set initial position', value: [50,19] })
      }
      if (storedLastActiveMap || lastStoredActiveLayers) {
        dispatch({ type: 'last stored settings' })
      }
      

      // Settings localStorage in console
      
      const HowManyLayersAreActive = layers => {
        for (let i = 0; i < layers.length; i++) {
          console.log(`${i + 1}.`, layers[i].name);
        }
      }
      console.group("Initial settings from localStorage");
        console.log("Position (lat, lng):", storedPosition ? storedPosition : "not stored data");
        console.log("Zoom (number):", storedZoom ? storedZoom : 'not stored data');

        console.log("Initial map from localStorage:", storedLastActiveMap ? maps[storedLastActiveMap].name : "not stored data");
        // Still variable from state
        if (lastStoredActiveLayers && lastStoredActiveLayers.length > 0) {
          console.group("Initial layers from localStorage:");
          console.log(lastStoredActiveLayers)
            HowManyLayersAreActive(lastStoredActiveLayers); 
          console.groupEnd();
        } else { 
          console.info("Initial layers from localStorage:", "not stored data");
        }
      console.groupEnd();      
    }, []
  );
  

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }