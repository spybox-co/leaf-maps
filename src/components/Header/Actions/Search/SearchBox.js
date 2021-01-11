import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input';
import { store } from '../../../../store.js';
import { cn } from '../../../../utils/helpers';

import ActionButton from '../ActionButton';
import SearchButton from './SearchButton';

// import { OpenStreetMapProvider } from 'leaflet-geosearch';

import './SearchBox.scss';





const SearchForm = () => {
  const { state, dispatch } = useContext(store);
  const [results, setResults] = useState([]);
  const [dropdown, showDropdown] = useState(false);
  const [value, setValue] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    if(expanded) {
      setExpanded(false);
      
    } else {
      setExpanded(true);
    }
  }

  useEffect(
    () => {
      if (results.length > 0) console.log("Results:", results);

      if (expanded) {
        window.document.querySelector('.Header__global').classList.add("search-is-active")
      } else {
        window.document.querySelector('.Header__global').classList.remove("search-is-active")
      }
    }, [results, expanded]);


  const ResultsProvider = (query) => {
    const SearchAPI = `https://photon.komoot.io/api/?q=${query}&lat=${state.viewport.center[0]}&lon=${state.viewport.center[1]}`;
    axios
    .get(SearchAPI)
    .then(res => {
      const response = res.data;
      // console.log(response.features);
      console.log(SearchAPI)
      setResults(response.features);
    })
    .catch(error => {
      console.log(error)
    });

  }
  // const prov = OpenStreetMapProvider();
  // const GeoSearchControlElement = SearchControl;

  const classes = {
    root: cn('Header--module__Search', 'SearchBox', expanded && 'expanded'),
    input: 'SearchBox-Input'
  }
  

  return (
    <div className={classes.root}>
      <SearchButton 
        kind={expanded && 'expanded'}
        onClick={handleClick} 
      />
      {expanded && (
        <>
          <DebounceInput
            className={classes.input}
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
              event.preventDefault();
              setTimeout(() => showDropdown(false), 100);
            }}
            // {...other}
          />

          <CloseButton
            onClick={() => {
              setExpanded(false);
              dispatch({ type: 'clear location'});
            }}
            kind={expanded && 'expanded'}
          />
        </>
      )}
      {results.length !== 0 && dropdown && (
        <ul className="SearchBox-Results">
          {results.map((r,i) => 
            <ResultItem 
              key={i}
              onClick={() => {
                dispatch({ type: 'set location', value: [r.geometry.coordinates[1], r.geometry.coordinates[0]], label: [r.properties.name, r.properties.city ? r.properties.city : null, r.properties.country ? r.properties.country : null, r.properties.postcode ? r.properties.postcode : null].filter(Boolean).join(', ') });
                dispatch({ type: 'center map on location', value: [ r.geometry.coordinates[1], r.geometry.coordinates[0] ] });
                showDropdown(false);
              }}
              properties={r.properties}
              name={r.properties.name}
            />
          )}
        </ul>
      )}

      {results.length === 0 && value !== "" && dropdown && (
        <div className="SearchBox-Results">
          <div className="SearchBox-Result-item empty">
            Nothing found! Try again.
          </div>
        </div>
      )}
      
    </div>
  )
}

export default SearchForm;

const ResultItem = ({ name, properties, onClick }) => {
  const label = [properties.city ? properties.city : null, properties.country ? properties.country : null, properties.postcode ? properties.postcode : null].filter(Boolean).join(', ')
  return(
    <li className="SearchBox-Result-item">
      <button
        onClick={onClick}
      >
        {name && <strong>{`${name} → `}</strong>}
        {label}
      </button>
    </li>
  );
}


const CloseButton = ({ onClick, ...other }) => (
  <ActionButton
    renderIcon="Close"
    iconDescription="Close SearchBox"
    onClick={onClick}
    {...other}
  />
);