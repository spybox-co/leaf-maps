import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


// OVERLAY MAPS:
// url="http://tile.lonvia.de/hiking/{z}/{x}/{y}.png"
// url="http://tile.lonvia.de/cycling/{z}/{x}/{y}.png"

// BASE MAPS
// url="http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" // maxZoom 17
// url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png" // maxZoom 17
// url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png" // maxZoom 16
// url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}{r}.png" // maxZoom 20

export default class Container extends Component {
  constructor() {
    super()
    this.state = {
      lat: 54.5168,
      lng: 18.5399,
      zoom: 13
    }
  }

  render() {
    
    const { viewport, zoom, mapType } = this.props;
    const position = [this.props.position.lat, this.props.position.lng];

    return (
      <Map center={position} zoom={zoom} maxZoom={20} viewport={viewport}>
        <TileLayer
          
          url={`https://tile.thunderforest.com/${mapType}/{z}/{x}/{y}.png?apikey=f44334560bdb4771a041609cc75a8983`}

          
          //attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        
        <Marker position={position}>
          <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
        </Marker>
      </Map>
    );
  }
}