import { useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import WelcomePage from './Pages/Welcome/WelcomePage';
import DisplayNote from './components/Display/DisplayNote';
import Header from './components/Layout/Header/Header';
import NotesPage from './Pages/Notes/NotesPage';
import Sidebar from './components/Layout/Sidebar/Sidebar';
import Editor from './components/Notes/Editor';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [showSidebar] = useState(
    window.location.pathname === '/login' ||
      window.location.pathname === '/signup'
      ? false
      : true
  );

  const refreshToggler = (bool) => {
    setRefresh((bool) => !bool);
  };

  return (
    <div className="App">
      <header className="header">
        <Header />
      </header>
      {showSidebar && (
        <aside className="sidebar">
          <Sidebar refresh={refresh} />
        </aside>
      )}
      <Switch>
        <Route path={['/login', '/signup']} exact>
          <WelcomePage />
        </Route>
        <main className="content">
          <Route path="/" exact>
            <Redirect to="/notes" />
          </Route>
          <Route path="/notes" exact>
            <NotesPage />
          </Route>
          <Route path="/notes/:noteId">
            <DisplayNote />
          </Route>
          <Route path="/editor" exact>
            <Editor refresh={refreshToggler} />
          </Route>
          <Route path="/editor/:noteId">
            <Editor />
          </Route>
        </main>
      </Switch>
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
