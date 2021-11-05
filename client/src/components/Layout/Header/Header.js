import React from 'react';
import classes from './Header.module.css';
import { FaRegStickyNote } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import Dropdown from './Dropdown';

const Header = () => {
  return (
    <div className={classes.header}>
      <IconContext.Provider value={{ color: 'white', size: '1.7rem' }}>
        <div className={classes.heading}>
          <FaRegStickyNote />
          <h2>OPUS</h2>
        </div>
      </IconContext.Provider>
      <Dropdown />
    </div>
  );
};

export default Header;
