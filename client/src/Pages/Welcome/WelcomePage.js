import React from 'react';
import { Switch, Route } from 'react-router-dom';
import classes from './WelcomePage.module.css';
import landingSvg from '../../images/landingSvg.svg';
import LoginForm from '../../components/UI/AuthForm/LoginForm';
import SignupForm from '../../components/UI/AuthForm/SingupForm';

const WelcomePage = () => {
  return (
    <React.Fragment>
      <div className={`landing + ${classes.landingPage}`}>
        <div className={classes['landing-svg__container']}>
          <img src={landingSvg} alt="notes illustration" />
        </div>
        <div className={classes['landing-text__container']}>
          <h1>OPUS | Personal Notebook</h1>
          <p>Keep all your notes organised</p>
        </div>
        <div className={classes['landing-form__container']}>
          <Switch>
            <Route path="/login" exact>
              <LoginForm />
            </Route>
            <Route path="/signup" exact>
              <SignupForm />
            </Route>
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WelcomePage;
