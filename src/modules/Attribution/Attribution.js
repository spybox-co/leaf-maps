import React, { useState, useContext } from 'react';
import Icon from '../../components/Icon';
import './Attribution.scss';

import { store } from '../../store.js';
import { cn } from '../../utils/helpers';

const Attribution = () => {
  const { state, dispatch } = useContext(store);
  const [isExpanded, setIsExpanded] = useState(true);

  const { activeMap, maps } = state;

  const handleClick = () => {
    setIsExpanded(isExpanded => !isExpanded);
  }

  const classes = {
    root: cn('lf-Attribution', isExpanded ? 'expanded' : 'collapsed'),
    infoPanel: cn('InfoPanel', 'spbx--button', 'spbx--button--secondary'),
    infoButton: 'InfoButton'
  }

  const changeMap = () => {
    const currentIndex = maps.indexOf(activeMap);
    const nextIndex = currentIndex === maps.length - 1 ? 0 : currentIndex + 1;
    dispatch({ type: 'change map', value: nextIndex });
  };

  return(
    <div className={classes.root}>
      <InfoButton className={classes.infoButton} onClick={handleClick} />
      <button className={classes.infoPanel} onClick={changeMap}>
        <div className="Label">
          <h4>Map style</h4>
          <h3><span>{activeMap.name}</span> by <span>{activeMap.vendor}</span></h3>
        </div>
        <div className="IconContainer"><Icon type="Change" /></div>
      </button>
    </div>
  )
  
}

export default Attribution;



const InfoButton = ({ onClick, className}) => {
  return(
    <button className={className} onClick={onClick}>
      <Icon type="Information" />
    </button>
  )
}