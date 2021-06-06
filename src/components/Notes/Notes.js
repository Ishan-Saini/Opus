import React from 'react';
import classes from './Notes.module.css';
import NotesHeader from './NotesHeader';
import Button from '../UI/Button';

const Notes = () => {
  return (
    <form className={classes.form}>
      <NotesHeader />
      <textarea rows="22" />
      <Button>Add</Button>
    </form>
  );
};

export default Notes;
