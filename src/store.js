// https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/

// Classic
// https://www.toptal.com/react/react-context-api

import data from './utils/MapsData.json';

import React, { createContext, useReducer } from 'react';

const initialMapData = {
  zoom: 6,
  center: [0, 0],
  mapFocus: 17,
  minZoom: 1,
  maxZoom: 20,
}

const initialState = {
  maps: data,
  activeMap: data[0],
  viewport: {
    center: initialMapData.center,
    zoom: initialMapData.zoom
  },
  position: {
    lat: 0,
    lng: 0
  },
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'action description':
        const newState = null; // do something with the action
        return newState;
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }