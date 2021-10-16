import React, { useState } from 'react';
import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom';
import './App.css';
import WelcomePage from './Pages/Welcome/WelcomePage';
import DisplayNote from './components/Display/DisplayNote';
import Header from './components/Layout/Header/Header';
import NotesPage from './Pages/Notes/NotesPage';
import Sidebar from './components/Layout/Sidebar/Sidebar';
import Editor from './components/Notes/Editor';

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

      <Route path="/" exact>
        <Redirect to="/notebooks" />
      </Route>

      {/* LANDING AUTH PAGE */}
      <Route path={['/login', '/signup']} exact>
        <WelcomePage />
      </Route>

      {/* MAIN PAGE + SIDEBAR*/}
      {match && (
        <React.Fragment>
          <aside className="sidebar">
            <Sidebar refresh={refresh} />
          </aside>

          <main className="content">
            <Switch>
              <Route path={notebookRoutes.nb} exact>
                <NotesPage />
              </Route>
              <Route path={notebookRoutes.display} exact>
                <DisplayNote />
              </Route>
              <Route path={notebookRoutes.editor.new} exact>
                <Editor refresh={refreshToggler} />
              </Route>
              <Route path={notebookRoutes.editor.edit} exact>
                <Editor />
              </Route>
            </Switch>
          </main>
        </React.Fragment>
      )}

      {/* FOOTER */}
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
