import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Companies from './Companies';
import Events from './Events';
import About from './About';
import ContactUs from './ContactUs';
import Navbar from './Navbar';
import Footer from './Footer';
import EventDetails from './EventDetails';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';

import UserPayments from './UserPayments';  // Import your new component
import PackageList from './PackageList';
import Booking from './Booking';
import '@fortawesome/fontawesome-free/css/all.min.css';
import BookingPage from './BookingPage';
import ProfileUpdate from './ProfileUpdate ';
import CompanyDetail from './CompanyDetail';
import Notifications from './Notifications ';
import BlogList from './BlogList';
import BlogDetails from './BlogDetails';
import Favorite from './Favorite';
import Cart from './Cart';
import Checkout from './Checkout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} /> {/* Pass logout function */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/packageList" element={<PackageList />} />
        <Route path="/book-package/:packageId" element={<BookingPage />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:id" element={<CompanyDetail />} />  {/* Dynamic route for company details */}
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/bookings" element={<Booking />} />
        <Route path="/payments" element={<UserPayments />} />
        <Route path="/profile" element={<ProfileUpdate />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />  {/* Dynamic route for company details */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
       
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
