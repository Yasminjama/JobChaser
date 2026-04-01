// App.tsx - Router setup som hanterar navigation mellan sidor
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import JobsPage from './pages/JobsPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import MyApplicationsPage from './pages/MyApplicationsPage.tsx'; 
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

// Inre komponent som använder theme
function AppContent() {
  const { theme } = useTheme();
  
  // Applicera tema på body elementet
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  
  // BrowserRouter AKTIVERAR routing i hela appen.
  // "/" redirectar till /jobs.
  return (
    <BrowserRouter> 
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/jobs" replace />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute> 
              <MyApplicationsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
