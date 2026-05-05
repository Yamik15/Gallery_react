import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const FilterMenu = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [openBlocks, setOpenBlocks] = useState({});
  const menuRef = useRef(null);

  const getIconPath = (baseName, suffix) => {
    const themeSuffix = theme === 'light' ? 'lightgray' : 'darkgray';
    return `/assets/icons/${baseName}_${themeSuffix}.svg`;
  };

  const toggleBlock = (blockName) => {
    setOpenBlocks(prev => ({ ...prev, [blockName]: !prev[blockName] }));
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
        <img 
          src={getIconPath('Close big', 'lightgray')} 
          alt="Закрыть" 
          className="close-menu theme-icon"
          onClick={onClose}
        />
      </div>
      
      <div className="menu-content">
        {/* ARTIST блок */}
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
              <input type="text" className="filter-input" placeholder="Select the artist" />
              <img src="/assets/icons/Arrow down_darkgray.svg" alt="Стрелка" className="filter-input-icon" />
            </div>
          </div>
        </div>

        {/* LOCATION блок */}
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
              <input type="text" className="filter-input" placeholder="Select the location" />
              <img src="/assets/icons/Arrow down_darkgray.svg" alt="Стрелка" className="filter-input-icon" />
            </div>
          </div>
        </div>

        {/* YEARS блок */}
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
              <input type="text" className="filter-input-years" placeholder="From" />
              <img src="/assets/icons/Minus big_lightgray.svg" alt="Минус" className="filter-years-minus theme-icon" />
              <input type="text" className="filter-input-years" placeholder="To" />
            </div>
          </div>
        </div>

        <div className="filter-actions">
          <div className="filter-action-show">SHOW THE RESULTS</div>
          <div className="filter-action-clear">CLEAR</div>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;