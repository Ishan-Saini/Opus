import './App.css';
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import WelcomePage from './Pages/Welcome/WelcomePage';
import Header from './components/Layout/Header/Header';
import ErrorPage from './Pages/Error/ErrorPage';
import MainContent from './components/Layout/Main/MainContent';
import User from './Pages/User/User';

function App() {
  return (
    <div className="App">
      {/* HEADER */}
      <header className="header">
        <Header />
      </header>

      <Switch>
        {/* LANDING AUTH PAGE */}
        <Route path={['/login', '/signup']} exact>
          <WelcomePage />
        </Route>

        <Route path="/user">
          <User />
        </Route>

        <Route path="/" exact>
          <Redirect to="/notebooks" />
        </Route>

        {/* MAIN PAGE + SIDEBAR*/}
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
