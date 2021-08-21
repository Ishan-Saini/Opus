import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classes from './DisplayNote.module.css';
import redraft from 'redraft';
import { FaTags, FaCalendarTimes } from 'react-icons/fa';
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
  const { noteId } = params;

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setIsLoading(true);
        const noteJson = await fetch(
          `http://127.0.0.1:5000/api/v1/notes/${noteId}`
        );
        const noteObj = await noteJson.json();
        setIsLoading(false);
        setNote(noteObj.data);
      } catch (err) {
        console.warn(err);
      }
    };
    fetchNote();
  }, [noteId]);

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

    if (note.tags) {
      tagsContent = note.tags.map((tag) => {
        return <span>{tag}</span>;
      });
    }

    displayContent = (
      <div className={classes.displayWrapper}>
        <div className={classes.headerWrapper}>
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
        <div className={classes.contentWrapper}>{rendered}</div>
      </div>
    );
  }

  return displayContent;
};

export default DisplayNote;
