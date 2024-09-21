import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Badge, Alert } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import api from './api';  // Axios instance for API calls

const Booking = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init();

    // Fetch user bookings
    api.get('/user-bookings')
      .then((response) => {
        setUserBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);  // Log the error
        setError('Error fetching bookings');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container">Loading bookings...</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  // Handle cancel booking
  const handleCancelBooking = (bookingId) => {
    api.post(`/bookings/${bookingId}/cancel`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Pass user token for authentication
      },
    })
      .then((response) => {
        alert('Booking cancelled successfully.');
        // Update the local state to reflect the cancellation
        setUserBookings(userBookings.map(booking => 
          booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
        ));
      })
      .catch(() => setError('Error cancelling booking'));
  };

  return (
    <section id="bookings" className="bookings section mt-5">
      <div className="container section-title" data-aos="fade-up">
        <span>Bookings</span>
        <h2>Your Bookings</h2>
      </div>
      <div className="container">
        {userBookings.length ? (
          userBookings.map(booking => (
            <Card key={booking.id} className="mb-3" data-aos="fade-up">
              <Card.Body>
                <Card.Title>{booking.event.name}</Card.Title>
                <Card.Text>
                  <strong>Booking Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}<br />
                  <strong>Status:</strong> 
                  <Badge 
                    bg={booking.status === 'approved' ? 'success' : (booking.status === 'cancelled' ? 'danger' : 'warning')}
                    className="ms-2"
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </Card.Text>
                {booking.status !== 'approved' && booking.status !== 'cancelled' && (
                  <Button variant="danger" onClick={() => handleCancelBooking(booking.id)}>
                    Cancel Booking
                  </Button>
                )}
              </Card.Body>
            </Card>
          ))
        ) : (
          <Alert variant="info">No bookings made yet.</Alert>
        )}

        {error && <Alert variant="danger">{error}</Alert>}
      </div>
    </section>
  );
};

export default Booking;
