import React from 'react';
import classes from './SearchInput.module.css';
import { FaSistrix } from 'react-icons/fa';
import Button from '../../../UI/Button';

const SearchInput = () => {
  const searchBtnHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form className={classes.form}>
      <input className={classes.input} type="text" placeholder="Search notes" />
      <Button onClick={searchBtnHandler}>
        <FaSistrix />
      </Button>
    </form>
  );
};

export default SearchInput;
