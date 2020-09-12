import React, { useContext } from 'react';
import { store } from '../../../store.js';
import CheckBox from '../CheckBox/UICheckBox';
import { Checkbox } from 'carbon-components-react';

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

  return layers.length !== 0 && layers.map((layer, index) => (
        <CheckBox
          key={index}
          //active={state.activelayer.url === layer.url ? true : false}
          label={layer.vendor}
          title={layer.name}
          layer={layer.url}
          // map={activeMap.url}
          map={!activeMap.apikey ? activeMap.url : `${activeMap.url}${activeMap.apikey}`}
          center={state.viewport.center}
          zoom={state.viewport.zoom}
          option={layer.default ? "Default" : null}
          description={layer.desc ? layer.desc : null}
          // onClick={event => {
          //   changeMap(index);
          //   event.preventDefault();
          // }}
        />
      ))
}