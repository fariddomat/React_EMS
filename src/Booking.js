import React, { useEffect, useState } from 'react';
import { Button, Card, Badge, Alert } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import api from './api'; // Axios instance for API calls

const Booking = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    AOS.init();

    // Fetch user bookings
    api.get('/user-bookings')
      .then((response) => {
        setUserBookings(response.data);
        setLoading(false);

        // Initialize countdowns for each booking
        response.data.forEach((booking) => {
          const eventDate = new Date(booking.booking_date);
          calculateCountdown(booking.id, eventDate);
        });
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
        setError('Error fetching bookings');
        setLoading(false);
      });

    // Cleanup countdown intervals on unmount
    return () => {
      Object.keys(countdowns).forEach((bookingId) => {
        clearInterval(countdowns[bookingId]?.interval);
      });
    };
  }, []);

  const calculateCountdown = (bookingId, eventDate) => {
    const targetDate = eventDate.getTime();

    if (targetDate > new Date().getTime()) {
      const interval = setInterval(() => {
        const current = new Date().getTime();
        const distance = targetDate - current;

        if (distance <= 0) {
          clearInterval(interval);
          setCountdowns(prevState => ({
            ...prevState,
            [bookingId]: { days: 0, hours: 0, minutes: 0, seconds: 0 }
          }));
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdowns(prevState => ({
          ...prevState,
          [bookingId]: { days, hours, minutes, seconds, interval }
        }));
      }, 1000);
    }
  };

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
      .then(() => {
        alert('Booking cancelled successfully.');
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
                    bg={booking.status === 'confirmed' ? 'success' : (booking.status === 'cancelled' ? 'danger' : 'warning')}
                    className="ms-2"
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </Card.Text>

                {/* Show countdown if booking is confirmed */}
                {booking.status === 'confirmed' && countdowns[booking.id] && (
                  <div className='hero'>
                  <div className="countdown mt-3">
                    <h5>Event Countdown:</h5>
                    <div className="d-flex justify-content-around" style={{ width:'100%' }}>
                      <div><h3>{countdowns[booking.id].days}</h3> <h4>Days</h4></div>
                      <div><h3>{countdowns[booking.id].hours}</h3> <h4>Hours</h4></div>
                      <div><h3>{countdowns[booking.id].minutes}</h3> <h4>Minutes</h4></div>
                      <div><h3>{countdowns[booking.id].seconds}</h3> <h4>Seconds</h4></div>
                    </div>
                  </div>
                  </div>
                )}

                {booking.status !== 'confirmed' && booking.status !== 'cancelled' && (
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
