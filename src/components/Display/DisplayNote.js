import React from 'react';
import classes from './DisplayNote.module.css';
import redraft from 'redraft';
import AtomicBlock from './DisplayUtil/AtomicBlock';
import { FaTags, FaCalendarTimes } from 'react-icons/fa';

const DUMMY_OBJ = {
  title: 'Get started with programming',
  tags: ['programming', 'js', 'golang'],
  content: {
    blocks: [
      {
        key: '8ofc8',
        text: 'Render to React components sample',
        type: 'header-one',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: 'f9oqb',
        text: 'You can define custom components to render any part of the draf-js raw.',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 59,
            length: 7,
            key: 0,
          },
        ],
        data: {},
      },
      {
        key: 'edq7t',
        text: 'With cleanup and split flag enabled you can create new paragraphs with empty lines.',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '964p1',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: 'cd2or',
        text: 'Like this.',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '3ov91',
        text: '',
        type: 'atomic',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {
          src: 'sample_cat.jpg',
          type: 'image',
          display: 'medium',
          caption: 'Some cat tax',
          rightsHolder: 'Inge Wallumrød, under CC0 License ',
        },
      },
      {
        key: '1pdul',
        text: 'Lists are cool',
        type: 'unordered-list-item',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '224ne',
        text: 'try to add or delete',
        type: 'unordered-list-item',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 7,
            length: 3,
            style: 'BOLD',
          },
          {
            offset: 14,
            length: 6,
            style: 'BOLD',
          },
          {
            offset: 7,
            length: 3,
            style: 'ITALIC',
          },
          {
            offset: 14,
            length: 6,
            style: 'ITALIC',
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: 'dulcp',
        text: 'some items',
        type: 'unordered-list-item',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: 'f0nn7',
        text: 'in this example',
        type: 'unordered-list-item',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: 'bg0j2',
        text: 'Redraft api is simple and declarative, for more info check the readme or this example source ',
        type: 'blockquote',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 63,
            length: 6,
            key: 1,
          },
          {
            offset: 86,
            length: 6,
            key: 2,
          },
        ],
        data: {},
      },
    ],
    entityMap: {
      0: {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: {
          url: 'https://github.com/facebook/draft-js',
        },
      },
      1: {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: {
          url: 'https://github.com/lokiuz/redraft/blob/master/README.md',
        },
      },
      2: {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: {
          url: 'https://github.com/lokiuz/redraft/tree/master/example/src',
        },
      },
    },
  },
};

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

// const isEmptyRaw = raw => !raw || !raw.blocks || (raw.blocks.length === 1 && raw.blocks[0].text === '');

const options = {
  cleanup: {
    after: 'all',
    types: 'all',
    split: true,
  },
};

const DisplayNote = () => {
  const raw = DUMMY_OBJ.content;
  const rendered = redraft(raw, { inline, blocks, entities }, options);
  return (
    <div className={classes.displayWrapper}>
      <div className={classes.headerWrapper}>
        <div className={classes.titleWrapper}>
          <h1>{DUMMY_OBJ.title}</h1>
        </div>
        <div className={classes.tagsWrapper}>
          <FaTags />
          {DUMMY_OBJ.tags.map((tag) => {
            return <span>{tag}</span>;
          })}
        </div>
        <div className={classes.dateWrapper}>
          <FaCalendarTimes />
          <p>27th July 2021</p>
        </div>
      </div>
      <div className={classes.contentWrapper}>{rendered}</div>
    </div>
  );
};

export default DisplayNote;
