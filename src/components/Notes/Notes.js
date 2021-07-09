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
    <div className={classes['notes-wrapper']}>
      <NotesHeader />
      <NotesEditor />
      <div className={classes['add-btn__wrapper']}>
        <Button className={classes['btn-add']} onClick={submitHandler}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default Notes;
