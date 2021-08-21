import { ClipLoader } from 'react-spinners';

const Loading = (props) => {
  return <ClipLoader loading={props.loading} color="#000" size={props.size} />;
};

export default Loading;
