import React, { useContext } from 'react';
import { store } from '../../store.js';
import Icon from '../Icon';
import { IconButton } from '../Button';
import { cn } from '../../utils/helpers';
import Preview from '../Preview';

import "./Bookmark.scss";

const Bookmark = props => {
  const { 
    label, 
    title,
    index,
    description, 
    map, 
    layer, 
    zoom, 
    center, 
    dateAdded,
    ...other 
  } = props;

  const { dispatch } = useContext(store);


  const handleRemoveBookmark = (timestamp) => {
    dispatch({ type: 'delete bookmark', value: timestamp });
  }

  const setViewport = () => {
    dispatch({ type: 'on change viewport', value: { center: center, zoom: zoom } });
    dispatch({ type: 'disable center map' });
  }

  const classes = {
    root: cn('Bookmark', 'item', 'theme-dark')
  }

  return (
    <div
      className={classes.root}
      onClick={() => setViewport()}
      role="button"
      {...other}
    >
      <div className="Bookmark-actions theme-dark" data-mode="dark">
        <IconButton
          onClick={() => handleRemoveBookmark(dateAdded)} 
          kind="ghost" 
          renderIcon="TrashCan" 
          size="small" 
        />
      </div>


      <div className="Bookmark-label"> 
        <Icon type={"Flag"} />
        <span>― {center ? `${center[0].toFixed(4)} | ${center[1].toFixed(4)}` : "Label"}</span>
      </div>
      {/* 
        <span className="Bookmark-title">{title ? title : "Title"}</span> 
      */}


      <Preview 
        className="Bookmark-map-preview"
        source={map}
        layer={layer}
        center={center} 
        zoom={zoom}
      />
    </div>
  );
}

export default Bookmark;