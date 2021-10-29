import React, { useState } from 'react';
import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom';
import './App.css';
import WelcomePage from './Pages/Welcome/WelcomePage';
import DisplayNote from './components/Display/DisplayNote';
import Header from './components/Layout/Header/Header';
import NotesPage from './Pages/Notes/NotesPage';
import Sidebar from './components/Layout/Sidebar/Sidebar';
import Editor from './components/Notes/Editor';
import ErrorPage from './Pages/Error/ErrorPage';
import PrivateRoute from './Pages/PrivateRoute';

const notebookRoutes = {
  nb: ['/notebooks', '/notebooks/:nbId', '/notebooks/:nbId/notes'],
  display: '/notebooks/:nbId/notes/:noteId',
  editor: {
    new: '/notebooks/:nbId/editor',
    edit: '/notebooks/:nbId/notes/:noteId/editor',
  },
};

function App() {
  const [refresh, setRefresh] = useState(false);
  const match = useRouteMatch('/notebooks');

  const refreshToggler = (bool) => {
    setRefresh((bool) => !bool);
  };

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

        <Route path="/" exact>
          <Redirect to="/notebooks" />
        </Route>

        {/* MAIN PAGE + SIDEBAR*/}
        {match && (
          <React.Fragment>
            <aside className="sidebar">
              <Sidebar refresh={refresh} />
            </aside>

            <main className="content">
              <Switch>
                <PrivateRoute
                  path={notebookRoutes.nb}
                  component={NotesPage}
                  exact
                />
                <PrivateRoute
                  path={notebookRoutes.display}
                  component={DisplayNote}
                  exact
                />
                <PrivateRoute
                  refresh={refreshToggler}
                  path={notebookRoutes.editor.new}
                  component={Editor}
                  exact
                />
                <PrivateRoute
                  path={notebookRoutes.editor.edit}
                  component={Editor}
                  exact
                />
              </Switch>
            </main>
          </React.Fragment>
        )}

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
