import React, { useContext } from 'react';
import { store } from '../../../store.js';
// import CheckBox from '../CheckBox/UICheckBox';

import LayerCard from '../../../components/LayerCard';
import { Button } from '../../../components/Button';

export default () => {
  const { state } = useContext(store);
  const { layers, activeMap, activeLayers } = state;

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
      // console.log(layer, typeof layer);
      dispatch({ type: 'add layer', value: layer, index: index });
    } else {
      dispatch({ type: 'delete layer', value: layer, index: index });
    }
  }

  const clearSelectedLayers = () => {
    dispatch({ type: 'clear selected layers' });
  }

  

  return (
    <>
      {layers.length !== 0 && layers.map((layer, index) => (
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
      ))}
      {activeLayers && activeLayers.length !==0 && (
        <div 
          className="Layers-actions" 
          style={{ 
            position: 'sticky', 
            left: 0, right: 0, bottom: 0, 
            padding: '0 1px', 
            width: '100%',
            zIndex: 1000,
          }}>
          <Button onClick={clearSelectedLayers} kind="danger" renderIcon={"TrashCan"}>Clear all</Button>
        </div>
      )}

    </>
  );
}