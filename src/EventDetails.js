import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from './api';  // Axios instance for API calls
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';  // Import Swiper CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const EventDetails = () => {
  const { id } = useParams();  // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/events/${id}`)  // Fetch event details using the ID
      .then((response) => {
        setEvent(response.data);
        setLoading(false);

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
              <li className="current">Event Details</li>
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
            <div className="col-lg-8" style={{overflow:'hidden'}}>
              <div className="portfolio-details-slider swiper-container">
                <div className="swiper-wrapper align-items-center">
                  {/* Display Images */}
                  {event.images && event.images.length > 0 && event.images.map((image, index) => (
                    <div key={index} className="swiper-slide">
                      <img src={`http://127.0.0.1:8000${image}`} alt={`Event Image ${index + 1}`} />
                    </div>
                  ))}
                  
                  {/* Display Videos */}
                  {event.videos && event.videos.length > 0 && event.videos.map((video, index) => (
                    <div key={index} className="swiper-slide">
                      <video controls>
                        <source src={`http://127.0.0.1:8000${video}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ))}

                  {/* Show a placeholder if no images/videos are available */}
                  {(!event.images || event.images.length === 0) && (!event.videos || event.videos.length === 0) && (
                    <div className="swiper-slide">
                      <img src="/assets/img/event-placeholder.jpg" alt="No images or videos available" />
                    </div>
                  )}
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>

            {/* Event Information */}
            <div className="col-lg-4">
              <div className="portfolio-info" data-aos="fade-up" data-aos-delay="200">
                <h3>Event Information</h3>
                <ul>
                  <li><strong>Event Name</strong>: {event.name}</li>
                  <li><strong>Company Name</strong>: {event.company && event.company.name}</li> {/* Assuming event.company is included in the API response */}
                  <li><strong>Price</strong>: {event.price}</li>
                  <li><strong>Date</strong>: {new Date(event.created_at).toLocaleDateString()}</li>
                </ul>
              </div>
              <div className="portfolio-description" data-aos="fade-up" data-aos-delay="300">
                <h2>{event.name}</h2>
                <p>{event.description}</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default EventDetails;
