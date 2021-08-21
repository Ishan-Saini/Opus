import { useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import DisplayNote from './components/Display/DisplayNote';
import Header from './components/Layout/Header/Header';
import Welcome from './Pages/Welcome';
import Sidebar from './components/Layout/Sidebar/Sidebar';
import Editor from './components/Notes/Editor';

function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshToggler = (bool) => {
    setRefresh((bool) => !bool);
  };

  return (
    <div className="App">
      <header className="header">
        <Header />
      </header>
      <aside className="sidebar">
        <Sidebar refresh={refresh} />
      </aside>
      <main className="content">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/notes" />
          </Route>
          <Route path="/notes" exact>
            <Welcome />
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
        </Switch>
      </main>
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
