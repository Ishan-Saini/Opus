import { ClipLoader } from 'react-spinners';
import classes from './Loading.module.css';

const Loading = (props) => {
  return (
    <div className={classes.loader}>
      <ClipLoader loading={props.loading} color="#000" size={props.size} />
    </div>
  );
};

export default Loading;
