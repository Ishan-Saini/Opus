import React from 'react';
import classes from './Sidebar.module.css';
import Search from './Search/SearchInput';
import NotesTiles from './NotesTiles';

const Sidebar = () => {
  return (
    <div className={classes['sidebar-wrapper']}>
      <Search />
      <div className={classes['sidebar-notes__container']}>
        <NotesTiles />
      </div>
      ;
    </div>
  );
};

export default Sidebar;
