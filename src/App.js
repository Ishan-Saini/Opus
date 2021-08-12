import { useState } from 'react';
import './App.css';
import DisplayNote from './components/Display/DisplayNote';
import Header from './components/Layout/Header/Header';
import Welcome from './components/Layout/Main/Welcome';
import Sidebar from './components/Layout/Sidebar/Sidebar';
import Notes from './components/Notes/Notes';
import NoteProvider from './store/NoteProvider';

function App() {
  const [showEditor, setShowEditor] = useState(false);

  const editorDisplayHandler = (bool) => {
    if (bool === true) setShowEditor(true);
    else if (bool === false) setShowEditor(false);
  };

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
          {!showEditor && <Welcome isDisplayed={editorDisplayHandler} />}
          {showEditor && <Notes isDisplayed={editorDisplayHandler} />}
          {/* <DisplayNote isDisplayed={editorDisplayHandler} /> */}
        </main>
        <footer className="footer"></footer>
      </div>
    </NoteProvider>
  );
}

export default App;
