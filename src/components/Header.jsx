import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  const getIconSrc = () => {
    return theme === 'light' 
      ? '/assets/icons/Dark theme.svg'
      : '/assets/icons/Light theme.svg';
  };

  return (
    <header>
      <img 
        src={getIconSrc()} 
        alt="Светлая тема" 
        className="theme-toggle theme-icon"
        onClick={toggleTheme}
      />
    </header>
  );
};

export default Header;