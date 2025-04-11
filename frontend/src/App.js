import React, { useState } from 'react';
import Navbar from './components/Navbar.js';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="main-heading">Welcome to iqraaly clone</div>
    </div>
  );
}

export default App;