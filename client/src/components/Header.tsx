// Header 
// Navigationskomponent som visas på alla sidor
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/jobs" className="logo">
          <h2>JobChaser</h2>
        </Link>
        
        <nav className="nav">
          <Link to="/jobs">Jobb</Link>
          <Link to="/signup">Registrera</Link>
          <Link to="/signin">Logga in</Link>
          
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;

//Iställer för a taggar så byter vi till link komponenter då sidan laddas snabbare. 