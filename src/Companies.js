import React, { useEffect, useState } from 'react';
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
    
    api.get('/companies')  // Replace with the correct API endpoint
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
    <section id="team" className="team section mt-5" >
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
                {/* Display the first image from the images array, or a placeholder if none */}
                <img
                  src={company.images && company.images.length > 0
                    ? `http://127.0.0.1:8000${company.images[0]}`  // Adjust based on your API's image URL
                    : '/assets/img/team/placeholder.jpg'}  // Placeholder image
                  className="img-fluid"
                  alt={company.name}
                />
                <div className="member-content">
                  <h4>{company.name}</h4>
                  <span>{company.roles}</span>
                  <p>{company.description}</p>
                  <div className="social">
                    {/* Example static social media links */}
                    <a href="#"><i className="bi bi-twitter"></i></a>
                    <a href="#"><i className="bi bi-facebook"></i></a>
                    <a href="#"><i className="bi bi-instagram"></i></a>
                    <a href="#"><i className="bi bi-linkedin"></i></a>
                  </div>
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
