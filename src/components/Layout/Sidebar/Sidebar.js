import React, { useState, useEffect } from 'react';
import classes from './Sidebar.module.css';
import Search from './Search/SearchInput';
import NotesTiles from './NotesTiles';

const Sidebar = () => {
  const [notesList, setNotesList] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesJson = await fetch('http://127.0.0.1:5000/api/v1/notes/');
        const notesObj = await notesJson.json();
        const notesArr = [];
        for (const key in notesObj) {
          notesArr.push({
            id: notesObj[key]._id,
            title: notesObj[key].title,
            tags: notesObj[key].tags,
            content: notesObj[key].content,
            date: notesObj[key].date,
          });
        }
        setNotesList(notesArr);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className={classes['sidebar-wrapper']}>
      <Search />
      <div className={classes['sidebar-notes__container']}>
        <NotesTiles notesArr={notesList} />
      </div>
    </div>
  );
};

export default Sidebar;
