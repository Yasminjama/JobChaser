// Header 
// Navigationskomponent som visas på alla sidor
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuthStore } from '../stores/authStore';
import { useFilterStore } from '../stores/filterStore'; // för att visa aktiva filter i headern

function Header() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  // Kolla om användaren är inloggad
  // Hämtar isAuthenticated och logout action från authStore
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout(); // Ta bort token
    navigate('/signin'); // Navigera till inloggningssidan
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
        
        <nav className="nav">
          {/* Visar antal aktiva filter om något filter är aktivt */}
          <Link to="/jobs">
            Jobb {activeFilters > 0 && <span className="filter-badge">({activeFilters})</span>}
          </Link>
          
          {isAuthenticated ? (
            // Inloggad - visa Logga ut
            <button onClick={handleLogout} className="logout-btn">
              Logga ut
            </button>
          ) : (
            // Ej inloggad - visa Registrera och Logga in
            <>
              <Link to="/signup">Registrera</Link>
              <Link to="/signin">Logga in</Link>
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