import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import AboutUs from './pages/AboutUs';
import Books from './pages/Books';
import Categories from './pages/Categories';
import BookDetails from './pages/BookDetails';
import NotFound from './pages/NotFound';
import reportWebVitals from './reportWebVitals';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<Categories />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();