import { useState, useRef } from 'react';
import {
  Editor,
  RichUtils,
  // getDefaultKeyBinding,
  // KeyBindingUtil,
} from 'draft-js';
import classes from './NotesEditor.module.css';
import 'draft-js/dist/Draft.css';
import StyleButtons from './StyleButtons';
import useOutOfBoundsSelectionRecovery from '../../hooks/use-OutOfBoundsSelectionRecovery';

const NotesEditor = (props) => {
  const [isFocus, setIsFocus] = useState(false);

  const editor = useRef(null);
  const focusEditor = () => {
    editor.current.focus();
  };

  const focusHandler = () => {
    setIsFocus(true);
  };

  useOutOfBoundsSelectionRecovery(isFocus);

  const toggleInlineStyle = (e) => {
    e.preventDefault();
    let style = e.currentTarget.getAttribute('name');
    props.stateUpdate(RichUtils.toggleInlineStyle(props.edState, style));
  };

  const toggleBlockStyle = (e) => {
    e.preventDefault();
    let style = e.currentTarget.getAttribute('name');
    props.stateUpdate(RichUtils.toggleBlockType(props.edState, style));
  };

  // const handleKeyCommand = (command) => {
  //   let editorSt = RichUtils.handleKeyCommand(editorState, command);

  //   if (!editorSt && command === 'ordered-list')
  //     editorSt = RichUtils.toggleBlockType(editorState, 'ordered-list-item');

  //   if (!editorSt && command === 'unordered-list')
  //     editorSt = RichUtils.toggleBlockType(editorState, 'unordered-list-item');

  //   if (!editorSt && command === 'blockquote')
  //     editorSt = RichUtils.toggleBlockType(editorState, 'blockquote');

  //   if (editorSt) {
  //     setEditorState(editorSt);
  //     return 'handled';
  //   }
  //   return 'not-handled';
  // };

  // const keyBindingFunction = (e) => {
  //   if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key === '7') {
  //     return 'ordered-list';
  //   }

  //   if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key === '8')
  //     return 'unordered-list';

  //   if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key === '9')
  //     return 'blockquote';

  //   return getDefaultKeyBinding(e);
  // };

  return (
    <div className={classes.editorWrapper}>
      <div className={classes['btn-header-wrapper']}>
        <StyleButtons
          inlineBtnStyle={toggleInlineStyle}
          blockBtnStyle={toggleBlockStyle}
        />
      </div>
      <div
        id="editorContainer"
        className={classes.notesEditor}
        onClick={focusEditor}
        onFocus={focusHandler}
      >
        <Editor
          ref={editor}
          editorState={props.edState}
          onChange={props.stateUpdate}
          // handleKeyCommand={handleKeyCommand}
          // keyBindingFn={keyBindingFunction}
          placeholder="Start here..."
        />
      </div>
    </div>
  );
};

export default NotesEditor;
