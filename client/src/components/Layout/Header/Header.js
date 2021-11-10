import React, { useContext } from 'react';
import classes from './Header.module.css';
import { useHistory } from 'react-router-dom';
import { FaRegStickyNote } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import Dropdown from './Dropdown';
import UserContext from '../../../store/User-Context';

const Header = () => {
  const userCtx = useContext(UserContext);
  const history = useHistory();

  const logoClickHandler = () => {
    history.push('/');
  };

  return (
    <div className={classes.header}>
      <IconContext.Provider value={{ color: 'white', size: '1.7rem' }}>
        <div className={classes.heading} onClick={logoClickHandler}>
          <FaRegStickyNote />
          <h2>OPUS</h2>
        </div>
      </IconContext.Provider>
      {userCtx.isLoggedIn && <Dropdown />}
    </div>
  );
};

export default Header;
