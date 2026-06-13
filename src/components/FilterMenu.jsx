import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const FilterMenu = ({ isOpen, onClose, paintings, onApplyFilters, onClearFilters, initialFilters }) => {
  const { theme } = useTheme();
  const [localFilters, setLocalFilters] = useState({ ...initialFilters, yearFrom: initialFilters.yearFrom || '', yearTo: initialFilters.yearTo || '' });
  const [openBlocks, setOpenBlocks] = useState({ artist: false, location: false, years: false });
  const [artists, setArtists] = useState([]);
  const [locations, setLocations] = useState([]);
  const [years, setYears] = useState([]);
  const menuRef = useRef(null);

  useEffect(() => {
    if (paintings && paintings.length) {
      const uniqueArtists = [...new Set(paintings.map(p => p.artist).filter(Boolean))];
      const uniqueLocations = [...new Set(paintings.map(p => p.location).filter(Boolean))];
      const uniqueYears = [...new Set(paintings.map(p => p.year).filter(Boolean))].sort((a,b) => a-b);
      setArtists(uniqueArtists);
      setLocations(uniqueLocations);
      setYears(uniqueYears);
    }
  }, [paintings]);

  useEffect(() => {
    setLocalFilters(initialFilters);
  }, [initialFilters]);

  const getIconPath = (baseName, suffix) => {
    const themeSuffix = theme === 'light' ? 'lightgray' : 'darkgray';
    return `/assets/icons/${baseName}_${themeSuffix}.svg`;
  };

  const toggleBlock = (blockName) => {
    setOpenBlocks(prev => ({ ...prev, [blockName]: !prev[blockName] }));
  };

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleClear = () => {
    onClearFilters();
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <div className={`filter-menu ${isOpen ? 'open' : ''}`} ref={menuRef}>
      <div className="menu-header">
        <img src={getIconPath('Close big', 'lightgray')} alt="Закрыть" className="close-menu theme-icon" onClick={onClose} />
      </div>
      <div className="menu-content">
        {/* ARTIST */}
        <div className="filter-block">
          <div className="filter-block-header" onClick={() => toggleBlock('artist')}>
            <h2 className="filter-block-title">ARTIST</h2>
            <img 
              src={openBlocks.artist ? '/assets/icons/Minus small_lightgray.svg' : getIconPath('Plus small', 'lightgray')}
              alt="Открыть" 
              className="filter-plus theme-icon"
            />
          </div>
          <div className={`filter-block-submenu ${openBlocks.artist ? 'open' : ''}`}>
            <div className="filter-input-wrapper">
              <select
                className="filter-input"
                value={localFilters.artist || ''}
                onChange={(e) => handleFilterChange('artist', e.target.value)}
              >
                <option value="">All artists</option>
                {artists.map(artist => (
                  <option key={artist} value={artist}>{artist}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* LOCATION */}
        <div className="filter-block">
          <div className="filter-block-header" onClick={() => toggleBlock('location')}>
            <h2 className="filter-block-title">LOCATION</h2>
            <img 
              src={openBlocks.location ? '/assets/icons/Minus small_lightgray.svg' : getIconPath('Plus small', 'lightgray')}
              alt="Открыть" 
              className="filter-plus theme-icon"
            />
          </div>
          <div className={`filter-block-submenu ${openBlocks.location ? 'open' : ''}`}>
            <div className="filter-input-wrapper">
              <select
                className="filter-input"
                value={localFilters.location || ''}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <option value="">All locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* YEARS */}
        <div className="filter-block">
          <div className="filter-block-header" onClick={() => toggleBlock('years')}>
            <h2 className="filter-block-title">YEARS</h2>
            <img 
              src={openBlocks.years ? '/assets/icons/Minus big_lightgray.svg' : getIconPath('Plus small', 'lightgray')}
              alt="Открыть" 
              className="filter-plus theme-icon"
            />
          </div>
          <div className={`filter-block-submenu ${openBlocks.years ? 'open' : ''}`}>
            <div className="filter-years-wrapper">
              <select
                className="filter-input-years"
                value={localFilters.yearFrom || ''}
                onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
              >
                <option value="">From</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <select
                className="filter-input-years"
                value={localFilters.yearTo || ''}
                onChange={(e) => handleFilterChange('yearTo', e.target.value)}
              >
                <option value="">To</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="filter-actions">
          <div className="filter-action-show" onClick={handleSubmit}>SHOW THE RESULTS</div>
          <div className="filter-action-clear" onClick={handleClear}>CLEAR</div>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;