import React, { Component } from 'react';
import { geolocated } from "react-geolocated";
import Map from './components/Map/Map';
import Header from './components/Header/Header';
import SimpleButton from './components/Header/Button';
import IconButton from './components/Header/IconButton';


import { Button, Checkbox, TextArea } from 'carbon-components-react';
//import IconName from '@carbon/icon-react/es/add/16';
import Add from '@carbon/icons-react/es/add--filled/16';
import Menu from '@carbon/icons-react/es/menu/16';


import * as Basemaps from './utils/Basemaps.json';

import './App.css';
import './carbon.css';

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
      baseMaps: Basemaps,
      selectedMap: [],
    }
  }
  componentDidMount() {
    console.log(this.state.baseMaps);
  }

  ChangeMap = ( type ) => {
    this.setState({ mapType: type });
  }

  GetLocation = () => {
    if (this.props.coords) {
      this.setState({ position: { lat: this.props.coords.latitude, lng: this.props.coords.longitude }})
    }
  }

  render () {
    const { position, zoom, mapType, baseMaps, maps, selectedMap } = this.state;
    return (
              
      <div className="App">
        <Header>
          <IconButton 
            kind="secondary" 
            renderIcon={Menu}
            //onClick={() => this.GetLocation()}
          />
          <Button kind="danger">Leaf Maps</Button>
          <IconButton 
            kind="primary" 
            renderIcon={Add}
            onClick={() => this.GetLocation()}
          />
          {maps.map((map, i) => <Button 
                                  key={i}
                                  kind="secondary"
                                  onClick={() => this.ChangeMap(map)} 
                                >{map}</Button>
          )}



          </Header>
        <Map
          tileLayer={selectedMap} 
          position={position}
          zoom={zoom}
          mapType={mapType}
          viewport={position}
        />
        <GeoTable />
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





const GeoTable = props => {
  return !props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
  ) : !props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
  ) : props.coords ? (
      <table className="coords">
          <tbody>
              <tr>
                  <td>latitude</td>
                  <td>{props.coords.latitude}</td>
              </tr>
              <tr>
                  <td>longitude</td>
                  <td>{props.coords.longitude}</td>
              </tr>
              <tr>
                  <td>altitude</td>
                  <td>{props.coords.altitude}</td>
              </tr>
              <tr>
                  <td>heading</td>
                  <td>{props.coords.heading}</td>
              </tr>
              <tr>
                  <td>speed</td>
                  <td>{props.coords.speed}</td>
              </tr>
          </tbody>
      </table>
  ) : (
      <div>Getting the location data&hellip; </div>
  )
}