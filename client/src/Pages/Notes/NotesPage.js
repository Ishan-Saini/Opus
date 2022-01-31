import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import classes from './NotesPage.module.css';
import productiveMan from '../../images/productive-man.svg';
import { BsPlusSquareFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';

const NotesPage = (props) => {
  const history = useHistory();
  const { nbId } = useParams();

  const newNoteBtnHandler = () => {
    if (!nbId) return; // UX
    history.push(`/notebooks/${nbId}/editor`);
  };

  let displayContent = (
    <div className={classes['no-display__container']}>
      <div className={classes['no-display-img__container']}>
        <img src={productiveMan} alt="productive man" />
      </div>
      <div className={classes['no-display-msg__container']}>
        <p className={classes['no-display__msg']}>Start writing</p>
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

export default NotesPage;
