import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer, Circle, CircleMarker } from 'react-leaflet';

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
      console.log("juz sie zaladowaly!");
    } else {
      console.log("jeszcze nie");
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
    const { selectedMap } = this.props;
    
    // Docs Map
    // https://react-leaflet.js.org/docs/en/components.html#map
    const { lat, lng, zoom } = this.state;
    return (
      <Map 
        zoom={zoom} 
        maxZoom={20}
        viewport={{ center: [lat, lng], zoom: this.props.zoom }}
        // scrollWheelZoom={false}
      >
        <TileLayer
          
          url={`${selectedMap}`}
          //url={`https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png`}
          //attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        
        {/* <Marker position={ [lat, lng] }>
          <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
        </Marker> */}
        <CircleMarker center={ [lat, lng] } radius={10}/>
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