import React from 'react';
import classes from './Header.module.css';
import { FaRegStickyNote } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const Header = () => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '1.7rem' }}>
      <div className={classes.header}>
        <FaRegStickyNote />
        <h2>OPUS</h2>
      </div>
    </IconContext.Provider>
  );
};

export default Header;
