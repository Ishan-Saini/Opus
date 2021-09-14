import React from 'react';
import { Link } from 'react-router-dom';
import classes from './LoginForm.module.css';

const LoginForm = () => {
  return (
    <form className={classes.loginForm}>
      <h1>Welcome back!</h1>
      <label for="emailid" className={classes.label}>
        EMAIL
      </label>
      <input
        type="email"
        className={`${classes.emailInput} + ${classes.inputBox}`}
        name="emailid"
      />
      <label for="password" className={classes.label}>
        PASSWORD
      </label>
      <input
        type="password"
        className={`${classes.passwordInput} + ${classes.inputBox}`}
        name="password"
      />

      <Link className={classes['reset-link']}>Forgot Password?</Link>
      <button type="submit" className={classes.submitBtn}>
        LOGIN
      </button>
      <Link className={classes['signup-link']}>Need an account? Signup</Link>
    </form>
  );
};

export default LoginForm;
