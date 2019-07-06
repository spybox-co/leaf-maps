import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import { geolocated, geoPropTypes } from "react-geolocated";
import { isTSParenthesizedType } from '@babel/types';

// GEOLOCATION API
// https://alligator.io/js/geolocation-api/


// OVERLAY MAPS:
// url="http://tile.lonvia.de/hiking/{z}/{x}/{y}.png"
// url="http://tile.lonvia.de/cycling/{z}/{x}/{y}.png"

// BASE MAPS
// url="http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" // maxZoom 17
// url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png" // maxZoom 17
// url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png" // maxZoom 16
// url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}{r}.png" // maxZoom 20

class ReactLeaflet extends Component {
  constructor() {
    super()
    this.state = {
      lat: 52.7255932,    // 54.5168,   //52.7255932,19.1612561
      lng: 19.1612561,    // 18.5399,
      zoom: 13,
    }
  }


  componentDidMount() {
    if (this.props.coords) {
      this.setPosition();
    }
  }  
  componentDidUpdate() {
    if (this.props.coords) {
      this.setPosition();
    }
  }

  setPosition = () => {
    if (this.state.lat !== this.props.coords.latitude && this.state.lng !== this.props.coords.longitude) {
      this.setState({ lat: this.props.coords.latitude, lng: this.props.coords.longitude })
    }
  }

  render() {
    // eslint-disable-next-line
    const { coords, viewport, mapType } = this.props;
    //const position = [this.props.position.lat, this.props.position.lng];
    let position;
    // const position = [this.props.coords.latitude, this.props.coords.longitude];


    if (this.props.coords) {
      console.log("juz sie zaladowaly!");
      position = [this.props.coords.latitude, this.props.coords.longitude];
    } else {
      console.log("jeszcze nie");
      position = [this.state.lat, this.state.lng];
    }
    

    // eslint-disable-next-line
    const { lat, lng, zoom } = this.state;
    return (
      <Map 
        //center={this.props.position} 
        zoom={zoom} 
        maxZoom={20}
        //viewport={this.state.viewport}
        //viewport={{center: position}}
        viewport={{ center: [lat, lng], zoom: this.props.zoom }}
      >
        <TileLayer
          
          //url={`https://tile.thunderforest.com/${mapType}/{z}/{x}/{y}.png?apikey=f44334560bdb4771a041609cc75a8983`}
          url={`https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png`}
          //attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        
        <Marker position={ [lat, lng] }>
          <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
        </Marker>
      </Map>
    );
  }
}

ReactLeaflet.propTypes = { ...ReactLeaflet.propTypes, ...geoPropTypes };

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity
  },
  watchPosition: true,
  userDecisionTimeout: null,
  suppressLocationOnMount: true,
  geolocationProvider: navigator.geolocation
})(ReactLeaflet);