import React, { useContext } from 'react';
import classes from './NotesTiles.module.css';
import { FaTrashAlt } from 'react-icons/fa';
import noteContext from '../../../store/Note-context';

const NotesTiles = (props) => {
  const noteCtx = useContext(noteContext);

  const noteOpenHandler = (e) => {
    const id = e.currentTarget.dataset.noteId;
    const currentNoteArr = props.notesArr.filter((note) => note.id === id);
    noteCtx.addCurrentNote(currentNoteArr[0]);
  };

  const removeNoteHandler = (e) => {
    const id = e.currentTarget.parentNode.dataset.noteId;
    fetch(`http://127.0.0.1:5000/api/v1/notes/${id}`, {
      method: 'DELETE',
    });
    if (noteCtx.note.id === id) noteCtx.removeCurrentNote();
  };

  let notesTileContent = (
    <p className={classes['Empty-Sidebar-Msg']}>No notes Available</p>
  );

  if (props.notesArr.length !== 0) {
    notesTileContent = (
      <ul className={classes['notes-tile-wrapper']}>
        {props.notesArr.map((tile) => {
          return (
            <li
              className={classes['notes-tile']}
              key={tile.id}
              onClick={noteOpenHandler}
              data-noteId={tile.id}
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
              <div className={classes.btnWrapper} onClick={removeNoteHandler}>
                <FaTrashAlt className={classes['trash-btn']} />
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
