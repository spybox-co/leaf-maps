import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import { geolocated, geoPropTypes } from "react-geolocated";

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
      lat: 54.5168,
      lng: 18.5399,
      zoom: 13,
    }
    viewport: {

    }
  }

  componentDidUpdate() {
    // if (this.props.coords) {
    //   console.log("juz sie zaladowaly!");
    //   this.setState({ lat: this.props.coords.latitude, lng: this.props.coords.longitude})
    // }
  }

  render() {
    
    const { coords, viewport, zoom, mapType } = this.props;
    //const position = [this.props.position.lat, this.props.position.lng];
    let position;
    // const position = [this.props.coords.latitude, this.props.coords.longitude];


    if (this.props.coords) {
      console.log("juz sie zaladowaly!");
      position = [this.props.coords.latitude, this.props.coords.longitude];
    } else {
      position = [this.state.lat, this.state.lng];
    }
    

    return (
      <Map 
        //center={this.props.position} 
        zoom={zoom} 
        maxZoom={20}
        //viewport={this.state.viewport}
        viewport={{center: position}}
      >
        {console.log("from state", position)}
        
        

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

ReactLeaflet.propTypes = { ...ReactLeaflet.propTypes, ...geoPropTypes };

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity
  },
  watchPosition: true,
  userDecisionTimeout: null,
  suppressLocationOnMount: false,
  geolocationProvider: navigator.geolocation
})(ReactLeaflet);