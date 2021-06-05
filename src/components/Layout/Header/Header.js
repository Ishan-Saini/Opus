import React from 'react';
import classes from './Header.module.css';

const Header = () => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h2>OPUS</h2>
      </header>
    </React.Fragment>
  );
};

export default Header;
