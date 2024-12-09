import React from 'react';
import { useTheme } from './index';

const ThemeToggleButton: React.FC = () => {
  const { toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>Toggle Theme</button>;
};

export default ThemeToggleButton;
