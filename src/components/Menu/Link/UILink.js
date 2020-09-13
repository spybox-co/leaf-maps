import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { cn } from '../../../utils/helpers';

import "./UILink.scss";

const Link = props => {

    const { label, title, option, active, description, map, zoom, center, ...other } = props;

    const classes = {
      root: cn('target-link', active && 'active')
    }

    return (
      <a className={classes.root} {...other}>
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
          center={center} 
          zoom={zoom}
        />
      </a>
    );
}

export default Link;

const Preview = ({ source, center, zoom, className }) => (
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
    </Map>
  </div>
)