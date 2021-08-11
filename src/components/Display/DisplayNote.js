import React, { useContext } from 'react';
import classes from './DisplayNote.module.css';
import redraft from 'redraft';
import AtomicBlock from './DisplayUtil/AtomicBlock';
import { FaTags, FaCalendarTimes } from 'react-icons/fa';
import noteContext from '../../store/Note-context';
import productiveMan from '../../images/productive-man.svg';
import { BsPlusSquareFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';

const styles = {
  code: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  codeBlock: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 20,
  },
};

const inline = {
  BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
  ITALIC: (children, { key }) => <em key={key}>{children}</em>,
  UNDERLINE: (children, { key }) => <u key={key}>{children}</u>,
  CODE: (children, { key }) => (
    <span key={key} style={styles.code}>
      {children}
    </span>
  ),
};

const addBreaklines = (children) => children.map((child) => [child, <br />]);

const getAtomic = (children, { data, keys }) =>
  data.map((item, i) => <AtomicBlock key={keys[i]} {...data[i]} />);

const blocks = {
  unstyled: (children, { keys }) => (
    <p key={keys[0]}>{addBreaklines(children)}</p>
  ),
  atomic: getAtomic,
  blockquote: (children, { keys }) => (
    <blockquote key={keys[0]}>{addBreaklines(children)}</blockquote>
  ),
  'header-one': (children, { keys }) =>
    children.map((child, i) => <h1 key={keys[i]}>{child}</h1>),
  'header-two': (children, { keys }) =>
    children.map((child, i) => <h2 key={keys[i]}>{child}</h2>),
  'header-three': (children, { keys }) =>
    children.map((child, i) => <h3 key={keys[i]}>{child}</h3>),
  'header-four': (children, { keys }) =>
    children.map((child, i) => <h4 key={keys[i]}>{child}</h4>),
  'header-five': (children, { keys }) =>
    children.map((child, i) => <h5 key={keys[i]}>{child}</h5>),
  'header-six': (children, { keys }) =>
    children.map((child, i) => <h6 key={keys[i]}>{child}</h6>),
  'code-block': (children, { keys }) => (
    <pre key={keys[0]} style={styles.codeBlock}>
      {addBreaklines(children)}
    </pre>
  ),
  'unordered-list-item': (children, { depth, keys }) => (
    <ul key={keys[keys.length - 1]} className={`ul-level-${depth}`}>
      {children.map((child) => (
        <li>{child}</li>
      ))}
    </ul>
  ),
  'ordered-list-item': (children, { depth, keys }) => (
    <ol key={keys.join('|')} className={`ol-level-${depth}`}>
      {children.map((child, index) => (
        <li key={keys[index]}>{child}</li>
      ))}
    </ol>
  ),
};

const entities = {
  LINK: (children, entity, { key }) => (
    <a key={key} href={entity.url}>
      {children}
    </a>
  ),
};

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
  const noteCtx = useContext(noteContext);

  const editorDisplayHandler = () => {
    props.isDisplayed(true);
  };

  let displayContent = (
    <div className={classes['no-display__container']}>
      <div className={classes['no-display-img__container']}>
        <img src={productiveMan} alt="productive man" />
      </div>
      <div className={classes['no-display-msg__container']}>
        <p className={classes['no-display__msg']}>Start a new note</p>
        <IconContext.Provider value={{ size: '1.7rem' }}>
          <BsPlusSquareFill
            className={classes['no-display__btn']}
            onClick={editorDisplayHandler}
          />
        </IconContext.Provider>
      </div>
    </div>
  );

  let rendered = '';

  if (
    !(
      Object.keys(noteCtx.note).length === 0 &&
      noteCtx.note.constructor === Object
    )
  ) {
    const raw = noteCtx.note.content;
    const isContentAvailable = isEmptyRaw(noteCtx.note.content);
    let tagsContent = null;

    if (isContentAvailable) {
      rendered = redraft(raw, { inline, blocks, entities }, options);
    }

    if (noteCtx.note.tags) {
      tagsContent = noteCtx.note.tags.map((tag) => {
        return <span>{tag}</span>;
      });
    }

    displayContent = (
      <div className={classes.displayWrapper}>
        <div className={classes.headerWrapper}>
          <div className={classes.titleWrapper}>
            <h1>{noteCtx.note.title}</h1>
          </div>
          {tagsContent && (
            <div className={classes.tagsWrapper}>
              <FaTags />
              {tagsContent}
            </div>
          )}
          <div className={classes.dateWrapper}>
            <FaCalendarTimes />
            <p>{noteCtx.note.date}</p>
          </div>
        </div>
        <div className={classes.contentWrapper}>{rendered}</div>
      </div>
    );
  }

  return displayContent;
};

export default DisplayNote;
