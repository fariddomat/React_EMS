import React, { useEffect, useState } from 'react';
import api from './api';  // Axios instance for API calls
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from the API when the component mounts
  useEffect(() => {
    AOS.init();

    api.get('/events')  // Replace with your API endpoint
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching events');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container">Loading events...</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  return (
    <section id="events" className="events section mt-5">
      <div className="container section-title" data-aos="fade-up">
        <span>Events</span>
        <h2>Our Events</h2>
        <p>Explore the latest events we offer.</p>
      </div>

      <div className="container">
        <div className="row">
          {events.map((event, index) => (
            <div key={event.id} className="col-lg-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay={`${(index + 1) * 100}`}>
              <div className="event-box">
                <img
                  src={event.images && event.images.length > 0
                    ? `http://127.0.0.1:8000${event.images[0]}`  // Adjust based on your API's image URL
                    : '/assets/img/event-placeholder.jpg'}  // Placeholder image
                  className="img-fluid"
                  alt={event.name}
                />
                <div className="event-content">
                  <h4>{event.name}</h4>
                  <p>{event.description}</p>
                  {/* Link to the event's details page */}
                  <Link to={`/events/${event.id}`} className="btn btn-primary">
                    View Event Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
