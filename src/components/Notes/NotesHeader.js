import React from 'react';
import Input from '../UI/Input';

const NotesHeader = () => {
  return (
    <React.Fragment>
      <Input
        input={{ placeholder: 'Title', type: 'text', id: 'input-title' }}
      />
      <Input input={{ placeholder: 'Tags', type: 'text', id: 'input-tags' }} />
    </React.Fragment>
  );
};

export default NotesHeader;
