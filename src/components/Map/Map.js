import React, { Component } from "react";
import { Map, TileLayer, Circle, CircleMarker } from "react-leaflet";

import "./Map.scss";

export default class MapContainer extends Component {
  render() {
    //const { ...others } = this.props;
    const {
      onViewportChanged,
      selectedMap,
      autoCenterMap,
      maxZoom,
      position,
      coordsEnabled,
      viewport
    } = this.props;

    const classes = {
      map: `lf-Map-container${autoCenterMap ? " ac-enabled" : " ac-disabled"}`
    };
    const scrollWheelZoom = autoCenterMap ? "center" : "true";
    const mapApi =
      selectedMap.apikey !== null ? `?apikey=${selectedMap.apikey}` : "";
    return (
      <div className={classes.map}>
        <Map
          onViewportChanged={onViewportChanged}
          viewport={
            autoCenterMap && coordsEnabled
              ? { center: [position.lat, position.lng], zoom: viewport.zoom }
              : viewport
          }
          maxZoom={maxZoom}
          scrollWheelZoom={scrollWheelZoom}
          onDrag={event => this.props.disableAutoCenterMap()}
        >
          <TileLayer
            url={`${selectedMap.url}${mapApi}`}
            /*
              @PARAM url with literals will be unnecessary, TileLayers instead
              @PARAM required? Or custom bar?
            */
          />
          {coordsEnabled ? (
            <Circle
              className="circle"
              center={[position.lat, position.lng]}
              radius={48}
            />
          ) : null}
          {coordsEnabled ? (
            <CircleMarker
              className="circle-marker"
              center={[position.lat, position.lng]}
              radius={8}
            />
          ) : null}
        </Map>
      </div>
    );
  }
}
