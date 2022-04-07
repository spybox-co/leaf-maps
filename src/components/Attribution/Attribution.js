import React, { useContext } from 'react';
import Icon from '../Icon';
import './Attribution.scss';

import { store } from '../../store.js';
// import { cn } from '../../utils/helpers';

const Attribution = () => {
  // const { state, dispatch } = useContext(store);
  const { state } = useContext(store);

  const { activeMap } = state;

  // console.log(activeMap);

  const classes = {
    root: 'lf-Attribution',
    infoPanel: 'InfoPanel'
  }
  return(
    <div className={classes.root}>
      <InfoButton />
      <div className={classes.infoPanel}>
        <h4>Map style</h4>
        <h3><span>{activeMap.name}</span> by <span>{activeMap.vendor}</span></h3>
      </div>
    </div>
  )
  
}

export default Attribution;



const InfoButton = () => {
  return(
    <button>
      <Icon className="spbx--button__icon" type="Information" />
    </button>
  )
}