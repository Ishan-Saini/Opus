import { useState, useRef } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  convertToRaw,
} from 'draft-js';
import classes from './NotesEditor.module.css';
import 'draft-js/dist/Draft.css';
import StyleButtons from './StyleButtons';
import useOutOfBoundsSelectionRecovery from '../../hooks/use-OutOfBoundsSelectionRecovery';

const NotesEditor = () => {
  useOutOfBoundsSelectionRecovery(true);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const raw = convertToRaw(editorState.getCurrentContent());
  console.log(raw);

  const editor = useRef(null);
  const focusEditor = () => {
    editor.current.focus();
  };

  const toggleInlineStyle = (e) => {
    e.preventDefault();
    let style = e.currentTarget.getAttribute('name');
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockStyle = (e) => {
    e.preventDefault();
    let style = e.currentTarget.getAttribute('name');
    setEditorState(RichUtils.toggleBlockType(editorState, style));
  };

  const handleKeyCommand = (command) => {
    let editorSt = RichUtils.handleKeyCommand(editorState, command);

    if (!editorSt && command === 'ordered-list')
      editorSt = RichUtils.toggleBlockType(editorState, 'ordered-list-item');

    if (!editorSt && command === 'unordered-list')
      editorSt = RichUtils.toggleBlockType(editorState, 'unordered-list-item');

    if (!editorSt && command === 'blockquote')
      editorSt = RichUtils.toggleBlockType(editorState, 'blockquote');

    if (editorSt) {
      setEditorState(editorSt);
      return 'handled';
    }
    return 'not-handled';
  };

  const keyBindingFunction = (e) => {
    if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key === '7') {
      console.log('Q here');
      return 'ordered-list';
    }

    if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key === '8')
      return 'unordered-list';

    if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key === '9')
      return 'blockquote';

    return getDefaultKeyBinding(e);
  };

  return (
    <div className={classes.editorWrapper}>
      <div className={classes['btn-header-wrapper']}>
        <StyleButtons
          inlineBtnStyle={toggleInlineStyle}
          blockBtnStyle={toggleBlockStyle}
        />
      </div>
      <div className={classes.notesEditor} onClick={focusEditor}>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFunction}
        />
      </div>
    </div>
  );
};

export default NotesEditor;
