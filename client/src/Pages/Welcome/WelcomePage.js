import React, { useContext } from 'react';
import classes from './WelcomePage.module.css';
import landingSvg from '../../images/landingSvg.svg';
import AuthForm from '../../components/UI/AuthForm/AuthForm';
import UserContext from '../../store/User-Context';
import { Redirect, useHistory } from 'react-router-dom';
import Loading from '../../components/UI/Loading';

const WelcomePage = (props) => {
  const userCtx = useContext(UserContext);
  const history = useHistory();

  if (userCtx.isLoading) return <Loading loading={userCtx.isLoading} />;
  if (userCtx.isLoggedIn) {
    if (history.location.state)
      return <Redirect to={history.location.state.from} />;
    else return <Redirect to="/notebooks" />;
  }

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
          <AuthForm />
        </div>
      </div>
    </React.Fragment>
  );
};

export default WelcomePage;
