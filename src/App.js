import './App.css';
import DisplayNote from './components/Display/DisplayNote';
import Header from './components/Layout/Header/Header';
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
          <DisplayNote />
          {/* <Notes /> */}
        </main>
        <footer className="footer"></footer>
      </div>
    </NoteProvider>
  );
}

export default App;
