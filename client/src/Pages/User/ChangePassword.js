import React, { useState } from 'react';
import classes from './User.module.css';
import axios from 'axios';
import StatusMessage from '../../components/UI/StatusMessage/StatusMessage';

const initialPasswordState = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const ChangePassword = (props) => {
  const [passwordState, setPasswordState] = useState(initialPasswordState);
  const [status, setStatus] = useState('');
  const [msg, setMsg] = useState('');

  const passChangeHandler = async (e) => {
    e.preventDefault();

    try {
      await axios({
        method: 'PATCH',
        url: 'http://127.0.0.1:5000/api/v1/users/updatePassword',
        withCredentials: true,
        data: {
          currentPassword: passwordState.currentPassword,
          newPassword: passwordState.newPassword,
          confirmPassword: passwordState.confirmPassword,
        },
      });
      setStatus('success');
      setMsg('Password changed successfully');
    } catch (err) {
      setStatus('error');
      setMsg(err.response.data.message);
    }
  };

  const passwordStateHandler = (e) => {
    const { name, value } = e.target;

    setPasswordState({
      ...passwordState,
      [name]: value,
    });
  };

  const cancelBtnHandler = () => {
    props.cancelBtn();
  };

  return (
    <React.Fragment>
      {status !== 'success' && (
        <form
          onSubmit={passChangeHandler}
          className={classes['change-password']}
        >
          <label htmlFor="curretPass">CURRENT PASSWORD :</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordState.currentPassword}
            onChange={passwordStateHandler}
          />
          <label htmlFor="newPass">NEW PASSWORD :</label>
          <input
            type="password"
            name="newPassword"
            value={passwordState.newPassword}
            onChange={passwordStateHandler}
          />
          <label htmlFor="confirmPass">CONFIRM PASSWORD :</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordState.confirmPassword}
            onChange={passwordStateHandler}
          />
          {status && <StatusMessage status={status} message={msg} />}
          <div className={classes['change-password-btn__container']}>
            <button className={classes['change-password-btn']}>SAVE</button>
            <button
              className={classes['change-password-btn']}
              type="button"
              onClick={cancelBtnHandler}
            >
              CANCEL
            </button>
          </div>
        </form>
      )}
      {status === 'success' && (
        <div className={classes['change-success__container']}>
          <StatusMessage status={status} message={msg} />
          <button
            className={classes['change-password-btn']}
            type="button"
            onClick={cancelBtnHandler}
          >
            BACK
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default ChangePassword;
