import React, { useState, useContext } from 'react';
import Icon from '../../../components/Icon';
import './Attribution.scss';

import { store } from '../../../store.js';
import { IconButton } from '../../../components/Button';
// import { cn } from '../../utils/helpers';

const Attribution = () => {
  // const { state, dispatch } = useContext(store);
  const { state, dispatch } = useContext(store);
  const [isExpanded, setIsExpanded] = useState(true);

  const { activeMap, maps } = state;


  const handleClick = () => {
    setIsExpanded(isExpanded => !isExpanded);
  }

  const classes = {
    root: ['lf-Attribution', isExpanded ? 'expanded' : 'collapsed'].join(' ').trim(),
    infoPanel: ['InfoPanel', 'spbx--button', 'spbx--button--secondary'].join(' ').trim(),
    infoButton: 'InfoButton'
  }

  const changeMap = () => {
    const currentIndex = maps.indexOf(activeMap);
    const nextIndex =
      currentIndex === maps.length - 1 ? 0 : currentIndex + 1;
    console.log(nextIndex)
    dispatch({ type: 'change map', value: nextIndex });
  };

  return(
    <div className={classes.root}>
      <InfoButton className={classes.infoButton} onClick={handleClick} />
      {isExpanded && (
        <>
          <div className={classes.infoPanel} onClick={changeMap}>
            <div className="Label">
              <span>{activeMap.name}</span>
              {/* <h4>Map style</h4>
              <h3>{activeMap.name}<span> by </span>{activeMap.vendor}</h3> */}
            </div>
            {/* <div className="IconContainer"><Icon type="Change" /></div> */}
            <IconButton onClick={changeMap} renderIcon={"Change"} size="medium" kind="ghost"/>
          </div>
          
        </>
      )}
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