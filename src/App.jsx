import { useEffect, useState } from 'react';
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

  // Подгрузка картин

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await fetch("https://registry.scalar.com/@mail-ufgwz/apis/gallery-api@1.0", { headers: { "Accept": "application/json" } });
        const spec = await response.json()
        // Извлекаем пример ответа
        const paintingsArray = spec.paths["/paintings"].get.responses["200"].content["application/json"].example;
        console.log("Первая картина из API:", paintingsArray[0]);
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

  // Подсчитываем общее количество страниц
  const totalPages = Math.ceil(allPaintings.length / ITEMS_PER_PAGE);
  // Берем картины только для текущей страницы
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPaintings = allPaintings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Сброс страницы, если она стала больше доступного
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Прокрутка вверх после смены страницы
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <div className='loading'>Загрузка картин...</div>;
  }

  return (
    <>
      <FilterMenu isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      <Header />
      <main>
        <SearchBar onFilterClick={() => setIsFilterOpen(true)} />
        <Gallery paintings={currentPaintings} />
      </main>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default App;