import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Player from './components/Player/player';
import MiniPlayer from './components/MiniPlayer/MiniPlayer';
import AudioInfo from './components/AudioInfo/AudioInfo';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import AboutUs from './pages/AboutUs';
import Books from './pages/Books';
import Categories from './pages/Categories';
import BookDetails from './pages/BookDetails';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Subscription from './pages/Subscription';

import './App.css';

  
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
  
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  return (
    <AudioPlayerProvider>
      <div dir="rtl" className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <Navbar 
          isAuthenticated={isAuthenticated}
          user={user}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          handleLogout={handleLogout}
        />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Player />
      </div>
    </AudioPlayerProvider>
  );
}

export default App;