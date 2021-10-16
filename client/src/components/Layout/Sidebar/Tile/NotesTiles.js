import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useRouteMatch } from 'react-router-dom';
import classes from './NotesTiles.module.css';
import { FaTrashAlt } from 'react-icons/fa';
import { IoOpenOutline } from 'react-icons/io5';
import Loading from '../../../UI/Loading';

const NotesTiles = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notesArr, setNotesArr] = useState([]);
  const history = useHistory();
  let nbId;
  const match = useRouteMatch({
    path: '/notebooks/:nbId',
  });

  nbId = match ? match.params.nbId : null;

  useEffect(() => {
    const fetchNotes = async () => {
      if (!nbId) return;
      try {
        setIsLoading(true);
        const res = await axios({
          method: 'GET',
          url: `http://127.0.0.1:5000/api/v1/notebooks/${nbId}/notes/`,
          withCredentials: true,
        });
        const notesData = res.data.data;
        const notesList = [];
        for (const key in notesData) {
          notesList.push({
            id: notesData[key]._id,
            title: notesData[key].title,
            tags: notesData[key].tags,
          });
        }
        setIsLoading(false);
        setNotesArr(notesList);
      } catch (err) {
        console.warn(err);
      }
    };
    fetchNotes();
  }, [nbId]);

  const noteOpenHandler = (e) => {
    const id = e.currentTarget.parentNode.dataset.noteid;
    history.push(`/notesbook/${nbId}/notes/${id}`);
  };

  const removeNoteHandler = async (e) => {
    const id = e.currentTarget.parentNode.dataset.noteid;

    await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:5000/api/v1/notebooks/${nbId}/notes/${id}`,
      withCredentials: true,
    });

    history.push(`/notesbook/${nbId}/notes/`);
  };

  let notesTileContent = null;

  if (isLoading) {
    notesTileContent = (
      <div className={classes['loader_wrapper']}>
        <Loading loading={isLoading} size={25} />
      </div>
    );
  }

  if (!isLoading) {
    notesTileContent = (
      <p className={classes['Empty-Sidebar-Msg']}>Nothing in here!</p>
    );
  }

  if (notesArr.length !== 0) {
    notesTileContent = (
      <ul className={classes['notes-tile-wrapper']}>
        {notesArr.map((tile) => {
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
