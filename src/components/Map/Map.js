import React, { Component } from "react";
import { 
  Map,
  TileLayer,
  //Marker, 
  Circle, 
  CircleMarker,
} from "react-leaflet";

import LayersControlGroup from './LayerControlGroup';

import Tile from "../../images/tile.png"

import "./Map.scss";

// Geolocate
// https://stackoverflow.com/questions/54099898/react-locate-on-map

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
  // Console throw error "Exceed depth of..."

  // componentDidUpdate(nextProps, nextState) {
  //   if (nextProps) {
  //     this.setState({ maxZoom: nextProps.maxZoom });
  //   }   
  // }

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
          <LayersControlGroup />
             
          {selectedMap && <TileLayer
                            url={`${selectedMap.url}${mapApi}`}
                          />}

          
          {coordsEnabled && <Circle
                              className="circle"
                              center={[position.lat, position.lng]}
                              radius={48}
                            />}

          {coordsEnabled && <CircleMarker
                              className="circle-marker"
                              center={[position.lat, position.lng]}
                              radius={8}
                            />}
                            
        </Map>
      </div>
    );
  }
}

/** 

<TileLayer
url={`${selectedMap.url}${mapApi}`}

//  @PARAM url with literals will be unnecessary, TileLayers instead
//  @PARAM required? Or custom bar?

// maxZoom={18}
// maxZoom={selectedMap.maxZoom}
/>

*/