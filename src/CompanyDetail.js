import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from './api';  // Axios instance for API calls
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const CompanyDetail = () => {
  const { id } = useParams();  // Get the company ID from the URL
  const [company, setCompany] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch company details and related events when the component mounts
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const companyResponse = await api.get(`/companies/${id}`);  // Fetch company by ID
        setCompany(companyResponse.data);

        const eventsResponse = await api.get(`/companies/${id}/events`);  // Fetch related events by company ID
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

      <div className="container">
        <div className="card mb-3">
        <div className="card-body">
              <h3 className="card-title">{company.name}</h3>
              <h5 className="card-subtitle mb-2 text-muted">{company.type === 'person' ? 'Person' : 'Website'}</h5>
              <p className="card-text">
                <strong>Roles:</strong> {company.roles}
              </p>
              <p className="card-text">
                <strong>Description:</strong> {company.description}
              </p>
        </div>
        </div>
        {/* Display company images */}
        <div className="row">
          {Array.isArray(company.images) && company.images && company.images.length > 0 ? (
            company.images.map((image, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <img
                  src={`http://127.0.0.1:8000${image}`}  // Adjust based on your API's image URL
                  className="img-fluid"
                  alt={`Image ${index + 1}`}
                />
              </div>
            ))
          ) : (
            <div>No images available</div>
          )}
        </div>

        {/* List of related events */}
        <h3 className="mt-4">Related Events</h3>
        <ul className="list-group">
          {events.length > 0 ? (
            events.map((event) => (
              <li key={event.id} className="list-group-item">
                 <Link to={`/events/${event.id}`} className="btn btn-primary">
                 {event.name}
                  </Link>  {/* Link to event detail page */}
                <p>{event.description}</p>
              </li>
            ))
          ) : (
            <div>No events found</div>
          )}
        </ul>
      </div>
    </section>
  );
};

export default CompanyDetail;
