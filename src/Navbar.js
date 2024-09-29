import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import api from './api';  // Axios instance for API calls
const Navbar = ({ isLoggedIn, onLogout }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  useEffect(() => {
    if (isLoggedIn) {
      api.get('/notifications/count') // Replace with your actual API endpoint
        .then(response => {
          setNotificationCount(response.data.count); // Assuming the response has a 'count' field
        })
        .catch(error => {
          console.error("Error fetching notification count", error);
        });
    }
  }, [isLoggedIn]);
  return (
    <header className="header fixed-top" id='header'>
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope">
              <a href="mailto:contact@example.com">contact@ems.com</a>
            </i>
            <i className="bi bi-phone ms-4"><span>+1 5589 55488 55</span></i>
          </div>
        </div>
      </div>

      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <NavLink to="/" className="logo d-flex align-items-center">
            <h1 className="sitename">EMS</h1>
          </NavLink>
          <nav className="navmenu" id='navmenu'>
            <ul>
              <li>
                <NavLink to="/" activeClassName="active">Home</NavLink>
              </li>
              <li>
                <NavLink to="/companies" activeClassName="active">Companies</NavLink>
              </li>
              <li>
                <NavLink to="/events" activeClassName="active">Services</NavLink>
              </li>
              <li>
                <NavLink to="/packageList" activeClassName="active">Packages</NavLink>
              </li>
              <li>
                <NavLink to="/blogs" activeClassName="active">Blogs</NavLink>
              </li>
              <li>
                <NavLink to="/about" activeClassName="active">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact-us" activeClassName="active">Contact Us</NavLink>
              </li>
              {isLoggedIn ? (
                <li className="dropdown">
                  <a href="#">
                    <span>My Account</span>
                    <i className="bi bi-chevron-down toggle-dropdown"></i>
                    {notificationCount > 0 && (
                      <span className="badge bg-danger">{notificationCount}</span>
                    )}
                  </a>
                  <ul>
                    <li>
                      <NavLink to="/profile">Profile</NavLink>
                    </li>
                    <li>
                      <NavLink to="/notifications">Notifications</NavLink>
                    </li>
                    <li>
                      <NavLink to="/favorites">Favorites</NavLink>
                    </li>
                    <li className="dropdown">
                      <a href="#"><span>My Bookings</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                      <ul>
                        <li>
                          <NavLink to="/bookings">View Bookings</NavLink>
                        </li>
                        <li>
                          <NavLink to="/payments">View Payments</NavLink>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <NavLink to="/" onClick={onLogout}>Logout</NavLink>
                    </li>
                  </ul>
                </li>
              ) : (
                <li>
                  <NavLink to="/login" activeClassName="active">Login</NavLink>
                </li>
              )}
            </ul>
            <i id='mobile-nav-toggle' className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
