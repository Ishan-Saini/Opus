import React, { useState, useEffect } from 'react';
import classes from './Sidebar.module.css';
import Search from './Search/SearchInput';
import NotesTiles from './Tile/NotesTiles';
import Loading from '../../UI/Loading';
import NbHeader from './NbHeader/NbHeader';
import NotebookTile from './Tile/NotebookTile';

const Sidebar = (props) => {
  const [notebooksList, setNotebooksList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchNotebooks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://127.0.0.1:5000/api/v1/notebooks/');
        const jsonResponse = await response.json();
        const nbObjData = jsonResponse.data;
        const notebooksArr = [];
        for (const key in nbObjData) {
          notebooksArr.push({
            id: nbObjData[key]._id,
            title: nbObjData[key].title,
          });
        }
        setIsLoading(false);
        setNotebooksList(notebooksArr);
      } catch (err) {
        console.warn(err);
      }
    };
    fetchNotebooks();
  }, [props.refresh, refresh]);

  const refreshToggler = (bool) => {
    setRefresh((bool) => !bool);
  };

  return (
    <div className={classes['sidebar-wrapper']}>
      <div className={classes['sidebar-notebooks__container']}>
        <NbHeader />
        {isLoading && (
          <div className={classes['loader_wrapper']}>
            <Loading loading={isLoading} size={25} />
          </div>
        )}
        <div className={classes['notebooks-tile__container']}>
          <NotebookTile notebooksArr={notebooksList} refresh={refreshToggler} />
        </div>
      </div>
      <div className={classes['sidebar-notes__container']}>
        <Search />
        <div className={classes['notes-tile__container']}>
          <NotesTiles />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
