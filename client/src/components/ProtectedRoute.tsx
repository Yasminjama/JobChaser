// ProtectedRoute.tsx
// Skyddar sidor som kräver inloggning
// Om användaren inte är inloggad skickas de till /signin automatiskt
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode; // Pages som ska skyddas. 
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />; //skicka till inloggning om ej inloggad
  }

  return <>{children}</>; // visa sidan om inloggad
}

export default ProtectedRoute;