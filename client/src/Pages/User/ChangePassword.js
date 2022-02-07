import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory, Link } from 'react-router-dom';
import Toast from '../../components/UI/Toast/Toast';
import classes from './User.module.css';
import axios from 'axios';

const initialPasswordState = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const ChangePassword = (props) => {
  const [passwordState, setPasswordState] = useState(initialPasswordState);
  const history = useHistory();

  const passChangeHandler = async (e) => {
    e.preventDefault();

    try {
      await axios({
        method: 'PATCH',
        url: '/api/v1/users/updatePassword',
        withCredentials: true,
        data: {
          currentPassword: passwordState.currentPassword,
          newPassword: passwordState.newPassword,
          confirmPassword: passwordState.confirmPassword,
        },
      });
      toast.success('Password changed successfully!');
      history.replace('/user/');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const passwordStateHandler = (e) => {
    const { name, value } = e.target;

    setPasswordState({
      ...passwordState,
      [name]: value,
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={passChangeHandler} className={classes['change-password']}>
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
        <div className={classes['change-password-btn__container']}>
          <button className={classes['change-password-btn']}>SAVE</button>
          <Link to="/user">
            <button className={classes['change-password-btn']} type="button">
              CANCEL
            </button>
          </Link>
        </div>
      </form>
      <Toast />
    </React.Fragment>
  );
};

export default ChangePassword;
