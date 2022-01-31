import axios from 'axios';
import classes from './NotebookTile.module.css';
import { useHistory } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const NotebookTile = (props) => {
  const history = useHistory();

  const notebookClickHandler = (e) => {
    const id = e.currentTarget.parentNode.dataset.nbid;
    history.push(`/notebooks/${id}/notes/`);
  };

  const deleteNbHandler = async (e) => {
    const id = e.currentTarget.parentNode.parentNode.dataset.nbid;
    await axios({
      url: `http://127.0.0.1:5000/api/v1/notebooks/${id}`,
      method: 'DELETE',
      withCredentials: true,
    });
    history.push(`/notebooks/`);
    props.refresh();
    // UX
  };

  return (
    <ul className={classes.nbList}>
      {props.notebooksArr.map((tile) => {
        return (
          <li className={classes.nbTile} key={tile.id} data-nbid={tile.id}>
            <div
              className={classes['nbTile-title']}
              onClick={notebookClickHandler}
            >
              {tile.title}
            </div>
            <div className={classes['nbTile-trash-icon-wrapper']}>
              <IconContext.Provider value={{ color: 'black', size: '0.8rem' }}>
                <FaTrashAlt
                  className={classes['nbTile-trash-icon']}
                  onClick={deleteNbHandler}
                />
              </IconContext.Provider>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default NotebookTile;
