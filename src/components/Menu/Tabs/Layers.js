import React, { useContext } from 'react';
import { store } from '../../../store.js';
import CheckBox from '../CheckBox/UICheckBox';
// import { Checkbox } from 'carbon-components-react';

export default () => {
  const { state } = useContext(store);
  const { layers, activeMap } = state;

  const filterActiveLayers = (layer) => {
    const result = state.activeLayers.filter(l => l.url === layer).map(l => l.url);
    if (result[0] === layer) {
      return true;
    } else {
      return false;
    }
  }

  return layers.length !== 0 && layers.map((layer, index) => (
    <CheckBox
      key={index}
      index={index} // optionally
      active={filterActiveLayers(layer.url) ? true : false}
      label={layer.vendor}
      title={layer.name}
      layer={layer.url}
      map={!activeMap.apikey ? activeMap.url : `${activeMap.url}${activeMap.apikey}`}
      center={state.viewport.center}
      zoom={state.viewport.zoom}
      option={layer.default ? "Default" : null}
      description={layer.desc ? layer.desc : null}
      composition={layer}
    />
  ))
}