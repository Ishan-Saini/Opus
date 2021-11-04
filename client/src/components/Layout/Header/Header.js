import React from 'react';
import classes from './Header.module.css';
import { FaRegStickyNote, FaRegUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className={classes.header}>
      <IconContext.Provider value={{ color: 'white', size: '1.7rem' }}>
        <div className={classes.heading}>
          <FaRegStickyNote />
          <h2>OPUS</h2>
        </div>
      </IconContext.Provider>
      <div className={classes.dropdown}>
        <IconContext.Provider value={{ color: 'white', size: '1.2rem' }}>
          <button className={classes['dropdown-btn']}>
            <FaRegUserCircle />
          </button>
        </IconContext.Provider>
        <div className={classes['dropdown-menu']}>
          <Link to="/user">User Profile</Link>
          <Link to="/login">Logout</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
