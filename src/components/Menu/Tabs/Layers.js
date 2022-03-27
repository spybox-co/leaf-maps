import React, { useContext } from 'react';
import { store } from '../../../store.js';
// import CheckBox from '../CheckBox/UICheckBox';

import LayerCard from '../LayerCard';

export default () => {
  const { state } = useContext(store);
  const { layers, activeMap } = state;

  const { dispatch } = useContext(store);





  const filterActiveLayers = (layer) => {
    const result = state.activeLayers.filter(l => l.url === layer).map(l => l.url);
    if (result[0] === layer) {
      return true;
    } else {
      return false;
    }
  }

  const selectLayer = (layer, index) => {
    const active = filterActiveLayers(layer.url) ? true : false;
    if (!active) {
      console.log(layer, typeof layer);
      dispatch({ type: 'add layer', value: layer, index: index });
    } else {
      dispatch({ type: 'delete layer', value: layer, index: index });
    }
  }

  

  return layers.length !== 0 && layers.map((layer, index) => (
    <LayerCard
      key={index}
      index={index} // optionally
      onClick={event => {
        selectLayer(layer, index);
        event.preventDefault();
      }}
      kind="selectable"
      active={filterActiveLayers(layer.url) ? true : false}
      label={layer.vendor}
      title={layer.name}
      layer={layer.url}
      map={!activeMap.apikey ? activeMap.url : `${activeMap.url}${activeMap.apikey}`}
      center={state.viewport.center}
      zoom={state.viewport.zoom}
      option={layer.default ? "Default" : null}
      description={layer.desc ? layer.desc : null}
      //layer={layer}
    />
  ))
}