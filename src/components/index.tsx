import  { createContext, useContext } from 'react';

// Define the context and its types
type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
