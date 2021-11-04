import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
  return (
    <button
      type={props.type}
      className={`${classes.btn} + ${props.className}`}
      {...props.button}
      onMouseDown={props.onMouseDown}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
