import React, { Component } from 'react';
import Map from './components/Map/Map';


import UIHeader from './components/Header/UIHeader';
import UIMenu from './components/Menu/UIMenu';
import { Content as UIContent } from 'carbon-components-react/lib/components/UIShell';



import IconButton from './components/IconButton';
import Panel from './components/Panel';
import Zoom from './components/Zoomer';


// eslint-disable-next-line
import { Button, TextInput } from 'carbon-components-react';
// eslint-disable-next-line 
import { Tile, ClickableTile, SelectableTile } from "carbon-components-react";
//import IconName from '@carbon/icon-react/es/add/16';
import Add from '@carbon/icons-react/es/add--filled/16';
// eslint-disable-next-line
import Menu from '@carbon/icons-react/es/menu/16';


import Demo from "./Demo";

import data from './utils/Basemaps.json';

import './App.css';


// GEOLOCATION React
// https://www.npmjs.com/package/react-geolocated

// MDN
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation

class App extends Component {
  constructor() {
    super()
    this.state = {
      zoom: 6,
      maxZoom: 20,
      centerZoom: 15,
      //mapType: "outdoors", // cycle, outdoors, transport, landscape, pioneer, mobile-atlas, neighbourhood
      //maps: ["cycle", "outdoors", "transport", "landscape", "pioneer", "mobile-atlas", "neighbourhood"],
      BaseMapsData: data,
      selectedMap: [], //

    }

    this.getInnerRef = this.getInnerRef.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    this.defaultMap();
    console.log("Default map:", this.state.selectedMap);
  }
  
  defaultMap = () => {
    this.setState({ selectedMap: this.state.BaseMapsData[6].url })
    if (this.state.BaseMapsData[6].maxZoom) {
      this.setState({ maxZoom: this.state.BaseMapsData[6].maxZoom})
    } 
  }

  changeMap = ( vendor, type, mapUrl, maxZoom ) => {
    console.clear();
    console.log("Vendor:", vendor);
    console.log("Type:", type);
    this.setState({ selectedMap: mapUrl })
    console.log("Map URL:", mapUrl);
    if (maxZoom) {
      this.setState({ maxZoom: maxZoom})
      console.log("Max zoom:", maxZoom);
    } else {
      this.setState({ maxZoom: 20 })
    }
  }

  GetLocation = () => {
    if (this.props.coords) {
      this.setState({ position: { lat: this.props.coords.latitude, lng: this.props.coords.longitude }})
    }
  }

  setZoom = (value) => {
    this.setState({ zoom: value });
    console.log(this.state.zoom);
  }




  innerRef;

  getInnerRef(ref) {
    this.innerRef = ref;
  }

  getLocation() {
    this.innerRef && this.innerRef.getLocation();
  }

  render () {
    // eslint-disable-next-line
    const { position, zoom, maxZoom, centerZoom, mapType, BaseMapsData, selectedMap } = this.state;
    // eslint-disable-next-line
    const { GetLocation, changeMap } = this;
    const { getInnerRef, getLocation, setZoom } = this;

    return (              
      <div className="App">

        <UIHeader 
          GetLocation={GetLocation}
          changeMap={changeMap}
          BaseMapsData={BaseMapsData}
        >
          <IconButton 
            kind="danger" 
            renderIcon={Add}
            iconDescription="Menu"
            onClick={event => {
                      this.getLocation();
                      this.setZoom(centerZoom);
                      event.preventDefault();
                    }}
          />
        </UIHeader> 

        <UIContent>

          <Panel>
            <ClickableTile>
              {/* <Demo ref={getInnerRef} /> */}
              <Zoom 
                zoom={zoom} 
                maxZoom={maxZoom}
                setZoom={this.setZoom} 
                onChange={event => this.setZoom(event.target.value)}
              /> 
            </ClickableTile>
          </Panel>


          <Map
            zoom={zoom}
            maxZoom={maxZoom}
            selectedMap={selectedMap}
            viewport={position}
            ref={getInnerRef}
          />

        </UIContent>
 
      </div>
    );
  };
}

export default App;
