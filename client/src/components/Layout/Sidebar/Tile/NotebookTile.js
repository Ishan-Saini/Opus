import classes from './NotebookTile.module.css';
import { useHistory } from 'react-router-dom';

const NotebookTile = (props) => {
  const history = useHistory();

  const notebookClickHandler = (e) => {
    const id = e.currentTarget.dataset.nbid;
    history.push(`/notebooks/${id}/notes/`);
  };

  return (
    <ul className={classes.nbList}>
      {props.notebooksArr.map((tile) => {
        return (
          <li
            className={classes.nbTile}
            key={tile.id}
            data-nbid={tile.id}
            onClick={notebookClickHandler}
          >
            <span className={classes['nbTile-title']}>{tile.title}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default NotebookTile;
