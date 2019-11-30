import React, { Component } from "react";
import axios from "axios";

import Map from "./components/Map/Map";
// import Geolocation from "react-geolocation";
// import { geolocated, geoPropTypes } from "react-geolocated";
// import Locator from "./components/Locator";

import UIHeader from "./components/Header/UIHeader";
import UIFooter from "./components/Footer/UIFooter";
import IconButton from "./components/IconButton";
import Typo from "./components/Typography";
import Panel from "./components/Panel";
import ZoomPanel from "./components/ZoomPanel";

import ExpandablePanel from "./components/ExpandablePanel/ExpandablePanel";

import { ClickableTile, CodeSnippet } from "carbon-components-react";
import { Content as UIContent } from "carbon-components-react/lib/components/UIShell";

import AddFilled16 from "@carbon/icons-react/es/add--filled/16";
import AddAlt16 from "@carbon/icons-react/es/add--alt/16";

import Demo from "./Demo";

import data from "./utils/Basemaps.json";

import "./App.scss";

// GEOLOCATION React
// https://www.npmjs.com/package/react-geolocated

// MDN
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation

// RxJS - state management
// https://www.robinwieruch.de/react-rxjs-state-management-tutorial/

// CALLBACK in setState:
// this.setState({param}, () => console.log(this.state.param));

// LOCAL STORAGE
// https://www.robinwieruch.de/local-storage-react

const MAP_FOCUS = 17;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      initZoom: 6,
      maxZoom: 20,
      centerZoom: 8,
      BaseMapsData: data,
      selectedMap: [],
      autoCenterMap: false,
      coordsEnabled: false,
      viewport: {
        center: [0, 0],
        zoom: 6
      },
      position: {
        lat: 0,
        lng: 0
      }
    };

    this.getInnerRef = this.getInnerRef.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    this.defaultMap();
    this.getUserLocationData();
  }

  defaultMap = () => {
    this.setState({
      selectedMap: {
        url: this.state.BaseMapsData[0].url,
        apikey: this.state.BaseMapsData[0].apikey
          ? this.state.BaseMapsData[0].apikey
          : null
      }
    });
    if (this.state.BaseMapsData[0].maxZoom) {
      this.setState({ maxZoom: this.state.BaseMapsData[0].maxZoom });
    }
  };

  changeMap = (vendor, type, mapUrl, maxZoom, apiKey) => {
    const key = apiKey ? apiKey : null;
    this.setState(
      {
        selectedMap: { url: mapUrl, apikey: key }
      },
      () => console.log(this.state.selectedMap)
    );
    if (maxZoom) {
      this.setState({ maxZoom: maxZoom });
    } else {
      this.setState({ maxZoom: 20 });
    }
  };

  disableAutoCenterMap = () => {
    this.setState({ autoCenterMap: false });
  };

  getCoordsEnabled = (lat, lng) => {
    this.setState({ coordsEnabled: true, position: { lat: lat, lng: lng } });
  };

  focusZoom = value => {
    let zoom = this.state.viewport.zoom;
    if (value > zoom) {
      setTimeout(() => {
        this.setZoom(value);
      }, 1000);
    } else {
      this.setZoom(zoom);
    }
  };

  setZoom = value => {
    this.setState({
      viewport: {
        center: this.state.viewport.center,
        zoom: value
      }
    });
  };

  onViewportChanged = viewport => {
    this.setState({ viewport });
  };

  innerRef;

  getInnerRef(ref) {
    this.innerRef = ref;
  }

  getLocation() {
    this.innerRef && this.innerRef.getLocation();
    // this.setState({ autoCenterMap: true });
    // console.log("auto-center:", this.state.autoCenterMap);
  }

  getUserLocationData = () => {
    axios
      .get(`https://ipinfo.io`)
      .then(res => {
        const response = res.data;
        const lat = parseFloat(response.loc.slice(0, 7));
        const lng = parseFloat(response.loc.slice(8, 15));
        this.setState(
          {
            viewport: {
              center: [lat, lng],
              zoom: this.state.initZoom
            }
          },
          () => console.log("User Location:", this.state.viewport.center)
        );
      })
      .catch(error => {
        this.setState(
          {
            viewport: {
              center: [51, 0],
              zoom: this.state.initZoom
            }
          },
          () => console.log("Can't get User Location, generic [51,0]")
        );
      });
    //console.log("getLocation:", this.state.lat, this.state.lng);
  };

  render() {
    const {
      position,
      zoom,
      maxZoom,
      BaseMapsData,
      selectedMap,
      autoCenterMap,
      coordsEnabled,
      viewport
    } = this.state;

    const {
      GetLocation,
      changeMap,
      onViewportChanged,
      disableAutoCenterMap,
      getCoordsEnabled
    } = this;

    const { getInnerRef } = this;

    const kind = coordsEnabled
      ? autoCenterMap
        ? "primary"
        : "danger"
      : "secondary";

    const icon = coordsEnabled ? AddFilled16 : AddAlt16;

    return (
      <div className="App">
        <UIHeader
          GetLocation={GetLocation}
          changeMap={changeMap}
          BaseMapsData={BaseMapsData}
          selectedMap={selectedMap}
        >
          <IconButton
            id="locator"
            kind={kind}
            renderIcon={icon}
            iconDescription="Locate your position!"
            onClick={event => {
              this.getLocation();
              //coordsEnabled ? this.focusZoom(MAP_FOCUS) : null; // TO-DO focus event when?
              this.setState({ autoCenterMap: true });
              event.preventDefault();
            }}
          />
        </UIHeader>

        <UIContent>
          <Panel />

          <Map
            zoom={zoom}
            maxZoom={maxZoom}
            selectedMap={selectedMap}
            ref={getInnerRef}
            autoCenterMap={autoCenterMap}
            onViewportChanged={onViewportChanged}
            disableAutoCenterMap={disableAutoCenterMap}
            getCoordsEnabled={getCoordsEnabled}
            coordsEnabled={coordsEnabled} // ONLY for tests!
            viewport={viewport}
            position={position}
          />
          <ZoomPanel
            style={{ position: `absolute`, right: 0, top: 80 }}
            zoom={viewport.zoom}
            maxZoom={maxZoom}
            setZoom={this.setZoom}
          />
        </UIContent>
        <UIFooter />
        <ExpandablePanel title="Console">
          <ClickableTile style={expandStyle}>
            <Demo ref={getInnerRef} getCoordsEnabled={getCoordsEnabled} />
          </ClickableTile>

          <ClickableTile style={expandStyle}>
            <Typo>My position:</Typo>
            <CodeSnippet>{`COORDS ENABLED: ${coordsEnabled}`}</CodeSnippet>
            {coordsEnabled ? (
              <>
                <CodeSnippet>{`POS.LAT: ${position.lat}`}</CodeSnippet>
                <CodeSnippet>{`POS.LNG: ${position.lng}`}</CodeSnippet>
              </>
            ) : null}
          </ClickableTile>

          <ClickableTile style={expandStyle}>
            <Typo>Viewport:</Typo>
            <CodeSnippet>{`AUTO CENTER MAP: ${autoCenterMap}`}</CodeSnippet>
            {!autoCenterMap ? (
              <>
                <CodeSnippet>{`VP.LAT: ${viewport.center[0]}`}</CodeSnippet>
                <CodeSnippet>{`VP.LNG: ${viewport.center[1]}`}</CodeSnippet>
              </>
            ) : null}
          </ClickableTile>
        </ExpandablePanel>
      </div>
    );
  }
}

const expandStyle = { color: `black`, height: `100%` };
