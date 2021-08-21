import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from './NotesTiles.module.css';
import { FaTrashAlt } from 'react-icons/fa';
import { IoOpenOutline } from 'react-icons/io5';

const NotesTiles = (props) => {
  const history = useHistory();

  const noteOpenHandler = (e) => {
    const id = e.currentTarget.parentNode.dataset.noteid;
    history.push(`/notes/${id}`);
  };

  const removeNoteHandler = async (e) => {
    const id = e.currentTarget.parentNode.dataset.noteid;
    await fetch(`http://127.0.0.1:5000/api/v1/notes/${id}`, {
      method: 'DELETE',
    });
    props.refresh(true);
    history.push('/notes');
  };

  let notesTileContent = null;

  if (!props.isLoading) {
    notesTileContent = (
      <p className={classes['Empty-Sidebar-Msg']}>No notes Available</p>
    );
  }

  if (props.notesArr.length !== 0) {
    notesTileContent = (
      <ul className={classes['notes-tile-wrapper']}>
        {props.notesArr.map((tile) => {
          return (
            <li
              className={classes['notes-tile']}
              key={tile.id}
              data-noteid={tile.id}
            >
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
              <div className={classes.openBtnWrapper} onClick={noteOpenHandler}>
                <IoOpenOutline className={classes['tile-btn']} />
              </div>
              <div
                className={classes.trashBtnWrapper}
                onClick={removeNoteHandler}
              >
                <FaTrashAlt className={classes['tile-btn']} />
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  return notesTileContent;
};

export default NotesTiles;
