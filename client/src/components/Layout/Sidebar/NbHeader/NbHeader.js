import React, { useState } from 'react';
import classes from './NbHeader.module.css';
import { BsPlusSquareFill } from 'react-icons/bs';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const NbHeader = () => {
  const [isEntering, setIsEntering] = useState(true);
  const [titleInput, setTitleInput] = useState('');

  const closeInputHandler = () => {
    setIsEntering(false);
  };

  const openInputHandler = () => {
    setIsEntering(true);
  };

  const inputChangeHandler = (e) => {
    setTitleInput(e.target.value);
  };

  const addNotebookHandler = async () => {
    if (titleInput === '') return; // UX

    const notebookObj = {
      title: titleInput,
    };
    const notebook = JSON.stringify(notebookObj);

    await fetch('http://127.0.0.1:5000/api/v1/notebooks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: notebook,
    });
  };

  return (
    <div className={classes['notebooks-header__container']}>
      {!isEntering && (
        <React.Fragment>
          <div>NOTEBOOKS</div>
          <div
            className={classes['notebooks-header__btn']}
            onClick={openInputHandler}
          >
            <IconContext.Provider value={{ size: '1.2rem' }}>
              <BsPlusSquareFill />
            </IconContext.Provider>
          </div>
        </React.Fragment>
      )}
      {isEntering && (
        <React.Fragment>
          <div>
            <input
              type="text"
              value={titleInput}
              className={classes['input-nbtitle']}
              placeholder="Enter title"
              onChange={inputChangeHandler}
            />
          </div>
          <IconContext.Provider value={{ size: '0.9rem' }}>
            <div
              className={classes['nbtitle-btn']}
              onClick={addNotebookHandler}
            >
              <FaCheck />
            </div>
            <div onClick={closeInputHandler}>
              <FaTimes className={classes['nbtitle-btn']} />
            </div>
          </IconContext.Provider>
        </React.Fragment>
      )}
    </div>
  );
};

export default NbHeader;
