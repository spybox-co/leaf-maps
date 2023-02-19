import React, { useContext } from 'react';
import { store } from '../../../store.js';

import { Button } from "../../Button";
import { Bookmark } from "../../Bookmark";
// eslint-disable-next-line
import Typo from "../../Typography";
// eslint-disable-next-line
import Tile from "../../Tile";

// import Icon from "../../../components/Icon";

//import ExpandablePanel from "./components/ExpandablePanel/ExpandablePanel";

export default () => {
  const { state } = useContext(store);
  const { dispatch } = useContext(store);

  // eslint-disable-next-line
  const { bookmarks, position, viewport, activeMap } = state;

  console.log("zakładki", bookmarks);
  console.log("zakładka-model", viewport, activeMap.url);


  const handleAddBookmark = (data, map) => {
    console.log("nowa zakladka", data.center, data.zoom, map.url);
    const date = new Date();
    const dateAdded = date.getTime() // Timestamp - milliseconds from 1970/01/01 till now
    // "Mon, 03 Aug 2020 03:39:08 GMT"

    const bookmark = {
      center: data.center,
      zoom: data.zoom,
      map: map.url,
      date_added: dateAdded
    }
    dispatch({ type: 'add bookmark', value: bookmark });
  }

  const handleDeleteAllBookmarks = () => {
    dispatch({ type: 'delete all bookmarks' });
  }

  const AddBookmarkAction = 
    <Button 
      renderIcon={"Add"}
      kind="primary"
      onClick={() => handleAddBookmark(viewport, activeMap)}
    >
      Add Bookmark
    </Button>;

  const DeleteAllBookmarksAction = 
    <Button 
      renderIcon={"TrashCan"}
      kind="secondary"
      onClick={() => handleDeleteAllBookmarks()}
    >
      Delete all
    </Button>;
 
  return(
    <div className="Bookmarks theme-light">
      {bookmarks.length === 0 ? (
        <>
          <Tile>
            <h4>No bookmarks yet</h4>
            <p>Add bookmark to save current map view</p>
    
            {AddBookmarkAction}


              
          </Tile>
        </>
      ) : (
        <>
          {bookmarks && bookmarks.map((bookmark, i) => (
            <Bookmark 
              key={i}
              index={i}
              map={bookmark.map}
              center={bookmark.center}
              zoom={bookmark.zoom}
              label={bookmark.center}
              dateAdded={bookmark.date_added}
            />
          ))}
          <Tile>
            <h6>Actions</h6>
            {AddBookmarkAction}
            {DeleteAllBookmarksAction}
          </Tile>
        </>
      )}




    </div>
  )
};




