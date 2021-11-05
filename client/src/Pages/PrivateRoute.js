import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../store/User-Context';
import Loading from '../components/UI/Loading';
import Sidebar from '../components/Layout/Sidebar/Sidebar';

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  const userCtx = useContext(UserContext);

  if (userCtx.isLoading) return <Loading loading={userCtx.isLoading} />;

  if (userCtx.user) {
    return (
      <React.Fragment>
        <aside className="sidebar">
          <Sidebar />
        </aside>
        <main className="content">
          <Route {...rest} render={(props) => <Component {...props} />} />
        </main>
      </React.Fragment>
    );
  }

  return <Redirect to="/login" />;
};

export default PrivateRoute;
