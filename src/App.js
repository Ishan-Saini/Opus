import './App.css';
import Header from './components/Layout/Header/Header';
import Sidebar from './components/Layout/Sidebar/Sidebar';
import SearchInput from './components/Search/SearchInput';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchInput />
      <Sidebar />
    </div>
  );
}

export default App;
