import React from 'react';
import classes from './Notes.module.css';
import NotesHeader from './NotesHeader';
import Button from '../UI/Button';
import NotesEditor from './NotesEditor';

const Notes = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <NotesHeader />
      <NotesEditor />
      <Button className={classes['btn-add']}>Add</Button>
    </form>
  );
};

export default Notes;
