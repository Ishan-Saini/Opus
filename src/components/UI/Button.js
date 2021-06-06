import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
  return (
    <button className={classes.button} {...props.button}>
      {props.children}
    </button>
  );
};

export default Button;
