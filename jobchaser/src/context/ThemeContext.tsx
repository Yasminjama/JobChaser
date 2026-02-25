// ThemeContext - Global state för dark/light mode som kan användas överallt i appen
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Definiera vilka värden som finns i vår context
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Skapa contexten
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider-komponent som wrappar hela appen
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook för att använda theme i komponenter
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme måste användas inom ThemeProvider');
  }
  return context;
}