import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import api from './api';  // Axios instance for API calls
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch companies from the API when the component mounts
  useEffect(() => {
    AOS.init();
    
    api.get('/companies')
      .then((response) => {
        setCompanies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching companies');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container">Loading companies...</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  return (
    <section id="team" className="team section mt-5">
      <div className="container section-title" data-aos="fade-up">
        <span>Our Companies</span>
        <h2>Companies</h2>
        <p>Explore the companies we work with</p>
      </div>

      <div className="container">
        <div className="row">
          {companies.map((company, index) => (
            <div key={company.id} className="col-lg-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay={`${(index + 1) * 100}`}>
              <div className="member">
              {company.cover ? (
                  <img
                    src={`http://127.0.0.1:8000${company.cover}`}
                    className="img-fluid"
                    alt={company.name}
                  />):(
                    <img
                    src='./img/services.jpg'
                    className="img-fluid"
                    alt={company.name}
                    />
                  )}
                <div className="member-content">
                  <h4>{company.name}</h4>
                  <span>{company.roles}</span>
                  <p>{company.description}</p>
                  <div className="social">
                    <a href="#"><i className="bi bi-twitter"></i></a>
                    <a href="#"><i className="bi bi-facebook"></i></a>
                    <a href="#"><i className="bi bi-instagram"></i></a>
                    <a href="#"><i className="bi bi-linkedin"></i></a>
                  </div>
                  {/* Link to the company detail page */}
                  <Link to={`/companies/${company.id}`} className="btn btn-primary mt-3">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;
