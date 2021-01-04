import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input';
import { store } from '../../store.js';

// import { OpenStreetMapProvider } from 'leaflet-geosearch';

import './SearchForm.scss';

// const provider = new OpenStreetMapProvider();
// const results = provider.search({ query: "Gdynia"});
// const results = provider.search({ query: input.value });



const SearchForm = () => {
  const { dispatch } = useContext(store);
  const [results, setResults] = useState([]);
  const [dropdown, showDropdown] = useState(false);
  const [value, setValue] = useState('');

  useEffect(
    () => {
      console.log("Results:", results)
    }, [results]);


  const ResultsProvider = (query) => {
    axios
    
    .get(`https://photon.komoot.io/api/?q=${query}`)
    .then(res => {
      const response = res.data;
      console.log(response.features);
      setResults(response.features);
    })
    .catch(error => {
      console.log(error)
    });

  }
  // const prov = OpenStreetMapProvider();
  // const GeoSearchControlElement = SearchControl;
  

  return (
    <>
      <DebounceInput
        className={`SearchBox-Input`}
        minLength={2}
        debounceTimeout={500}
        type="text"
        value={value}
        placeholder="Find place..."
        onChange={(event) => {
          setValue(event.target.value);
          ResultsProvider(event.target.value);
        }}
        onFocus={(event) => {
          showDropdown(true)
          event.target.select();
        }}
        forceNotifyByEnter={true}
        forceNotifyOnBlur={false}
        onBlur={(event) => {
          setTimeout(() => showDropdown(false), 100);
        }}
        // {...other}
      />
      {results.length !== 0 && dropdown && (
        <ul className="SearchBox-Results">
          {results.map((r,i) => 
            <ResultItem 
              key={i}
              onClick={() => {
                dispatch({ type: 'center map on position', value: [ r.geometry.coordinates[1], r.geometry.coordinates[0] ] });
                dispatch({ type: 'set zoom', value: 14 });
                showDropdown(false);
              }}
              properties={r.properties}
              name={r.properties.name}
            />
          )}
        </ul>
      )}

      {results.length === 0 && value !== "" && dropdown && (
        <ul className="SearchBox-Results">
          <li className="SearchBox-Result-item">
            Nothing found! Try again.
          </li>
        </ul>
      )}
      
    </>
  )
}

export default SearchForm;

const ResultItem = ({ name, properties, onClick }) => {
  // name ? name : null, 
  const label = [properties.city ? properties.city : null, properties.country ? properties.country : null, properties.postcode ? properties.postcode : null].filter(Boolean).join(', ')
  return(
    <li className="SearchBox-Result-item">
      <button
        onClick={onClick}
      >
        {name && <strong>{`${name}, `}</strong>}
        {label}
      </button>
    </li>
  );
}
