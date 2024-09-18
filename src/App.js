import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // Your Home component
import Companies from './Companies'; // A new Companies component
import Events from './Events'; // A new Events component
import About from './About'; // A new About component
import ContactUs from './ContactUs'; // A new ContactUs component
import Navbar from './Navbar'; // Navbar component
import Footer from './Footer'; // Footer component
import EventDetails from './EventDetails';  // Import EventDetails component

import Login from './Login';  // Login component
import Register from './Register';  // Register component
import Dashboard from './Dashboard';  // Sample dashboard page
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />  {/* The Navbar will always be visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    }
  />

        <Route path="/companies" element={<Companies />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />  {/* Route for each event */}
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
