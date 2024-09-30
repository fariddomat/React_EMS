import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from './api';  // Axios instance for API calls
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';  // Import Swiper CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';  // Import date formatting library
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Heart icons

const EventDetails = () => {
  const { id } = useParams();  // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false); // Track favorite status
  const [selectedDate, setSelectedDate] = useState(''); // State for selected booking date
  const [showBookingForm, setShowBookingForm] = useState(false); // Toggle booking form  
  const [suggestedEvents, setSuggestedEvents] = useState([]);  // New state for suggested events
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })  // Fetch event details using the ID
      .then((response) => {
        setEvent(response.data);
        setComments(response.data.comments);  // Set comments from response
        setIsFavorited(response.data.is_favorite); // Assuming API returns if event is favorited by the user
        setLoading(false);

        fetchSuggestedEvents();
        // Initialize Swiper for the event images/videos
        new Swiper('.swiper-container', {
          loop: true,
          autoplay: {
            delay: 5000,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        });
      })
      .catch((error) => {
        setError('Error fetching event details');
        setLoading(false);
      });
  }, [id]);

  const fetchSuggestedEvents = () => {
    api.get('/event-suggestions')  // Adjust the endpoint to match your backend
      .then((response) => {
        setSuggestedEvents(response.data.suggestions);
      })
      .catch((error) => {
        console.error('Error fetching suggested events:', error);
      });
  };

  // Toggle favorite status
  const toggleFavorite = async () => {
    if (!token) {
      navigate('/login');  // Redirect to login if not logged in
      return;
    }

    try {
      const response = await api.post(`/favorites`, {
        event_id: id,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsFavorited(!isFavorited);  // Toggle favorite state in the frontend
    } catch (err) {
      setError('Error toggling favorite.');
    }
  };
  // Add comment and rating
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate('/login');
      return;
    }
    // store comment
    try {
      const response = await api.post('/comments', {
        event_id: id,
        comment: newComment,
        rating,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setComments([...comments, response.data]);
      setNewComment('');
      setRating(5);
    } catch (err) {
      setError('Error submitting comment.');
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (err) {
      setError('Error deleting comment.');
    }
  };

  // Handle booking with date
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await api.post('/bookings', {
        event_id: id,
        booking_date: selectedDate,  // Pass selected booking date
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Booking successful');
    } catch (err) {
      setError('Error booking event.');
    }
  };

  // Show booking form when the user clicks the book button
  const handleShowBookingForm = () => {
    setShowBookingForm(true);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? '#FFD700' : '#e4e5e9' }}>★</span>  // Gold for filled stars, gray for unfilled
      );
    }
    return stars;
  };

  if (loading) {
    return <div className="container">Loading event details...</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  if (!event) {
    return <div className="container">No event found</div>;
  }

  return (
    <>
      {/* Page Title */}
      <div className="page-title dark-background" data-aos="fade">
        <div className="container">
          <nav className="breadcrumbs">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">Service Details</li>
            </ol>
          </nav>
          <h1>{event.name} Details</h1>
        </div>
      </div>

      {/* Event Details Section */}
      <section id="portfolio-details" className="portfolio-details section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">

            {/* Image/Video Slider */}
            {/* Image/Video Slider */}
            <div className="col-lg-8" style={{ overflow: 'hidden' }}>
              {Array.isArray(event.images) && event.images.length > 0  ? (
                // Swiper component when images or videos exist
                <div className="portfolio-details-slider swiper-container">
                  <div className="swiper-wrapper align-items-center">
                    {/* Display Images */}
                    {Array.isArray(event.images) && event.images.length > 0 && event.images.map((image, index) => (
                      <div key={index} className="swiper-slide">
                        <img src={`http://127.0.0.1:8000${image}`} alt={`Event Image ${index + 1}`} />
                      </div>
                    ))}

                    {/* Display Videos */}
                    {Array.isArray(event.videos) && event.videos.length > 0 && event.videos.map((video, index) => (
                      <div key={index} className="swiper-slide">
                        <video controls>
                          <source src={`http://127.0.0.1:8000${video}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ))}
                  </div>
                  <div className="swiper-pagination"></div>
                </div>
              ) : (
                // Placeholder image when no images or videos are available
                <div>

                  <img src='./../img/hero-bg.jpg' className="img-fluid" alt="Event placeholder" />
                </div>
              )}
            </div>



            {/* Event Information */}
            <div className="col-lg-4">
              <div className="portfolio-info" data-aos="fade-up" data-aos-delay="200">
                <h3>Service Information</h3>
                <ul>
                  <li><strong>Service Name</strong>: {event.name}</li>
                  <li><strong>Company Name</strong>: {event.company && event.company.name}</li> {/* Assuming event.company is included in the API response */}
                  <li><strong>Price</strong>: {event.price}</li>
                  <li><strong>Date</strong>: {new Date(event.created_at).toLocaleDateString()}</li>
                </ul>
                {/* Favorite Button */}
                <div className="favorite-button mt-4">
                  <button onClick={toggleFavorite} className="btn btn-link">
                    {isFavorited ? (
                      <FaHeart color="red" size={24} />
                    ) : (
                      <FaRegHeart color="gray" size={24} />
                    )}
                    <span className="ms-2">
                      {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
                    </span>
                  </button>
                </div>
              </div>
              <div className="portfolio-description" data-aos="fade-up" data-aos-delay="300">
                <h2>{event.name}</h2>
                <p>{event.description}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="event-details section">
        {error && <div className="alert alert-danger">{error}</div>}

        {token && (
          <section className="booking-form section">
            <div className="container">
              <h3>Select Booking Date</h3>
              <form onSubmit={handleBooking}>
                <div className="form-group mb-3">
                  <label htmlFor="bookingDate">Booking Date:</label>
                  <input
                    type="datetime-local"
                    id="bookingDate"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success">Confirm Booking</button>
              </form>
            </div>
          </section>
        )}

        {/* Event Information */}
        <div className="container">

          {/* Comment Form */}
          {token && (
            <div className="card my-4">
              <div className="card-body">
                <h4>Add Your Comment and Rating</h4>
                <form onSubmit={handleCommentSubmit}>
                  <div className="form-group mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Rating:</label>
                    <select
                      className="form-control"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      {[5, 4, 3, 2, 1].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          )}

          {/* Comments List */}
          <div className="comments">
            <h4>Comments</h4>
            {comments && comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.id} className="card my-3">
                  <div className="card-body">
                    <p><strong>{comment.user?.name || 'Anonymous'}</strong></p>
                    <p>{renderStars(comment.rating)}</p>  {/* Render rating as stars */}
                    <p>{comment.comment}</p>
                    <p><small>Posted on {format(new Date(comment.created_at), 'MMMM dd, yyyy HH:mm')}</small></p>  {/* Format and show comment date */}
                    {comment.user_id === event.auth_user_id && (
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      </section>

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
                      <img src='./../img/hero-bg.jpg' className="img-fluid" alt="Event placeholder" />
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
          </div>
        )}
    </>
  );
};

export default EventDetails;
