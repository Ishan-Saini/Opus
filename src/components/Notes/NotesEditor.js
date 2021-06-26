import { useState, useRef } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import classes from './NotesEditor.module.css';
import 'draft-js/dist/Draft.css';
import Button from '../UI/Button';

const NotesEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const editor = useRef(null);
  const focusEditor = () => {
    editor.current.focus();
  };

  const toggleInlineStyle = (e) => {
    e.preventDefault();
    let style = e.currentTarget.getAttribute('name');
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <div className={classes.editorWrapper}>
      <div className={classes['btn-header-wrapper']}>
        <Button
          className={classes['btn-rich']}
          button={{
            name: 'BOLD',
          }}
          onMouseDown={toggleInlineStyle}
        >
          B
        </Button>
        <Button
          className={classes['btn-rich']}
          button={{
            name: 'ITALIC',
          }}
          onMouseDown={toggleInlineStyle}
        >
          I
        </Button>
      </div>
      <div className={classes.notesEditor} onClick={focusEditor}>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Write something!"
        />
      </div>
    </div>
  );
};

export default NotesEditor;
