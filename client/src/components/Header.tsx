// Header 
// Navigationskomponent som visas på alla sidor
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuthStore } from '../stores/authStore';
import { useFilterStore } from '../stores/filterStore';

function Header() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // håller koll på om menyn är öppen

  // Hämtar isAuthenticated och logout action från authStore
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout(); // Rensar token och user
    navigate('/signin'); // Navigera till inloggningssidan
    setMenuOpen(false); // Stäng menyn efter utloggning
  };

  // Räkna antal aktiva filter från filterStore
  const { regionFilter, employmentType, requiresExperience, textFilter } = useFilterStore();
  const activeFilters = [regionFilter, employmentType, requiresExperience, textFilter]
    .filter(value => value !== '').length;
  
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/jobs" className="logo">
          <h2>JobChaser</h2>
        </Link>

        {/* Hamburger-knapp som visas bara på mobil */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Öppna meny"
        >
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
        </button>
        
        {/* Nav som får klassen open på mobil när menyn är öppen */}
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>

          {/* Visar antal aktiva filter om något filter är aktivt */}
          <Link to="/jobs" onClick={() => setMenuOpen(false)}>
            Jobb {activeFilters > 0 && <span className="filter-badge">({activeFilters})</span>}
          </Link>

          {/* Alltid synlig men ProtectedRoute hanterar redirect om ej inloggad */}
          <Link to="/my-applications" onClick={() => setMenuOpen(false)}>
            Mina ansökningar
          </Link>
          
          {isAuthenticated ? (
            // Inloggad --> visa Logga ut
            <button onClick={handleLogout} className="logout-btn">
              Logga ut
            </button>
          ) : (
            // Ej inloggad --> visa Registrera och Logga in
            <>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>Registrera</Link>
              <Link to="/signin" onClick={() => setMenuOpen(false)}>Logga in</Link>
            </>
          )}
          
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

// Istället för a taggar så byter vi till link komponenter då sidan laddas snabbare.