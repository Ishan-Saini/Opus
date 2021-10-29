import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../store/User-Context';
import Loading from '../components/UI/Loading';

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  const userCtx = useContext(UserContext);

  if (userCtx.isLoading) return <Loading loading={userCtx.isLoading} />;

  if (userCtx.user) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }

  return <Redirect to="/login" />;
};

export default PrivateRoute;
