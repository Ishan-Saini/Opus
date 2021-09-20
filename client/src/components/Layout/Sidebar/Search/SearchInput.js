import React from 'react';
import classes from './SearchInput.module.css';
import { FaSistrix } from 'react-icons/fa';
import Button from '../../../UI/Button';
import { IconContext } from 'react-icons';

const SearchInput = () => {
  const searchBtnHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes['search-container']}>
      <div className={classes['search-input__container']}>
        <input
          className={classes['search-input']}
          type="text"
          placeholder="Search notes"
        />
      </div>
      <div className={classes['search-btn__container']}>
        <Button onClick={searchBtnHandler}>
          <IconContext.Provider value={{ size: '0.7rem' }}>
            <FaSistrix />
          </IconContext.Provider>
        </Button>
      </div>
    </div>
  );
};

export default SearchInput;
