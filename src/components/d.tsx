import React from 'react';
import { useTheme } from './index';

const Header: React.FC = () => {
  const { theme } = useTheme();

  return (
    <header style={{ padding: '10px', backgroundColor: theme === 'light' ? '#eee' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <h1>Theme is: {theme}</h1>
    </header>
  );
};

export default Header;
