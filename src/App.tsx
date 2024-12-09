import React, { useState } from 'react';
import './App.css';
import { ThemeProvider } from './components/theme';
import Header from './components/d';
import ThemeToggleButton from './components/button';

function App() {
    

    return (
        <ThemeProvider>
      <Header />
      <ThemeToggleButton />
    </ThemeProvider>
    );
}

export default App;
