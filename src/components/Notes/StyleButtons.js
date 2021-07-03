import React, { Fragment } from 'react';
import Button from '../UI/Button';
import { FaCode, FaListUl, FaListOl } from 'react-icons/fa';
import classes from './NotesEditor.module.css';
import { ImQuotesRight } from 'react-icons/im';

let inlineStyleArr = [
  {
    name: 'BOLD',
    symbol: <b>B</b>,
  },
  {
    name: 'ITALIC',
    symbol: <i>I</i>,
  },
  {
    name: 'UNDERLINE',
    symbol: <u>U</u>,
  },
  {
    name: 'CODE',
    symbol: <FaCode />,
  },
];

let blockStyleArr = [
  {
    symbol: 'H1',
    name: 'header-one',
  },

  {
    symbol: 'H2',
    name: 'header-two',
  },

  {
    symbol: 'H3',
    name: 'header-three',
  },

  {
    symbol: <ImQuotesRight />,
    name: 'blockquote',
  },

  {
    symbol: <FaListUl />,
    name: 'unordered-list-item',
  },

  {
    symbol: <FaListOl />,
    name: 'ordered-list-item',
  },
];

const StyleButtons = (props) => {
  const inlineStyleBtns = inlineStyleArr.map((btn) => (
    <Button
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
