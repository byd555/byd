import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        {/* Top Grid: Columns */}
        <div className="footer__grid">
          <div className="footer__col">
            <span className="footer__heading">Services</span>
            <Link to="/services" className="footer__link">BYD Customer Care</Link>
          </div>
          
          <div className="footer__col">
            <span className="footer__heading">About BYD</span>
            <Link to="/about" className="footer__link">About BYD</Link>
          </div>
          
          <div className="footer__col">
            <span className="footer__heading">Contact</span>
            <Link to="/contact" className="footer__link">Visit Dealer</Link>
          </div>
          
          <div className="footer__col">
            <span className="footer__heading">Support</span>
            <Link to="/services" className="footer__link">Support Info</Link>
          </div>
        </div>

        {/* Bottom Strip: Legal & Social */}
        <div className="footer__bottom">
          <div className="footer__legal">
            <Link to="/privacy" className="footer__link">Privacy &amp; Legal</Link>
            <Link to="/cookies" className="footer__link">Cookies</Link>
            <Link to="/privacy" className="footer__link">Data Privacy</Link>
          </div>
          
          <div className="footer__social">
            <span className="footer__social-label">FOLLOW US</span>
            
            {/* Facebook Icon */}
            <a href="#" aria-label="Facebook" className="footer__icon-link">
              <svg viewBox="0 0 24 24" fill="currentColor" className="footer__icon">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
              </svg>
            </a>
            
            {/* Instagram Icon */}
            <a href="#" aria-label="Instagram" className="footer__icon-link">
              <svg viewBox="0 0 24 24" fill="currentColor" className="footer__icon">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.64-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 2.77.27.27 2.77.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.28 2.7 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.28-.2 6.78-2.7 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.28-2.7-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm6.4-11.44a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
              </svg>
            </a>
            
            {/* X (Twitter) Icon */}
            <a href="#" aria-label="X" className="footer__icon-link">
              <svg viewBox="0 0 24 24" fill="currentColor" className="footer__icon">
                <path d="M18.9 2H22l-6.8 7.8L23 22h-6l-4.7-6.2L7 22H4l7.2-8.3L3.5 2h6.2l4.3 5.7zM7.4 4H5l11.6 15h2.4L7.4 4z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}