import React, { useContext } from 'react';


import { cn } from '../../../../utils/helpers';



import { IconButton } from "../../../Button";
import ActionButton from '../ActionButton';

import { store  } from '../../../../store.js';

import './SearchButton.scss';

const SearchButton = () => {
  const { state, dispatch } = useContext(store);
  // const { startLocate, autoCenterMap, position } = state;

  const icon = "Search";

  return(
    <div>
      <ActionButton
        className="SearchButton"
        id="search"
        renderIcon={icon}
        iconDescription="Search location"
        //onClick={handleLocateClick}
      />
    </div>
  )
}

export default SearchButton;