import React from 'react';

const noteContext = React.createContext({
  note: {},
  addCurrentNote: (note) => {},
  removeCurrentNote: (id) => {},
});

export default noteContext;
