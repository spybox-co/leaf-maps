import React, { useContext } from 'react';
import { store } from '../../../store.js';
import { cn } from '../../../utils/helpers';
import Preview from '../Preview';

import "./UICheckBox.scss";

const CheckBox = props => {
  const { dispatch } = useContext(store);
  const { 
    label, 
    title,
    index, 
    option, 
    active, 
    description, 
    map, 
    layer, 
    zoom, 
    center, 
    composition, 
    ...other 
  } = props;

  const classes = {
    root: cn('target-checkbox', active && 'active', 'item')
  }

  const handleClickCheckBox = (composition, index) => {
    if (!active) {
      console.log(composition, typeof composition);
      dispatch({ type: 'add layer', value: composition, index: index });
    } else {
      dispatch({ type: 'delete layer', value: composition, index: index });
    }
  }

  return (
    <a 
      className={classes.root}
      onClick={event => {
        handleClickCheckBox(composition, index);
        event.preventDefault();
      }}
      {...other}
    >
      <span className="target-checkbox-label">{label ? label : "Label"}</span>
      <span className="target-checkbox-title">{title ? title : "Title"}</span>
      {/* 
        {option ? <span className="target-checkbox-option">{option}</span> : null}
        {description ? <span className="target-checkbox-desc">{description}</span> : null} 
      */}
      {active ? <div className="target-checkbox-active-label" /> : null}

      <Preview 
        className="target-checkbox-map-preview"
        source={map} 
        layer={layer}
        center={center} 
        zoom={zoom}
      />
    </a>
  );
}

export default CheckBox;

// const Preview = ({ source, layer, center, zoom, className }) => (
//   <div className={className}>
//     <Map 
//       zoomControl={false}
//       attributionControl={false}
//       style={{ height: `100%` }}
//       center={center} 
//       zoom={zoom-2}
//       scrollWheelZoom={false}
//       dragging={false}
//       touchZoom={false}
//     > 
//       <TileLayer url={source} />
//       <TileLayer url={layer} />
      
//     </Map>
//   </div>
// )