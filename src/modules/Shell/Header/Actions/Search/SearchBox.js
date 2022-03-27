import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input';
import { store } from '../../../../../store.js';
import { cn } from '../../../../../utils/helpers';

import ScrollableArea from '../../../../../components/ScrollableArea';
import { Button } from '../../../../../components/Button';

import ActionButton from '../ActionButton';
import SearchButton from './SearchButton';

// import { OpenStreetMapProvider } from 'leaflet-geosearch';


import './SearchBox.scss';

const options = {
  minQuerylength: 2,
  queryLimit: 20,
  timeOut: 500,
  noResultsTimeOut: 1000,
  maxDropdownHeight: 6
}
// More about API
// https://github.com/komoot/photon

const SearchForm = () => {
  const { state, dispatch } = useContext(store);


  const [results, setResults] = useState([]); // []
  const [dropdown, showDropdown] = useState(true); // false
  const [value, setValue] = useState('');
  const [expanded, setExpanded] = useState(true); // false

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
        window.document.querySelector('.spbx--header__global').classList.add("search-is-active")
      } else {
        window.document.querySelector('.spbx--header__global').classList.remove("search-is-active")
      }
    }, [results, expanded]);


  const ResultsProvider = (query) => {
    let results = [];
    const SearchAPI = `https://photon.komoot.io/api/?q=${query}&limit=${options.queryLimit}&lat=${state.viewport.center[0]}&lon=${state.viewport.center[1]}`; //&lat=${state.viewport.center[0]}&lon=${state.viewport.center[1]}
    
    const SearchCities = `https://photon.komoot.io/api/?q=${query}&limit=6`;
    axios
      .get(SearchCities)
      .then(res => {
        const response = res.data;
        results.push(response.features.filter(i => i.properties.type === "city"))
        // setResults(response.features.filter(i => i.properties.type === "city"));
        
        return axios
          .get(SearchAPI)
          .then(res => {
            const response = res.data;
            results.push(response.features)
            setResults(results);
            console.log(results);
          })
          .catch(error => {
            console.log(error)
          });
      })
      .catch(error => {
        console.log(error)
      });

  }

  const ResultItemClickHandler = (data) => {
    dispatch({ type: 'center map on location', value: [ data.geometry.coordinates[1].toFixed(4), data.geometry.coordinates[0].toFixed(4) ] });
    dispatch({ type: 'set location', value: [data.geometry.coordinates[1], data.geometry.coordinates[0]], label: [data.properties.name, data.properties.city && data.properties.city, data.properties.country && data.properties.country, data.properties.postcode && data.properties.postcode].filter(Boolean).join(', ') });
    showDropdown(false);
    setValue(data.properties.name)
  }
  // const prov = OpenStreetMapProvider();
  // const GeoSearchControlElement = SearchControl;

  const classes = {
    root: cn('Header--module__Search', 'SearchBox', expanded && 'expanded'),
    input: 'SearchBox-Input'
  }

  const [cities, locals] = results;
  const dropdownHeight = 18; // (locals.length > options.maxDropdownHeight ? options.maxDropdownHeight : results.length) * 3 + 1;
  

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
            minLength={options.minQuerylength}
            debounceTimeout={options.timeOut}
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
        <div className="SearchBox-Results">
          <ScrollableArea area={{ width: `100%`, height: `${dropdownHeight}rem` }}>
            <ResultGroup>Cities</ResultGroup>
            <ul>
              {cities.map((result, i) => 
                <ResultItem 
                  key={i}
                  onClick={() => ResultItemClickHandler(result)}
                  properties={result.properties}
                  name={result.properties.name}
                />
              )}
            </ul>
            <ResultGroup>Locations, places</ResultGroup>
            <ul>
              {locals.map((result, i) => 
                <ResultItem 
                  key={i}
                  onClick={() => ResultItemClickHandler(result)}
                  properties={result.properties}
                  name={result.properties.name}
                />
              )}
            </ul>
          </ScrollableArea>
        </div>
      )}

      {results.length === 0 && value.length > options.minQuerylength && dropdown && <NoResultsItem />}

    </div>
  )
}

export default SearchForm;

const ResultItem = ({ name, properties, onClick }) => {
  const label = [properties.city ? properties.city : null, properties.country ? properties.country : null, properties.postcode ? properties.postcode : null].filter(Boolean).join(', ')
  return(
    <li className="SearchBox-Result-item">
      <Button className="Result-item__link" 
        onClick={onClick}
        kind={"tertiary"} 
        renderIcon="ArrowRight"
      >
        
        {name && <strong>{`${name} →`}</strong>}
        &nbsp;
        {label}
      </Button>
    </li>
  );
}

const ResultGroup = ({ children }) => <div className="SearchBox-Result-group">{children}</div>;




const NoResultsItem = () => {
  const [message, showMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      showMessage(true);
    }, options.noResultsTimeOut);
    return () => clearTimeout(timer);
  }, [])

  const Component = (
    <div className="SearchBox-Results">
      <div className="SearchBox-Result-item empty">
        Nothing found! Try again.
      </div>
    </div>
  );

  
  if (message) {
    return Component;
  }
  return null;
}


const CloseButton = ({ onClick, ...other }) => (
  <ActionButton
    renderIcon="Close"
    iconDescription="Close SearchBox"
    onClick={onClick}
    {...other}
  />
);