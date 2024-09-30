import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from './api'; // Axios instance for API calls
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap'; // Bootstrap Carousel component
import { Link } from 'react-router-dom';
import './CompanyDetail.css'; // Import custom CSS for positioning

const CompanyDetail = () => {
  const { id } = useParams(); // Get the company ID from the URL
  const [company, setCompany] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch company details and related events when the component mounts
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const companyResponse = await api.get(`/companies/${id}`); // Fetch company by ID
        const companyData = companyResponse.data;

        // Parse the video string into an array if it's a JSON string
        if (typeof companyData.videos === 'string') {
          companyData.videos = JSON.parse(companyData.videos.replace(/\\/g, '')); // Correctly parse and fix slashes
        }

        setCompany(companyResponse.data);

        const eventsResponse = await api.get(`/companies/${id}/events`); // Fetch related events by company ID
        setEvents(eventsResponse.data);

        setLoading(false);
      } catch (error) {
        setError('Error fetching company details');
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  if (loading) {
    return <div className="container">Loading company details...</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  return (
    <section id="team" className="team section mt-5">
      <div className="container section-title" data-aos="fade-up">
        <span>Our Companies</span>
        <h2>Company</h2>
        <p>Explore the companies we work with</p>
      </div>

      <div className="container ">
        <div className='row'>
          {/* Carousel with images and videos */}
          <div className='col-md-6'>
            <div className="carousel-container">
              <Carousel interval={3000}> {/* Automatically swipe every 3 seconds */}
                {/* Display company images */}
                {Array.isArray(company.images) &&
                  company.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src={`http://127.0.0.1:8000${image}`} // Adjust based on your API's image URL
                        alt={`Slide ${index + 1}`}
                      />
                    </Carousel.Item>
                  ))}

              </Carousel>
              <div style={{ paddingTop:'25px' }}> {/* Automatically swipe every 3 seconds */}

                {/* Display company videos */}
                {Array.isArray(company.videos) &&
                  company.videos.map((video, index) => (
                      <video className="d-block w-100" controls>
                        <source
                          src={`http://127.0.0.1:8000/${video}`} // Adjust based on your API's video URL
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                  ))}
              </div>
            </div>

          </div>

          <div className='col-md-6'>
            {/* Company details */}
            <div className="">
              <div className="card mb-3">
                <div className="card-body">
                  <h3 className="card-title">{company.name}</h3>
                  <h5 className="card-subtitle mb-2 text-muted">
                    {company.type === 'person' ? 'Person' : 'Website'}
                  </h5>
                  <p className="card-text">
                    <strong>Roles:</strong> {company.roles}
                  </p>
                  <p className="card-text">
                    <strong>Description:</strong> {company.description}
                  </p>
                </div>
              </div>

              {/* List of related events */}
              <h3 className="mt-4">Related Services</h3>
              <ul className="list-group">
                {events.length > 0 ? (
                  events.map((event) => (
                    <li key={event.id} className="list-group-item">
                      <Link to={`/events/${event.id}`} className="btn btn-primary">
                        {event.name}
                      </Link>{' '}
                      {/* Link to event detail page */}
                      <p>{event.description}</p>
                    </li>
                  ))
                ) : (
                  <div>No events found</div>
                )}
              </ul>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CompanyDetail;
