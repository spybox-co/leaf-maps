import React from 'react';




import ActionButton from '../ActionButton';


import './SearchButton.scss';

const SearchButton = ({ onClick, ...other }) => {

  const icon = "Search";

  return(    
    <ActionButton
      className="SearchButton"
      id="search"
      renderIcon={icon}
      iconDescription="Search location"
      onClick={onClick}
      {...other}
    />
  )
}

export default SearchButton;