import { useTheme } from "../context/ThemeContext";

const SearchBar = ({ searchQuery, onSearchChange, onFilterClick }) => {
  const { theme } = useTheme();
  const getSearchIcon = () => theme === 'light' ? '/assets/icons/Search_lightgray.svg' : '/assets/icons/Search_darkgray.svg';
  const getFilterIcon = () => theme === 'light' ? '/assets/icons/Filter_lightgray.svg' : '/assets/icons/Filter_darkgray.svg';

  return (
    <div className="search-section">
      <div className="search-box">
        <div className="search-icon">
          <img src={getSearchIcon()} alt="Поиск" className="theme-icon" />
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Painting title"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="filter-icon" onClick={onFilterClick}>
          <img src={getFilterIcon()} alt="Фильтр" className="theme-icon" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;