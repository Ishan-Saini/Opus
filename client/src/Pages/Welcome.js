import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from './Welcome.module.css';
import productiveMan from '../images/productive-man.svg';
import { BsPlusSquareFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';

const Welcome = (props) => {
  const history = useHistory();

  const newNoteBtnHandler = () => {
    history.push('/editor');
  };

  let displayContent = (
    <div className={classes['no-display__container']}>
      <div className={classes['no-display-img__container']}>
        <img src={productiveMan} alt="productive man" />
      </div>
      <div className={classes['no-display-msg__container']}>
        <p className={classes['no-display__msg']}>Start a new note</p>
        <IconContext.Provider value={{ size: '1.7rem' }}>
          <BsPlusSquareFill
            className={classes['no-display__btn']}
            onClick={newNoteBtnHandler}
          />
        </IconContext.Provider>
      </div>
    </div>
  );

  return displayContent;
};

export default Welcome;
