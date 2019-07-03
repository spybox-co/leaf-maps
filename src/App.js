import React, { Component } from 'react';
import { geolocated } from "react-geolocated";
import Map from './components/Map/Map';
import Header from './components/Header/Header';
import Button from './components/Header/Button';
import './App.css';

// GEOLOCATION React
// https://www.npmjs.com/package/react-geolocated

// MDN
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation

class App extends Component {
  constructor() {
    super()
    this.state = {
      position: {
        lat: 54.5168,
        lng: 18.5399
      },
      zoom: 13,
      mapType: "outdoors", // cycle, outdoors, transport, landscape, pioneer, mobile-atlas, neighbourhood
      maps: ["cycle", "outdoors", "transport", "landscape", "pioneer", "mobile-atlas", "neighbourhood"],
    }
  }

  ChangeMap = ( type ) => {
    this.setState({ mapType: type });
  }

  GetCoords = () => {
    if (this.props.coords) {
      this.setState({ position: { lat: this.props.coords.latitude, lng: this.props.coords.longitude }})
    }
  }

  render () {
    const { position, zoom, mapType, maps } = this.state;
    return (
              
      <div className="App">
        <Header>
          {maps.map((map, i) => <Button 
                                  label={map} 
                                  onClick={() => this.ChangeMap(map)} 
                                />
          )}

          <Button 
            label="Get Location" 
            onClick={() => this.GetCoords()} 
          />
          
        </Header>
        <Map 
          position={position}
          zoom={zoom}
          mapType={mapType}
        />
        {!this.props.isGeolocationAvailable ? (
              <div>Your browser does not support Geolocation</div>
          ) : !this.props.isGeolocationEnabled ? (
              <div>Geolocation is not enabled</div>
          ) : this.props.coords ? (
              <table className="coords">
                  <tbody>
                      <tr>
                          <td>latitude</td>
                          <td>{this.props.coords.latitude}</td>
                      </tr>
                      <tr>
                          <td>longitude</td>
                          <td>{this.props.coords.longitude}</td>
                      </tr>
                      <tr>
                          <td>altitude</td>
                          <td>{this.props.coords.altitude}</td>
                      </tr>
                      <tr>
                          <td>heading</td>
                          <td>{this.props.coords.heading}</td>
                      </tr>
                      <tr>
                          <td>speed</td>
                          <td>{this.props.coords.speed}</td>
                      </tr>
                  </tbody>
              </table>
          ) : (
              <div>Getting the location data&hellip; </div>
          )}
      </div>
    );
  };
}

export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
