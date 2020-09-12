import React from 'react';
import {
  Map, 
  TileLayer
} from 'react-leaflet';
import "./UICheckBox.scss";

const CheckBox = props => {

    const { label, title, option, active, description, map, layer, zoom, center, ...other } = props;

    const isActive = active ? " active" : "";

    return (
      <a className={`target-link${isActive}`} {...other}>
        <span className="target-link-label">{label ? label : "Label"}</span>
        <span className="target-link-title">{title ? title : "Title"}</span>
        {/* 
          {option ? <span className="target-link-option">{option}</span> : null}
          {description ? <span className="target-link-desc">{description}</span> : null} 
        */}
        {active ? <div className="target-link-active-label" /> : null}

        <Preview 
          className="map-preview"
          source={map} 
          layer={layer}
          center={center} 
          zoom={zoom}
        />
      </a>
    );
}

export default CheckBox;

const Preview = ({ source, layer, center, zoom, className }) => (
  <div className={className}>
    <Map 
      zoomControl={false}
      attributionControl={false}
      style={{ height: `100%` }}
      center={center} 
      zoom={zoom-2}
      scrollWheelZoom={false}
      dragging={false}
      touchZoom={false}
    > 
      <TileLayer url={source} />
      <TileLayer url={layer} />
      
    </Map>
  </div>
)