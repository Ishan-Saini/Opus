import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = (props) => {
  return (
    <ToastContainer
      theme="colored"
      pauseOnFocusLoss={false}
      autoClose="4000"
      closeOnClick
      draggable
    />
  );
};

export default Toast;
