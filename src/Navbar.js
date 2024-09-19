import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
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
          <NavLink to="/" className="logo d-flex align-items-center">
            <h1 className="sitename">Your Website</h1>
          </NavLink>
          <nav className="navmenu">
            <ul>
              <li>
                <NavLink to="/" activeClassName="active">Home</NavLink>
              </li>
              <li>
                <NavLink to="/companies" activeClassName="active">Companies</NavLink>
              </li>
              <li>
                <NavLink to="/events" activeClassName="active">Events</NavLink>
              </li>
              <li>
                <NavLink to="/about" activeClassName="active">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact-us" activeClassName="active">Contact Us</NavLink>
              </li>
              {isLoggedIn ? (
                <li>
                  <NavLink to="/login" onClick={onLogout}>Logout</NavLink>
                </li>
              ) : (
                <li>
                  <NavLink to="/login" activeClassName="active">Login</NavLink>
                </li>
              )}
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
