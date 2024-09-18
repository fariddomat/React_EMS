import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="header fixed-top">
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope">
              <a href="mailto:contact@example.com">contact@example.com</a>
            </i>
            <i className="bi bi-phone ms-4"><span>+1 5589 55488 55</span></i>
          </div>
        </div>
      </div>

      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            <h1 className="sitename">Your Website</h1>
          </Link>
          <nav className="navmenu">
            <ul>
              <li><Link to="/" className="active">Home</Link></li>
              <li><Link to="/companies">Companies</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
