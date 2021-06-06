import React from 'react';

const Input = (props) => {
  return (
    <React.Fragment>
      <input {...props.input} />
    </React.Fragment>
  );
};

export default Input;
