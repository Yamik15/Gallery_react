import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import Pagination from './components/Pagination';
import FilterMenu from './components/FilterMenu';

const App = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <FilterMenu isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      <Header />
      <main>
        <SearchBar onFilterClick={() => setIsFilterOpen(true)} />
        <Gallery />
      </main>
      <Pagination />
    </>
  );
}

export default App;