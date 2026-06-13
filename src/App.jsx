import { useEffect, useState, useMemo } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import Pagination from './components/Pagination';
import FilterMenu from './components/FilterMenu';

const ITEMS_PER_PAGE = 6;

const App = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [allPaintings, setAllPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ artist: '', location: '', yearFrom: '', yearTo: '' });

  // Подгрузка картин

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await fetch("https://registry.scalar.com/@mail-ufgwz/apis/gallery-api@1.0", { headers: { "Accept": "application/json" } });
        const spec = await response.json()
        // Извлекаем пример ответа
        const paintingsArray = spec.paths["/paintings"].get.responses["200"].content["application/json"].example;
        setAllPaintings(paintingsArray);
      } catch (error) {
        console.error("Ошибка загрузки картин", error);
        setAllPaintings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPaintings();
  }, []);

  // Функция фильтрации
  const filteredPaintings = useMemo(() => {
    if (!allPaintings.length) return [];
    let result = [...allPaintings];
    
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(query));
    }
    if (filters.artist) {
      result = result.filter(p => p.artist === filters.artist);
    }
    if (filters.location) {
      result = result.filter(p => p.location === filters.location);
    }
    // Фильтрация по годам: только если оба поля заполнены
    if (filters.yearFrom && filters.yearTo) {
      const from = parseInt(filters.yearFrom);
      const to = parseInt(filters.yearTo);
      result = result.filter(p => p.year >= from && p.year <= to);
    }
    return result;
  }, [allPaintings, searchQuery, filters]);

  // Пагинация на основе filteredPaintings
  const totalPages = Math.ceil(filteredPaintings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPaintings = filteredPaintings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Сброс страницы при изменении фильтров или поиска
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  // Эффект для коррекции currentPage при изменении totalPages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ artist: '', location: '', yearFrom: '', yearTo: '' });
    setSearchQuery('');
    setCurrentPage(1);
  };

  if (loading) return <div className="loading">Загрузка картин...</div>;

  return (
    <>
      <FilterMenu
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        paintings={allPaintings}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
        initialFilters={filters}
      />
      <Header />
      <main>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFilterClick={() => setIsFilterOpen(true)}
        />
        <Gallery paintings={currentPaintings} />
      </main>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
}

export default App;