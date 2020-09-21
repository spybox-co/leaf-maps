import React, { useContext } from 'react';
import { store } from '../../../store.js';
import Link from '../Link/UILink';

export default () => {
  const { state, dispatch } = useContext(store);
  const { maps } = state;
  const changeMap = index => {
    dispatch({ type: 'change map', value: index });
    dispatch({ type: 'close menu'})

    localStorage.setItem('lastMap', index);
    // console.log("Local Stored Map ID:", localStorage.getItem('lastMap'), typeof localStorage.getItem('lastMap'));
    // console.log("aktiw map is:", state.activeMap)
  }

  return maps.length !== 0 && maps.map((map, index) => (
        <Link
          key={index}
          active={state.activeMap.url === map.url ? true : false}
          label={map.vendor}
          title={map.name}
          map={!map.apikey ? map.url : `${map.url}${map.apikey}`}
          center={state.viewport.center}
          zoom={state.viewport.zoom}
          option={map.default ? "Default" : null}
          description={map.desc ? map.desc : null}
          onClick={event => {
            changeMap(index);
            event.preventDefault();
          }}
        />
      ))
}