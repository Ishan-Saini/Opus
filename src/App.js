import './App.css';
import Header from './components/Layout/Header/Header';
import Sidebar from './components/Layout/Sidebar/Sidebar';
import Notes from './components/Notes/Notes';
import SearchInput from './components/Search/SearchInput';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchInput />
      <Notes />
      <Sidebar />
    </div>
  );
}

export default App;
