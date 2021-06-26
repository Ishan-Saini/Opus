import React from 'react';
import Input from '../UI/Input';
import classes from './SearchInput.module.css';
import { FaSistrix } from 'react-icons/fa';
import Button from '../UI/Button';

const SearchInput = () => {
  return (
    <form className={classes.form}>
      <Input input={{ type: 'text', placeholder: 'Search notes' }} />
      <Button>
        <FaSistrix />
      </Button>
    </form>
  );
};

export default SearchInput;
