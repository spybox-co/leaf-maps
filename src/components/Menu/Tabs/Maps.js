import React, { useContext } from 'react';
import { store } from '../../../store.js';
import Link from '../Link/UILink';

export default () => {
  const { state } = useContext(store);
  const { maps } = state;

  return maps.length !== 0 && maps.map((map, index) => (
    <Link
      key={index}
      index={index}
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