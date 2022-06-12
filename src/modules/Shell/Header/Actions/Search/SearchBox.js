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
  const [dropdown, showDropdown] = useState(false); // false
  const [value, setValue] = useState('');
  const [expanded, setExpanded] = useState(false); // false

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

    const SearchGlobal = `https://photon.komoot.io/api/?q=${query}&limit=10`;
    const SearchLocal = `https://photon.komoot.io/api/?q=${query}&limit=${options.queryLimit}&lat=${state.viewport.center[0]}&lon=${state.viewport.center[1]}`; //&lat=${state.viewport.center[0]}&lon=${state.viewport.center[1]}
    
    
    axios
      .get(SearchGlobal)
      .then(res => {
        const response = res.data;
        results.push(response.features.filter(i => i.properties.type === "city" && i.properties.type !== "boundary"))
        // setResults(response.features.filter(i => i.properties.type === "city"));
        
        return axios
          .get(SearchLocal)
          .then(res => {
            const response = res.data;
            results.push(response.features.filter(i => i.properties.type !== "place" && i.properties.type !== "boundary"))
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

  const ResultItemClickHandler = (data, event) => {
    const lng = data.geometry.coordinates[1].toFixed(4);
    const lat = data.geometry.coordinates[0].toFixed(4);
    // dispatch({ type: 'center map on location', value: [ data.geometry.coordinates[1].toFixed(4), data.geometry.coordinates[0].toFixed(4) ] });
    dispatch({ type: 'center map on location', value: [ lng, lat ] });
    dispatch({ type: 'set location', value: [lng, lat], label: [data.properties.name, data.properties.city && data.properties.city, data.properties.country && data.properties.country, data.properties.postcode && data.properties.postcode].filter(Boolean).join(', ') });
    showDropdown(false);
    setValue(data.properties.name)
    event.preventDefault();
  }


  // const prov = OpenStreetMapProvider();
  // const GeoSearchControlElement = SearchControl;

  const classes = {
    root: cn('Header--module__Search', 'SearchBox', expanded && 'expanded'),
    input: 'SearchBox-Input'
  }

  const [globals, locals] = results;
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


            {globals && (
              <>
                <ResultGroup>{`Global places (${globals.length})`}</ResultGroup>
                <ul>
                {globals.map((result, i) => 
                  <ResultItem 
                    key={`globals_${i}_${result.properties.osm_id}`}
                    onClick={event => ResultItemClickHandler(result, event)}
                    properties={result.properties}
                    name={result.properties.name}
                  />
                )}
                </ul>
              </>
            )}

            {locals && (
              <>
                <ResultGroup>{`Local places, nearby locations (${locals.length})`}</ResultGroup>
                <ul>
                  {locals.map((result, i) => 
                    <ResultItem 
                      key={`locals_${i}_${result.properties.osm_id}`}
                      onClick={event => ResultItemClickHandler(result, event)}
                      properties={result.properties}
                      name={result.properties.name}
                    />                    
                  )}
                </ul>
              </>
            )}

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
        <span>
        {name && <strong>{`${name} →`}</strong>}
        &nbsp;
        {label}
        </span>
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