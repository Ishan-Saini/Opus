import React, { Fragment } from 'react';
import Button from '../UI/Button';
import { FaCode, FaListUl, FaListOl } from 'react-icons/fa';
import classes from './NotesEditor.module.css';
import { ImQuotesRight } from 'react-icons/im';

let inlineStyleArr = [
  {
    name: 'BOLD',
    symbol: <b>B</b>,
    id: 'btn-bold',
  },
  {
    name: 'ITALIC',
    symbol: <i>I</i>,
    id: 'btn-italic',
  },
  {
    name: 'UNDERLINE',
    symbol: <u>U</u>,
    id: 'btn-underline',
  },
  {
    name: 'CODE',
    symbol: <FaCode />,
    id: 'btn-code',
  },
];

let blockStyleArr = [
  {
    symbol: 'H1',
    name: 'header-one',
    id: 'btn-h1',
  },

  {
    symbol: 'H2',
    name: 'header-two',
    id: 'btn-h2',
  },

  {
    symbol: 'H3',
    name: 'header-three',
    id: 'btn-h3',
  },

  {
    symbol: <ImQuotesRight />,
    name: 'blockquote',
    id: 'btn-blockquote',
  },

  {
    symbol: <FaListUl />,
    name: 'unordered-list-item',
    id: 'btn-unordered',
  },

  {
    symbol: <FaListOl />,
    name: 'ordered-list-item',
    id: 'btn-ordered',
  },
];

const StyleButtons = (props) => {
  const inlineStyleBtns = inlineStyleArr.map((btn) => (
    <Button
      type="button"
      key={btn.id}
      className={classes['btn-rich']}
      button={{
        name: btn.name,
      }}
      onMouseDown={props.inlineBtnStyle}
    >
      {btn.symbol}
    </Button>
  ));

  const blockStyleBtns = blockStyleArr.map((btn) => (
    <Button
      type="button"
      key={btn.id}
      className={classes['btn-rich']}
      button={{
        name: btn.name,
      }}
      onMouseDown={props.blockBtnStyle}
    >
      {btn.symbol}
    </Button>
  ));

  return (
    <Fragment>
      {inlineStyleBtns}
      {blockStyleBtns}
    </Fragment>
  );
};

export default StyleButtons;
