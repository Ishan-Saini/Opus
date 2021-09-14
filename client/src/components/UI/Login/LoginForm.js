import React from 'react';
import classes from './LoginForm.module.css';

const LoginForm = () => {
  return (
    <form className={classes.loginForm}>
      <label for="emailid" className={classes.label}>
        Email-Id :
      </label>
      <input type="email" className={classes.emailInput} name="emailid" />
      <label for="password" className={classes.label}>
        Password :
      </label>
      <input
        type="password"
        className={classes.passwordInput}
        name="password"
      />
    </form>
  );
};

export default LoginForm;
