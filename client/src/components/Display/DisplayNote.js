import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import classes from './DisplayNote.module.css';
import redraft from 'redraft';
import { FaTags, FaCalendarTimes, FaEdit, FaWindowClose } from 'react-icons/fa';
import { inline } from './DisplayUtil/inline';
import { blocks } from './DisplayUtil/blocks';
import { entities } from './DisplayUtil/entities';
import Loading from '../UI/Loading';

const isEmptyRaw = (raw) =>
  !raw || !raw.blocks || (raw.blocks.length === 1 && raw.blocks[0].text === '');

const options = {
  cleanup: {
    after: 'all',
    types: 'all',
    split: true,
  },
};

const DisplayNote = (props) => {
  const [note, setNote] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { noteId, nbId } = params;
  const history = useHistory();

  const closeDisplayNoteHandler = () => {
    history.replace(`/notebooks/${nbId}/notes/`);
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setIsLoading(true);
        const res = await axios({
          method: 'GET',
          url: `/api/v1/notebooks/${nbId}/notes/${noteId}`,
          withCredentials: true,
        });
        setIsLoading(false);
        setNote(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNote();
  }, [noteId, nbId]);

  let displayContent = null;

  if (isLoading) {
    displayContent = <Loading loading={isLoading} size={35} />;
  }

  if (!isLoading && Object.keys(note).length === 0) {
    displayContent = <p>No note to display</p>;
  }

  let rendered = null;

  if (!(Object.keys(note).length === 0 && note.constructor === Object)) {
    const raw = note.content;
    const isContentNotAvailable = isEmptyRaw(note.content);
    let tagsContent = null;

    if (!isContentNotAvailable) {
      rendered = redraft(raw, { inline, blocks, entities }, options);
    }

    if (note.tags.length > 0) {
      tagsContent = note.tags.map((tag) => {
        return <span>{tag}</span>;
      });
    }

    displayContent = (
      <div className={classes.displayWrapper}>
        <div className={classes.headerWrapper}>
          <div>
            <div className={classes.titleWrapper}>
              <h1>{note.title}</h1>
            </div>
            {tagsContent && (
              <div className={classes.tagsWrapper}>
                <FaTags />
                {tagsContent}
              </div>
            )}
            <div className={classes.dateWrapper}>
              <FaCalendarTimes />
              <p>{note.created.slice(0, 10)}</p>
            </div>
          </div>
          <div className={classes['displayNote-util-icon-wrapper']}>
            <FaEdit className={classes['displayNote-util-icon']} />
            <FaWindowClose
              className={classes['displayNote-util-icon']}
              onClick={closeDisplayNoteHandler}
            />
          </div>
        </div>
        <div className={classes.contentWrapper}>{rendered}</div>
      </div>
    );
  }

  return displayContent;
};

export default DisplayNote;
