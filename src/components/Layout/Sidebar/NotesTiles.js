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
      <div className={classes['notes-tile']} key={tile.id}>
        <div>
          <p className={classes['notes-tile__title']}>{tile.title}</p>
          {tile.tags.map((tag, index) => (
            <span key={index} className={classes['notes-tile__tags']}>
              {tag}
            </span>
          ))}
        </div>
        <FaTrashAlt className={classes['trash-btn']} />
      </div>
    );
  });

  return <React.Fragment>{notesTileContent}</React.Fragment>;
};

export default NotesTiles;
