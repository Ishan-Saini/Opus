import React, { useState, useEffect } from 'react';
import classes from './Sidebar.module.css';
import Search from './Search/SearchInput';
import NotesTiles from './NotesTiles';
import Loading from '../../UI/Loading';

const Sidebar = (props) => {
  const [notesList, setNotesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        const notesJson = await fetch('http://127.0.0.1:5000/api/v1/notes/');
        const notesObj = await notesJson.json();
        const notesObjData = notesObj.data;
        const notesArr = [];
        for (const key in notesObjData) {
          notesArr.push({
            id: notesObjData[key]._id,
            title: notesObjData[key].title,
            tags: notesObjData[key].tags,
            content: notesObjData[key].content,
            date: notesObjData[key].date,
          });
        }
        setIsLoading(false);
        setNotesList(notesArr);
      } catch (err) {
        console.warn(err);
      }
    };
    fetchNotes();
  }, [props.refresh, refresh]);

  const refreshToggler = (bool) => {
    setRefresh((bool) => !bool);
  };

  return (
    <div className={classes['sidebar-wrapper']}>
      <Search />
      <div className={classes['sidebar-notes__container']}>
        {isLoading && (
          <div className={classes['loader_wrapper']}>
            <Loading loading={isLoading} size={25} />
          </div>
        )}
        <NotesTiles
          isLoading={isLoading}
          notesArr={notesList}
          refresh={refreshToggler}
        />
      </div>
    </div>
  );
};

export default Sidebar;