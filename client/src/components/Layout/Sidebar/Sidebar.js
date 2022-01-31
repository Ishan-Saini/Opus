import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

        const res = await axios({
          method: 'GET',
          url: 'http://127.0.0.1:5000/api/v1/notebooks/',
          withCredentials: true,
        });
        const nbObjData = res.data.data;
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
        console.log(err);
      }
    };
    fetchNotebooks();
  }, [props.refresh, refresh]);

  const refreshToggler = () => {
    setRefresh((bool) => !bool);
  };

  return (
    <div className={classes['sidebar-wrapper']}>
      <div className={classes['sidebar-notebooks__container']}>
        <NbHeader refresh={refreshToggler} />
        {isLoading && <Loading loading={isLoading} size={25} />}
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
