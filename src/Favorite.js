import React, { useState, useEffect } from 'react';
import { Button, Card, Badge, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import api from './api'; // Axios instance for API calls

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init();

    // Fetch favorite events for the user
    api.get('/favorites')
      .then((response) => {
        setFavorites(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching favorites:', error);
        setError('Error fetching favorite events');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container">Loading favorites...</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  return (
    <section id="favorites" className="favorites section mt-5">
      <div className="container section-title" data-aos="fade-up">
        <span>Favorites</span>
        <h2>Your Favorite Events</h2>
      </div>
      <div className="container">
        {favorites.length ? (
          favorites.map(favorite => (
            <Card key={favorite.id} className="mb-3" data-aos="fade-up">
              <Card.Body>
                <Card.Title>{favorite.event.name}</Card.Title>
                
                <Link to={`/events/${favorite.event.id}`}>
                  <Button variant="primary">View Event</Button>
                </Link>
              </Card.Body>
            </Card>
          ))
        ) : (
          <Alert variant="info">No favorite events yet.</Alert>
        )}

        {error && <Alert variant="danger">{error}</Alert>}
      </div>
    </section>
  );
};

export default Favorite;
