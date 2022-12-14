import React from 'react';

// eslint-disable-next-line
import { Button, IconButton } from '../../../../../components/Button';
import { cn } from '../../../../../utils/helpers';
import ActionButton from '../ActionButton';


import './SearchButton.scss';

const SearchButton = ({ onClick, expanded, ...other }) => {

  const icon = "Search";

  const classes = cn('SearchButton', expanded && 'expanded')

  return(    
    <ActionButton
      className={classes}
      id="search"
      renderIcon={icon}
      iconDescription="Search location"
      onClick={onClick}
      tabindex={expanded ? '-1' : '0'}
      {...other}
    />
  )
}

export default SearchButton;