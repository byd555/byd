import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Models', to: '/models' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact us', to: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="nav">
      <div className="nav__bar container">
        <Link to="/" className="nav__brand">Byd canada</Link>

        {/* Links (Changes class when open) */}
        <nav className={`nav__links ${isOpen ? 'nav__links--open' : ''}`}>
          {NAV_LINKS.map((item) => (
            <Link 
              key={item.label} 
              to={item.to} 
              className={`nav__link ${location.pathname === item.to ? 'nav__link--active' : ''}`}
              onClick={() => setIsOpen(false)} // Close menu on click
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          className={`nav__toggle ${isOpen ? 'nav__toggle--open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="hamburger"></span>
        </button>
      </div>
    </header>
  );
}