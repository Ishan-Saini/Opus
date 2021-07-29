import React from 'react';
import classes from './DisplayNote.module.css';

const DisplayNote = () => {
  return (
    <div className={classes.displayWrapper}>
      <div className={classes.headerWrapper}>
        <div className={classes.titleWrapper}>
          <h1>Title for the note</h1>
        </div>
        <div className={classes.tagsWrapper}>
          <span>Golang</span>
          <span>Kubernetes</span>
        </div>
        <div className={classes.dateWrapper}>
          <p>27th July 2021</p>
        </div>
      </div>
      <div className={classes.contentWrapper}>
        <p>Content of the Note starts here</p>
      </div>
    </div>
  );
};

export default DisplayNote;
