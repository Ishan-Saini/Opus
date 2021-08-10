import { useState } from 'react';
import NoteContext from './Note-context';

const NoteProvider = (props) => {
  const [currentNote, setCurrentNote] = useState({});

  const addCurrentNoteHandler = (note) => {
    setCurrentNote(note);
  };

  const removeCurrentNoteHandler = () => {
    setCurrentNote({});
  };

  const noteContext = {
    note: currentNote,
    addCurrentNote: addCurrentNoteHandler,
    removeCurrentNote: removeCurrentNoteHandler,
  };

  return (
    <NoteContext.Provider value={noteContext}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
