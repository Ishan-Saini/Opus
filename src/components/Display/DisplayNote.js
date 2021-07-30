import React from 'react';
import classes from './DisplayNote.module.css';

const DUMMY_OBJ = {
  title: 'How to learn Javascript in 2021',
  tags: ['JS', 'language', 'new'],
  content: {
    blocks: [
      {
        key: '9ac4s',
        text: 'How do we get started with a new langauge ?',
        type: 'header-three',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '6kave',
        text: 'Deal with it',
        type: 'unordered-list-item',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '3tnad',
        text: "Don't deal with it",
        type: 'unordered-list-item',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '958c1',
        text: 'This is a random text for testing purposes.',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  },
};

const DisplayNote = () => {
  return (
    <div className={classes.displayWrapper}>
      <div className={classes.headerWrapper}>
        <div className={classes.titleWrapper}>
          <h1>Title goes here</h1>
        </div>
        <div className={classes.tagsWrapper}>
          <span>Golang</span>
          <span>Kubernetes</span>
        </div>
        <div className={classes.dateWrapper}>
          <p>27th July 2021</p>
        </div>
      </div>
      <div className={classes.contentWrapper}>Start of the content</div>
    </div>
  );
};

export default DisplayNote;
