import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api';  // Axios instance for API calls
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';  // Use Link for navigation to the booking page

const BookingPage = () => {
  const { packageId } = useParams(); // Get the package ID from the URL
  const [bookingDate, setBookingDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [packageDetails, setPackageDetails] = useState(null); // To hold package details
  const [events, setEvents] = useState([]); // To hold associated events
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init(); // Initialize AOS

    // Fetch package details and events associated with the package
    api.get(`/packages/${packageId}`)
      .then((response) => {
        setPackageDetails(response.data);
        setEvents(response.data.events);
      })
      .catch((error) => {
        setError('Error fetching package details');
      });
  }, [packageId]);

  const handleBooking = () => {
    if (!bookingDate) {
      setError('Please select a date');
      return;
    }

    // Make the booking request
    api.post('/book-package', {
      package_id: packageId,
      booking_date: bookingDate
    }).then(() => {
      setSuccess(true);
      setTimeout(() => navigate('/bookings'), 2000); // Navigate to bookings page after success
    }).catch(() => {
      setError('Error making the booking');
    });
  };

  

  return (
    <section id="bookings" className="bookings section mt-5">
      <div className="container section-title" data-aos="fade-up">
        <span>Bookings</span>
        <h2>Book a Package</h2>
        <p>Book your desired package and explore its events.</p>
      </div>

      <div className="container">
        {packageDetails ? (
          <div className="card mb-5 shadow-sm">
            <div className="card-body">
              <h3 className="card-title">{packageDetails.name}</h3>
              <h4 className="card-text">
                <strong>Price: </strong>${packageDetails.price}
              </h4>
              <p className="card-text"><strong>Description: </strong>{packageDetails.description}</p>
              <p className="card-text"><strong>Deadline: </strong>{new Date(packageDetails.deadline).toLocaleDateString()}</p>
            </div>
          </div>
        ) : (
          <div>Loading package details...</div>
        )}

        <h4>Events Associated with this Package</h4>
        <div className="row">
          {events.length > 0 ? (
            events.map((event) => (
              <div className="col-md-6 mb-4" key={event.id}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{event.name}</h5>
                    <p className="card-text"><strong>Date: </strong>{new Date(event.date).toLocaleDateString()}</p>
                    <p className="card-text"><strong>Location: </strong>{event.location}</p>
                    <Link to={`/events/${event.id}`} className="btn btn-outline-primary">
                      View Event Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No events available for this package.</p>
          )}
        </div>

        <div className="mt-4">
          {success ? (
            <div className="alert alert-success">Booking successful! Redirecting...</div>
          ) : (
            <>
              <label htmlFor="bookingDate" className="form-label">Select a date for your booking</label>
              <input
                type="datetime-local"
                id="bookingDate"
                className="form-control"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
              />
              {error && <div className="alert alert-danger mt-3">{error}</div>}
              <button className="btn btn-primary mt-3" onClick={handleBooking}>Confirm Booking</button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingPage;
