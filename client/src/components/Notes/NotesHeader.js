import React from 'react';
import classes from './NotesHeader.module.css';

const NotesHeader = (props) => {
  const titleHandler = (e) => {
    props.onTitleChange(e.target.value);
  };

  const tagsHandler = (e) => {
    props.onTagsChange(e.target.value);
  };

  return (
    <React.Fragment>
      <input
        className={classes.input}
        placeholder="TITLE"
        type="text"
        value={props.titleValue}
        onChange={titleHandler}
      />
      <input
        className={classes.input}
        placeholder="TAGS (max. 3)"
        type="text"
        value={props.tagsValue}
        onChange={tagsHandler}
      />
    </React.Fragment>
  );
};

export default NotesHeader;
