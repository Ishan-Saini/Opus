import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import classes from './Sidebar.module.css';
import Search from './Search/SearchInput';
import NotesTiles from './Tile/NotesTiles';
import Loading from '../../UI/Loading';
import NbHeader from './NbHeader/NbHeader';
import NotebookTile from './Tile/NotebookTile';
import { toast } from 'react-toastify';

const Sidebar = (props) => {
  const [notebooksList, setNotebooksList] = useState([]);
  const [notesArr, setNotesArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotesLoading, setIsNotesLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

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
      if (isSearch) return;
      try {
        setIsLoading(true);

        const res = await axios({
          method: 'GET',
          url: '/api/v1/notebooks/',
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
        toast.error(err.response.data.message);
      }
    };

    const fetchNotes = async () => {
      if (!nbId) {
        setIsNotesLoading(false);
        setNotesArr([]);
        return;
      }
      if (isSearch) return;
      try {
        setIsNotesLoading(true);
        const res = await axios({
          method: 'GET',
          url: `/api/v1/notebooks/${nbId}/notes/`,
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
        toast.error(err.response.data.message);
      }
    };

    fetchNotebooks();
    fetchNotes();
  }, [props.refresh, refresh, nbId, noteId, isSearch]);

  const refreshToggler = () => {
    setRefresh((bool) => !bool);
  };

  const searchToggler = (bool) => {
    if (bool !== isSearch) setIsSearch(bool);
  };

  const notesArrayStateHandler = (arr) => {
    setNotesArr(arr);
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
        <Search
          list={notesArr}
          searchToggler={searchToggler}
          setNotesState={notesArrayStateHandler}
        />
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
