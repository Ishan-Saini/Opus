import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import classes from './Sidebar.module.css';
import Search from './Search/SearchInput';
import NotesTiles from './Tile/NotesTiles';
import Loading from '../../UI/Loading';
import NbHeader from './NbHeader/NbHeader';
import NotebookTile from './Tile/NotebookTile';

const Sidebar = (props) => {
  const [notebooksList, setNotebooksList] = useState([]);
  const [notesArr, setNotesArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotesLoading, setIsNotesLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const matchNotebookRoutes = useRouteMatch({
    path: '/notebooks/:nbId',
  });
  const matchNoteRoutes = useRouteMatch({
    path: '/notebooks/:nbId/notes/:noteId',
  });

  let nbId = matchNotebookRoutes ? matchNotebookRoutes.params.nbId : null;
  let noteId = matchNoteRoutes ? matchNoteRoutes.params.noteId : null;

  useEffect(() => {
    const fetchNotebooks = async () => {
      try {
        setIsLoading(true);

        const res = await axios({
          method: 'GET',
          url: 'http://127.0.0.1:5000/api/v1/notebooks/',
          withCredentials: true,
        });
        const nbObjData = res.data.data;
        const notebooksArr = [];
        for (const key in nbObjData) {
          notebooksArr.push({
            id: nbObjData[key]._id,
            title: nbObjData[key].title,
          });
        }
        setIsLoading(false);
        setNotebooksList(notebooksArr);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchNotes = async () => {
      if (!nbId) {
        setIsNotesLoading(false);
        setNotesArr([]);
        return;
      }
      try {
        setIsNotesLoading(true);
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
        setIsNotesLoading(false);
        setNotesArr(notesList);
      } catch (err) {
        console.warn(err);
      }
    };

    fetchNotebooks();
    fetchNotes();
  }, [props.refresh, refresh, nbId, noteId]);

  const refreshToggler = () => {
    setRefresh((bool) => !bool);
  };

  return (
    <div className={classes['sidebar-wrapper']}>
      <div className={classes['sidebar-notebooks__container']}>
        <NbHeader refresh={refreshToggler} />
        {isLoading && <Loading loading={isLoading} size={25} />}
        <div className={classes['notebooks-tile__container']}>
          <NotebookTile notebooksArr={notebooksList} refresh={refreshToggler} />
        </div>
      </div>
      <div className={classes['sidebar-notes__container']}>
        <Search />
        <div className={classes['notes-tile__container']}>
          <NotesTiles
            notesArr={notesArr}
            isLoading={isNotesLoading}
            refresh={refreshToggler}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
