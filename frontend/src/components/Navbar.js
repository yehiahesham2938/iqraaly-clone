import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="Navbar">
      <h2 className="logo">Iqraaly</h2>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Library</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;