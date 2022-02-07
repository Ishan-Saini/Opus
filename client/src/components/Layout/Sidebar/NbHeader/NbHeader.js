import React, { useState, useContext } from 'react';
import axios from 'axios';
import classes from './NbHeader.module.css';
import { BsPlusSquareFill } from 'react-icons/bs';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import UserContext from '../../../../store/User-Context';

const NbHeader = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const userCtx = useContext(UserContext);

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
      user: userCtx.user._id,
    };

    await axios({
      method: 'POST',
      url: `/api/v1/notebooks/`,
      withCredentials: true,
      data: notebookObj,
    });

    setIsEntering(false);
    setTitleInput('');
    props.refresh();
  };

  return (
    <div className={classes['notebooks-header__container']}>
      {!isEntering && (
        <React.Fragment>
          <div className={classes['notebooks-header']}>NOTEBOOKS</div>
          <div
            className={classes['notebooks-header__btn']}
            onClick={openInputHandler}
          >
            <IconContext.Provider value={{ size: '1.0rem' }}>
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
