import React, { useEffect, useState } from 'react';
import api from './api';  // Axios instance for API calls
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [suggestedEvents, setSuggestedEvents] = useState([]);  // New state for suggested events
  const token = localStorage.getItem('token');
  // Fetch events and categories from the API
  useEffect(() => {
    fetchEvents(currentPage, searchQuery, selectedCategory);
    fetchCategories();
    fetchSuggestedEvents();
  }, [currentPage, searchQuery, selectedCategory]);

  const fetchEvents = (page, search, category) => {
    setLoading(true);
    api.get(`/events-page?page=${page}&search=${search}&category=${category}`)
      .then((response) => {
        setEvents(response.data.data);
        setTotalPages(response.data.last_page);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching events');
        setLoading(false);
      });
  };

  const fetchCategories = () => {
    api.get('/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  const fetchSuggestedEvents = () => {
    api.get('/event-suggestions')  // Adjust the endpoint to match your backend
      .then((response) => {
        setSuggestedEvents(response.data.suggestions);
      })
      .catch((error) => {
        console.error('Error fetching suggested events:', error);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (loading) {
    return <div className="container">Loading events...</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  return (
    <section id="events" className="events section mt-5">
      <div className="container section-title" data-aos="fade-up">
        <span>Services</span>
        <h2>Our Services</h2>
        <p>Explore the latest services we offer.</p>
      </div>

      <div className="container mb-4">
        {/* Search bar */}
        <input
          type="text"
          className="form-control"
          placeholder="Search services..."
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {/* Category filter */}
        <select className="form-select mt-3" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="container">
        <div className="row">
          {events.map((event, index) => (
            <div key={event.id} className="col-lg-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay={`${(index + 1) * 100}`}>
              <div className="event-box">
                {Array.isArray(event.images) && event.images.length > 0 ? (
                  <img
                    src={event.images.length > 0 ? `http://127.0.0.1:8000${event.images[0]}` : './img/hero-bg.jpg'}
                    className="img-fluid"
                    alt={event.name}
                  />
                ) : (
                  <img src='./img/hero-bg.jpg' className="img-fluid" alt="Event placeholder" />
                )}
                <div className="event-content">
                  <h4>{event.name}</h4>
                  <p>{event.description}</p>
                  <Link to={`/events/${event.id}`} className="btn btn-primary">
                    View Service Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="row">
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                    disabled={currentPage === index + 1}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Suggested Events Section */}
        {token && (
          <div className="container mt-5">
            <div className="section-title" data-aos="fade-up">
              <span>Suggested Services</span>
              <h2>Services You May Like</h2>
              <p>Based on your activity, we recommend the following services.</p>
            </div>
            <div className="row">
              {suggestedEvents.map((event, index) => (
                <div key={event.id} className="col-lg-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay={`${(index + 1) * 100}`}>
                  <div className="event-box">
                    {Array.isArray(event.images) && event.images.length > 0 ? (
                      <img
                        src={event.images.length > 0 ? `http://127.0.0.1:8000${event.images[0]}` : './img/hero-bg.jpg'}
                        className="img-fluid"
                        alt={event.name}
                      />
                    ) : (
                      <img src='./img/hero-bg.jpg' className="img-fluid" alt="Event placeholder" />
                    )}
                    <div className="event-content">
                      <h4>{event.name}</h4>
                      <p>{event.description}</p>
                      <Link to={`/events/${event.id}`} className="btn btn-primary">
                        View Event Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
