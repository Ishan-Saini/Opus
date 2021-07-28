import React, { useState } from 'react';
import classes from './Notes.module.css';
import NotesHeader from './NotesHeader';
import Button from '../UI/Button';
import NotesEditor from './NotesEditor';
import { EditorState, convertToRaw } from 'draft-js';

const Notes = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const titleChangeHandler = (titleString) => {
    setTitle(titleString);
  };

  const tagsChangeHandler = (tagsString) => {
    setTags(tagsString);
  };

  const editorStateUpdateHandler = (editorStateInstance) => {
    setEditorState(editorStateInstance);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const raw = convertToRaw(editorState.getCurrentContent());
    if (title !== '') {
      const tagsArr = tags.replace(/ /g, '').split(',');
      const contentObj = {
        title,
        tags: tagsArr,
        content: raw,
      };

      console.log(contentObj);
      console.log('Submitted');
    }
  };

  return (
    <form className={classes['notes-wrapper']} onSubmit={submitHandler}>
      <NotesHeader
        titleValue={title}
        tagsValue={tags}
        onTitleChange={titleChangeHandler}
        onTagsChange={tagsChangeHandler}
      />
      <NotesEditor
        edState={editorState}
        stateUpdate={editorStateUpdateHandler}
      />
      <div className={classes['add-btn__wrapper']}>
        <Button type="submit" className={classes['btn-add']}>
          Add
        </Button>
      </div>
    </form>
  );
};

export default Notes;
