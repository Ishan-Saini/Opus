import React, { useContext } from 'react';
import classes from './User.module.css';
import { Redirect, useHistory, Route, Switch } from 'react-router-dom';
import UserDetails from './UserDetails';
import UserContext from '../../store/User-Context';
import userInfo from '../../images/user-info.svg';
import ChangePassword from './ChangePassword';
import Toast from '../../components/UI/Toast/Toast';

const User = () => {
  const userCtx = useContext(UserContext);
  const history = useHistory();

  if (!userCtx.isLoggedIn)
    return (
      <Redirect
        to={{ pathname: '/login', state: { from: history.location.pathname } }}
      />
    );

  return (
    <React.Fragment>
      <div className={`${classes['user-profile'] + ' user'}`}>
        <div className={classes['svg-container']}>
          <img src={userInfo} alt="user-info" className={classes['user-svg']} />
        </div>
        <div className={classes['user-info__container']}>
          <Switch>
            <Route path="/user" exact>
              <UserDetails />
            </Route>
            <Route path="/user/changePassword" exact>
              <ChangePassword />
            </Route>
          </Switch>
        </div>
      </div>
      <Toast />
    </React.Fragment>
  );
};

export default User;
