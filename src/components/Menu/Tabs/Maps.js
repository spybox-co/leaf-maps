import React, { useContext } from 'react';
import { store } from '../../../store.js';
// import Link from '../Link/UILink';

import LayerCard from '../LayerCard';

export default () => {
  const { state } = useContext(store);
  const { maps } = state;

  const { dispatch } = useContext(store);


  const changeMap = map => {
    dispatch({ type: 'change map', value: map });
    // dispatch({ type: 'close menu'});
  }

  return maps.length !== 0 && maps.map((map, index) => (
    <LayerCard
      key={index}
      index={index}
      onClick={event => {
        changeMap(index);
        event.preventDefault();
      }}
      kind="radio"
      active={state.activeMap.url === map.url ? true : false}
      label={map.vendor}
      title={map.name}
      map={!map.apikey ? map.url : `${map.url}${map.apikey}`}
      center={state.viewport.center}
      zoom={state.viewport.zoom}
      option={map.default ? "Default" : null}
      description={map.desc ? map.desc : null}
    />
  ))
}