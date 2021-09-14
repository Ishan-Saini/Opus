import React from 'react';
import classes from './WelcomePage.module.css';
import landingSvg from '../../images/landingSvg.svg';
import LoginForm from '../../components/UI/Login/LoginForm';

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
          <LoginForm />
        </div>
      </div>
    </React.Fragment>
  );
};

export default WelcomePage;
