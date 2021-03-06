import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Toast from '../UI/Toast/Toast';
import classes from './Notes.module.css';
import NotesHeader from './NotesHeader';
import Button from '../UI/Button';
import NotesEditor from './NotesEditor';
import { EditorState, convertToRaw } from 'draft-js';

const Editor = (props) => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const { nbId } = useParams();

  const titleChangeHandler = (titleString) => {
    setTitle(titleString);
  };

  const tagsChangeHandler = (tagsString) => {
    setTags(tagsString);
  };

  const editorStateUpdateHandler = (editorStateInstance) => {
    setEditorState(editorStateInstance);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const raw = convertToRaw(editorState.getCurrentContent());
    const tagsArr = tags.replace(/ /g, '').split(',');

    if (title !== '') {
      // UX
      let noteId;
      const contentObj = {
        title,
        content: raw,
        notebook: nbId,
        ...(tags !== '' && { tags: tagsArr }),
      };

      try {
        const res = await axios({
          method: 'POST',
          url: `/api/v1/notebooks/${nbId}/notes/`,
          withCredentials: true,
          data: contentObj,
        });
        noteId = res.data.data.notes._id;
      } catch (err) {
        console.log(err);
      }
      history.push(`/notebooks/${nbId}/notes/${noteId}`);
    } else if (title === '') toast.error('Title is required!');
  };

  const history = useHistory();

  const cancelBtnHandler = () => {
    history.replace(`/notebooks/${nbId}`);
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
      <div className={classes['btn__wrapper']}>
        <Button type="submit" className={classes['btn-add']}>
          Add
        </Button>
        <Button
          type="button"
          className={classes['btn-cancel']}
          onClick={cancelBtnHandler}
        >
          Cancel
        </Button>
      </div>
      <Toast />
    </form>
  );
};

export default Editor;
