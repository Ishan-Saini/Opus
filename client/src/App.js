import './App.css';
import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import WelcomePage from './Pages/Welcome/WelcomePage';
import Header from './components/Layout/Header/Header';
import Sidebar from './components/Layout/Sidebar/Sidebar';
import ErrorPage from './Pages/Error/ErrorPage';
import MainContent from './components/Layout/Main/MainContent';
import UserContext from './store/User-Context';

function App() {
  //const match = useRouteMatch('/notebooks');
  const userCtx = useContext(UserContext);

  return (
    <div className="App">
      {/* HEADER */}
      <header className="header">
        <Header />
      </header>

      {/* SIDEBAR */}
      {!userCtx.isLoading && userCtx.isLoggedIn && (
        <aside className="sidebar">
          <Sidebar />
        </aside>
      )}

      <Switch>
        {/* LANDING AUTH PAGE */}
        <Route path={['/login', '/signup']} exact>
          <WelcomePage />
        </Route>

        <Route path="/" exact>
          <Redirect to="/notebooks" />
        </Route>

        {/* MAIN PAGE */}
        <Route path="/notebooks">
          <MainContent />
        </Route>

        <Route path="*">
          <ErrorPage status="404" />
        </Route>
      </Switch>

      {/* FOOTER */}
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
