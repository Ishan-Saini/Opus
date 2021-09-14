import React from 'react';
import { Link } from 'react-router-dom';
import classes from './LoginForm.module.css';

const LoginForm = () => {
  return (
    <form className={classes.loginForm}>
      <h1>Welcome back!</h1>
      <label for="emailid" className={classes.label}>
        Email-Id
      </label>
      <input
        type="email"
        className={`classes.emailInput + ${classes.inputBox}`}
        name="emailid"
      />
      <label for="password" className={classes.label}>
        Password
      </label>
      <input
        type="password"
        className={`classes.passwordInput + ${classes.inputBox}`}
        name="password"
      />
      <Link className={classes['reset-link']}>Forgot Password?</Link>
      <input type="submit" className={classes.submitBtn} />
      <p className={classes['signup-link']}>Need an account? Signup</p>
    </form>
  );
};

export default LoginForm;
