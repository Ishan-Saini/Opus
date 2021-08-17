import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import DisplayNote from './components/Display/DisplayNote';
import Header from './components/Layout/Header/Header';
import Welcome from './Pages/Welcome';
import Sidebar from './components/Layout/Sidebar/Sidebar';
import Notes from './components/Notes/Notes';
import NoteProvider from './store/NoteProvider';

function App() {
  return (
    <NoteProvider>
      <div className="App">
        <header className="header">
          <Header />
        </header>
        <aside className="sidebar">
          <Sidebar />
        </aside>
        <main className="content">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/welcome" />
            </Route>
            <Route path="/welcome" exact>
              <Welcome />
            </Route>
            <Route path="/editor" exact>
              <Notes />
            </Route>
            <Route path="/notes/:noteId" exact>
              <DisplayNote />
            </Route>
          </Switch>
        </main>
        <footer className="footer"></footer>
      </div>
    </NoteProvider>
  );
}

export default App;
