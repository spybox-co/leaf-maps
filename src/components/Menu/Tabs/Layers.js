import React, { useContext } from 'react';
import { store } from '../../../store.js';
import CheckBox from '../CheckBox/UICheckBox';
// import { Checkbox } from 'carbon-components-react';

export default () => {
  const { state, dispatch } = useContext(store);
  const { layers, activeMap } = state;
  // const changeMap = index => {
  //   dispatch({ type: 'change map', value: index });
  //   dispatch({ type: 'close menu'})

  //   localStorage.setItem('lastMap', index);
  //   console.log("Local Stored Map ID:", localStorage.getItem('lastMap'), typeof localStorage.getItem('lastMap'));
  //   console.log("aktiw map is:", state.activeMap)
  // }

  // const findLayer = state.activelayer.filter(lay => lay.url === layer.url)

  // const sampleLayerUrl = "https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png"

  // const filtrator = state.activeLayers.filter(l => l.url === sampleLayerUrl).map(l => l.url);

  // console.log(filtrator ? true : false, filtrator)

  console.log(state.activeLayers);

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