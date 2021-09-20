import React from 'react';
import { Link } from 'react-router-dom';
import classes from './AuthForm.module.css';

const SignupForm = () => {
  return (
    <form className={classes.loginForm}>
      <h1>Welcome aboard!</h1>
      <label for="name" className={classes.label}>
        NAME
      </label>
      <input
        type="text"
        className={`${classes.nameInput} + ${classes.inputBox}`}
        name="name"
        spellCheck="false"
      />
      <label for="emailid" className={classes.label}>
        EMAIL
      </label>
      <input
        type="email"
        className={`${classes.emailInput} + ${classes.inputBox}`}
        name="emailid"
        spellCheck="false"
      />
      <label for="password" className={classes.label}>
        PASSWORD
      </label>
      <input
        type="password"
        className={`${classes.passwordInput} + ${classes.inputBox}`}
        name="password"
      />
      <label for="confirmPassword" className={classes.label}>
        CONFRIM PASSWORD
      </label>
      <input
        type="password"
        className={`${classes.confirmPasswordInput} + ${classes.inputBox}`}
        name="confirmPassword"
      />

      <button type="submit" className={classes.submitBtn}>
        SIGNUP
      </button>
      <Link to="/login" className={classes['switch-link']}>
        Already have an account? Login
      </Link>
    </form>
  );
};

export default SignupForm;
