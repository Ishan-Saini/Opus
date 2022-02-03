import axios from 'axios';
import { useHistory, useRouteMatch } from 'react-router-dom';
import classes from './NotesTiles.module.css';
import { FaTrashAlt } from 'react-icons/fa';
import { IoOpenOutline } from 'react-icons/io5';
import Loading from '../../../UI/Loading';

const NotesTiles = (props) => {
  const history = useHistory();
  const match = useRouteMatch({
    path: '/notebooks/:nbId',
  });

  let nbId = match ? match.params.nbId : null;

  const noteOpenHandler = (e) => {
    const id = e.currentTarget.parentNode.dataset.noteid;
    history.push(`/notebooks/${nbId}/notes/${id}`);
  };

  const removeNoteHandler = async (e) => {
    const id = e.currentTarget.parentNode.dataset.noteid;

    await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:5000/api/v1/notebooks/${nbId}/notes/${id}`,
      withCredentials: true,
    });

    history.push(`/notesbook/${nbId}/notes/`);
    props.refresh();
  };

  let notesTileContent = null;

  if (props.isLoading) {
    notesTileContent = (
      <div className={classes['loader_wrapper']}>
        <Loading loading={props.isLoading} size={25} />
      </div>
    );
  }

  if (!props.isLoading) {
    notesTileContent = (
      <p className={classes['Empty-Sidebar-Msg']}>Nothing in here!</p>
    );
  }

  if (props.notesArr.length !== 0) {
    notesTileContent = (
      <ul className={classes['notes-tile-wrapper']}>
        {props.notesArr.map((tile) => {
          return (
            <li
              className={classes['notes-tile']}
              key={tile.id}
              data-noteid={tile.id}
            >
              <div className={classes.titleWrapper}>
                <p className={classes['notes-tile__title']}>{tile.title}</p>
              </div>
              {tile.tags.length > 0 && (
                <div className={classes.tagsWrapper}>
                  {tile.tags.map((tag, index) => (
                    <span key={index} className={classes['notes-tile__tags']}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className={classes.openBtnWrapper} onClick={noteOpenHandler}>
                <IoOpenOutline className={classes['tile-btn']} />
              </div>
              <div
                className={classes.trashBtnWrapper}
                onClick={removeNoteHandler}
              >
                <FaTrashAlt className={classes['tile-btn']} />
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  return notesTileContent;
};

export default NotesTiles;
