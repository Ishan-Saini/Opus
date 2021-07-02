import React from 'react';
import classes from './Sidebar.module.css';
import Search from './../../Search/SearchInput';

const Sidebar = () => {
  return (
    <div className={classes['sidebar-wrapper']}>
      <Search />
      <div className={classes['sidebar-notes__container']}>nfiowf</div>;
    </div>
  );
};

export default Sidebar;
