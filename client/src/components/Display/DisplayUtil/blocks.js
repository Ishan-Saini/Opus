import AtomicBlock from './AtomicBlock';
import { styles } from './styles';

const addBreaklines = (children) => children.map((child) => [child, <br />]);

const getAtomic = (children, { data, keys }) =>
  data.map((item, i) => <AtomicBlock key={keys[i]} {...data[i]} />);

export const blocks = {
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
