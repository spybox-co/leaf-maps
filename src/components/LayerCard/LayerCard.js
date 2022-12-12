import React from 'react';
import Icon from '../Icon';
import { cn } from '../../utils/helpers';
import Preview from '../Preview';

import "./LayerCard.scss";

const LayerCard = props => {
  const { 
    kind,
    label, 
    title,
    index, 
    option, 
    active, 
    description, 
    map, 
    layer, 
    zoom, 
    center, 
    composition, 
    ...other 
  } = props;

  const classes = {
    root: cn('LayerCard', active && 'active', 'item')
  }





  return (
    <a 
      className={classes.root}
      onClick={props.onClick}
      {...other}
    >
      <SelectCardIcon kind={kind} active={active} />
      <span className="LayerCard-label">{label ? label : "Label"}</span>
      <span className="LayerCard-title">{title ? title : "Title"}</span>

      {active ? <div className="LayerCard-active-label" /> : null}

      <Preview 
        className="LayerCard-map-preview"
        source={map} 
        layer={layer}
        center={center} 
        zoom={zoom}
      />
    </a>
  );
}

export default LayerCard;

const SelectCardIcon = ({ kind, active }) => {

  // const [selectableType, setSelectableType] = useState(null)

  // const [iconState, setIconState] = useState(null)

  // const tileKind = 
  //   (kind === 'selectable' && 'spbx--button--primary') ||
  //   (kind === 'radio' && 'spbx--button--secondary');


  if (kind === 'selectable') {
    return(
      <>
        {active ? <Icon className="LayerCard-icon" type="CheckboxCheckedFilled" /> : <Icon className="LayerCard-icon" type="Checkbox" />}
      </>
    )
  }
  if (kind === 'radio') {
    return(
      <>
        {active ? <Icon className="LayerCard-icon" type="CheckmarkFilled" /> : <Icon className="LayerCard-icon" type="RadioButton" />}
      </>
    )
  }
  return null;
}