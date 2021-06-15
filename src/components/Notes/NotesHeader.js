import React from 'react';
import Input from '../UI/Input';

const NotesHeader = () => {
  return (
    <React.Fragment>
      <Input
        input={{ placeholder: 'TITLE', type: 'text', id: 'input-title' }}
      />
      <Input input={{ placeholder: 'TAGS', type: 'text', id: 'input-tags' }} />
    </React.Fragment>
  );
};

export default NotesHeader;
