import classes from './ErrorPage.module.css';
import warningImage from '../../images/warningError.svg';

const ErrorPage = (props) => {
  const errBtnClickHandler = (e) => {};
  let message = '';
  if (props.status === '404') message = 'Requested page was not found :(';

  return (
    <div className="errorpage">
      <div className={classes['error-container']}>
        <div className={classes['error-message__container']}>
          <h1>Oops!</h1>
          <p className={classes['error-message__code']}>{props.status}</p>
          <p className={classes['error-message']}>{message}</p>
          <button type="button" onClick={errBtnClickHandler}>
            GO BACK
          </button>
        </div>
        <div className={classes['error-image__container']}>
          <img src={warningImage} alt="warning" />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
