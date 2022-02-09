import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Toast from '../Toast/Toast';
import classes from './AuthForm.module.css';
import UserContext from '../../../store/User-Context';

const initialFormState = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const AuthForm = (props) => {
  const [isUser, setIsUser] = useState(
    window.location.pathname === '/login' ? true : false
  );
  const [authState, setAuthState] = useState(initialFormState);
  const history = useHistory();
  const userCtx = useContext(UserContext);

  const authStateHandler = (e) => {
    const { name, value } = e.target;

    setAuthState({
      ...authState,
      [name]: value,
    });
  };

  const switchLinkHandler = () => {
    setIsUser((bool) => !bool);
  };

  const authSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: 'POST',
        url: `/api/v1/users/${isUser ? 'login' : 'signup'}`,
        withCredentials: true,
        data: {
          ...(!isUser && {
            name: authState.name,
            passwordConfirm: authState.passwordConfirm,
          }),
          email: authState.email,
          password: authState.password,
        },
      });
      userCtx.login(res.data.data.user);
      history.push('/notebooks');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <form
      autoComplete="off"
      className={classes.loginForm}
      onSubmit={authSubmitHandler}
    >
      {!isUser && <h1>Welcome aboard!</h1>}
      {isUser && <h1>Welcome back!</h1>}
      {!isUser && (
        <>
          <label htmlFor="name" className={classes.label}>
            NAME
          </label>
          <input
            type="text"
            className={`${classes.nameInput} + ${classes.inputBox}`}
            name="name"
            spellCheck="false"
            value={authState.name}
            onChange={authStateHandler}
          />
        </>
      )}
      <label htmlFor="emailid" className={classes.label}>
        EMAIL
      </label>
      <input
        type="email"
        className={`${classes.emailInput} + ${classes.inputBox}`}
        name="email"
        spellCheck="false"
        value={authState.email}
        onChange={authStateHandler}
      />
      <label htmlFor="password" className={classes.label}>
        PASSWORD
      </label>
      <input
        type="password"
        className={`${classes.passwordInput} + ${classes.inputBox}`}
        name="password"
        value={authState.password}
        onChange={authStateHandler}
      />
      {!isUser && (
        <>
          <label htmlFor="confirmPassword" className={classes.label}>
            CONFRIM PASSWORD
          </label>
          <input
            type="password"
            className={`${classes.confirmPasswordInput} + ${classes.inputBox}`}
            name="passwordConfirm"
            value={authState.passwordConfirm}
            onChange={authStateHandler}
          />
        </>
      )}

      <button type="submit" className={classes.submitBtn}>
        {isUser ? 'LOGIN' : 'SIGNUP'}
      </button>
      <Link
        to={isUser ? '/signup' : '/login'}
        className={classes['switch-link']}
        onClick={switchLinkHandler}
      >
        {isUser ? 'Need an account? Signup' : 'Already have an account? Login'}
      </Link>
      <Toast />
    </form>
  );
};

export default AuthForm;
