import React, { Component } from 'react';
import { withLeaflet } from 'react-leaflet';
import Locate from 'leaflet.locatecontrol';


// https://www.npmjs.com/package/react-leaflet-locate-control
class LocateControl extends Component {
  componentDidMount() {
    const { options, startDirectly } = this.props;
    const { map } = this.props.leaflet;

    const lc = new Locate(options);
    lc.addTo(map);

    if (startDirectly) {
      // request location update and set location
      lc.start();
    }
    if (!startDirectly) {
      // request location update and set location
      lc.stop();
    }
  }

  render() {
    console.log("propsy z lokejt kontrola", this.props)
    return null;
  }
}

export default withLeaflet(LocateControl);