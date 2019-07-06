import React, { Component } from 'react';
import Map from './components/Map/Map';
import Header from './components/Header/Header';
import UIHeader from './components/Header/UIHeader';
import IconButton from './components/IconButton';
import Panel from './components/Menu';


import { Button } from 'carbon-components-react';
// eslint-disable-next-line no-use-before-define
import { Tile, ClickableTile, SelectableTile } from "carbon-components-react";
//import IconName from '@carbon/icon-react/es/add/16';
import Add from '@carbon/icons-react/es/add--filled/16';
// eslint-disable-next-line no-use-before-define
import Menu from '@carbon/icons-react/es/menu/16';


import Demo from "./Demo";

import * as Basemaps from './utils/Basemaps.json';

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
        lat: 54.00,
        lng: 18.00
      },
      zoom: 13,
      mapType: "outdoors", // cycle, outdoors, transport, landscape, pioneer, mobile-atlas, neighbourhood
      maps: ["cycle", "outdoors", "transport", "landscape", "pioneer", "mobile-atlas", "neighbourhood"],
      baseMaps: Basemaps,
      selectedMap: [], //
    }

    this.getInnerRef = this.getInnerRef.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }
  componentDidMount() {
    // console.log(this.state.baseMaps);
  }

  ChangeMap = ( type ) => {
    this.setState({ mapType: type });
  }

  GetLocation = () => {
    if (this.props.coords) {
      this.setState({ position: { lat: this.props.coords.latitude, lng: this.props.coords.longitude }})
    }
  }





  innerRef;

  getInnerRef(ref) {
    this.innerRef = ref;
  }

  getLocation() {
    this.innerRef && this.innerRef.getLocation();
  }

  render () {
    const { position, zoom, mapType, baseMaps, maps, selectedMap } = this.state;
    const { GetLocation, ChangeMap } = this;
    const { getInnerRef, getLocation } = this;

    return (
              
      <div className="App">
        <Panel>
          <ClickableTile>
          {/* {maps.map((map, i) => <Button 
                                  key={i}
                                  kind="primary"
                                  small
                                  onClick={() => ChangeMap(map)} 
                                >{map}</Button>
          )} */}
          <Demo ref={getInnerRef} />
          </ClickableTile>
        </Panel>
        <UIHeader 
          GetLocation={GetLocation}
        >
          <IconButton 
            kind="danger" 
            renderIcon={Add}
            iconDescription="Menu"
            //onClick={GetLocation}
            onClick={getLocation}
          />
        </UIHeader> 
        {/* <Header>
          <IconButton 
            kind="secondary" 
            renderIcon={Menu}
            iconDescription="Get location"
            //onClick={() => GetLocation()}
          />
          <Button kind="danger">Leaf Maps</Button>
          <IconButton 
            kind="primary" 
            renderIcon={Add}
            iconDescription="Menu"
            onClick={() => GetLocation()}
          />
        </Header> */}
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
export default App;


// export default geolocated({
//   positionOptions: {
//     enableHighAccuracy: true,
//     maximumAge: 0,
//     timeout: Infinity,
//   },
//   watchPosition: true,
//   userDecisionTimeout: null,
//   suppressLocationOnMount: false,
//   geolocationProvider: navigator.geolocation,
//   isOptimisticGeolocationEnabled: true
// })(App);





const GeoTable = props => {
  return !props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
  ) : !props.isGeolocationEnabled ? (
      <div className="geo-not-enabled">Geolocation is not enabled</div>
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