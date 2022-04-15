import React, { useState, useContext } from 'react';
import Icon from '../../components/Icon';
import './Attribution.scss';

import { store } from '../../store.js';
// import { cn } from '../../utils/helpers';

const Attribution = () => {
  // const { state, dispatch } = useContext(store);
  const { state } = useContext(store);
  const [isExpanded, setIsExpanded] = useState(true);

  const { activeMap } = state;

  // console.log(activeMap);

  const handleClick = () => {
    setIsExpanded(isExpanded => !isExpanded);
    console.log("Atribution", isExpanded)
  }

  const classes = {
    root: ['lf-Attribution', isExpanded ? 'expanded' : 'collapsed'].join(' ').trim(),
    infoPanel: 'InfoPanel'
  }
  return(
    <div className={classes.root}>
      <InfoButton onClick={handleClick} />
      <div className={classes.infoPanel}>
        <div>
          <h4>Map style</h4>
          <h3><span>{activeMap.name}</span> by <span>{activeMap.vendor}</span></h3>
        </div>
      </div>
    </div>
  )
  
}

export default Attribution;



const InfoButton = ({ onClick }) => {
  return(
    <button onClick={onClick}>
      <Icon className="spbx--button__icon" type="Information" />
    </button>
  )
}