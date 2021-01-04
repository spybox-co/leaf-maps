import React, { Component } from 'react';
import { 
  SearchControl, 
  OpenStreetMapProvider 
} from 'react-leaflet-geosearch';

// import { OpenStreetMapProvider } from 'leaflet-geosearch';

import './SearchBox.scss';

const SearchBox = () => {
  const prov = OpenStreetMapProvider();
  // const GeoSearchControlElement = SearchControl;
  return (
    <SearchControl
      provider={prov}
      showMarker={true}
      showPopup={false}
      popupFormat={({ query, result }) => result.label}
      maxMarkers={3}
      retainZoomLevel={false}
      animateZoom={true}
      autoClose={true}
      searchLabel={"Enter address, please"}
      keepResult={true}
    />
  )
}

export default SearchBox;



{/* <GeoSearchControlElement
provider={prov}
showMarker={true}
showPopup={false}
popupFormat={({ query, result }) => result.label}
maxMarkers={3}
retainZoomLevel={false}
animateZoom={true}
autoClose={true}
searchLabel={"Enter address, please"}
keepResult={true}
/> */}