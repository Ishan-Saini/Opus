import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import classes from './SearchInput.module.css';
import { FaSistrix } from 'react-icons/fa';
import Button from '../../../UI/Button';
import { IconContext } from 'react-icons';

const fuseOptions = {
  keys: ['title', 'tags'],
};

const SearchInput = (props) => {
  const [input, setInput] = useState('');

  const searchBtnHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const searchFuse = () => {
      if (input.length === 0) props.searchToggler(false);
      else {
        props.searchToggler(true);
        const fuse = new Fuse(props.list, fuseOptions);
        const result = fuse.search(input);
        const resultArray = result.map((el) => el.item);
        props.setNotesState(resultArray);
      }
    };

    searchFuse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const searchInputChangeHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={classes['search-container']}>
      <div className={classes['search-input__container']}>
        <input
          className={classes['search-input']}
          type="text"
          placeholder="Search notes by title or tags"
          value={input}
          onChange={searchInputChangeHandler}
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
