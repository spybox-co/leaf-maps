import React, { Component } from "react";
import { Map, TileLayer, Circle, CircleMarker } from "react-leaflet";

import Tile from "../../images/tile.png"

import "./Map.scss";

// dynamic minZoom & maxZoom (two last post)
// https://github.com/PaulLeCam/react-leaflet/issues/350

const mapStyle = {
  backgroundImage: `url(${Tile})`,
}

export default class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxZoom: 20
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.maxZoom === nextProps.maxZoom) {
        return true
    }
    else {
        this.setState({ maxZoom: nextProps.maxZoom }, () => console.log("Map: update max zoom:", this.state.maxZoom))
        return false
    }
    
    
  }
  componentDidlUpdate(nextProps, nextState) {
    if (nextProps) {
      this.setState({ maxZoom: nextProps.maxZoom });
    }
    
  }

  render() {
    //const { ...others } = this.props;
    const {
      onViewportChanged,
      selectedMap,
      autoCenterMap,
      minZoom,
      maxZoom,
      position,
      coordsEnabled,
      viewport
    } = this.props;

    const classes = {
      map: `lf-Map-container${autoCenterMap ? " ac-enabled" : " ac-disabled"}`
    };
    const mapZoom = autoCenterMap ? "center" : "true";
    const mapApi =
      selectedMap.apikey !== null ? `${selectedMap.apikey}` : "";
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
          minZoom={minZoom}
          scrollWheelZoom={this.props.scrollWheel ? mapZoom : false}
          touchZoom={mapZoom}
          zoomControl={false} // disable default zoom control
          onDrag={event => this.props.disableAutoCenterMap()}

          style={mapStyle}
        >
          <TileLayer
            url={`${selectedMap.url}${mapApi}`}
            /*
              @PARAM url with literals will be unnecessary, TileLayers instead
              @PARAM required? Or custom bar?
            */
            // maxZoom={18}
            // maxZoom={selectedMap.maxZoom}
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
