import React from 'react';
import classes from './NotesTiles.module.css';
import { FaTrashAlt } from 'react-icons/fa';

const DUMMY_ARR = [
  {
    id: 'ele1',
    title: 'Introduction to Kubernetes',
    tags: ['kubernetes', 'go'],
  },
  {
    id: 'ele2',
    title: 'Introduction to Kubernetes',
    tags: ['kubernetes', 'go'],
  },
  {
    id: 'ele3',
    title: 'Introduction to Kubernetes',
    tags: ['kubernetes', 'go'],
  },
];

const NotesTiles = (props) => {
  const notesTileContent = DUMMY_ARR.map((tile) => {
    return (
      <li className={classes['notes-tile']} key={tile.id}>
        <div className={classes.titleWrapper}>
          <p className={classes['notes-tile__title']}>{tile.title}</p>
        </div>
        <div className={classes.tagsWrapper}>
          {tile.tags.map((tag, index) => (
            <span key={index} className={classes['notes-tile__tags']}>
              {tag}
            </span>
          ))}
        </div>
        <div className={classes.btnWrapper}>
          <FaTrashAlt className={classes['trash-btn']} />
        </div>
      </li>
    );
  });

  return <ul className={classes['notes-tile-wrapper']}>{notesTileContent}</ul>;
};

export default NotesTiles;
