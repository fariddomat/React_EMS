import React, { useEffect, useState } from 'react';
import api from './api';  // Axios instance for API calls
import { Link } from 'react-router-dom';  // Use Link for navigation to the booking page
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PackageList = () => {
  const [packagesList, setPackagesList] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init(); // Initialize AOS

    // Fetch packages
    api.get('/packages')
      .then((response) => {
        setPackagesList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching packages');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section id="pricing" className="pricing section mt-5">
      <div className="container section-title">
        <span>Pricing</span>
        <h2>Pricing</h2>
        <p>Check our available packages</p>
      </div>
      <div className="container">
        <div className="row g-4 g-lg-0">
          {packagesList.map((pkg) => (
            <div className="col-lg-4" key={pkg.id}>
              <div className="pricing-item">
                <h3>{pkg.name}</h3>
                <h4>
                  <sup>$</sup>{pkg.price}
                </h4>
                <ul>
                  <li>
                    <i className="bi bi-check"></i>
                    <span>{pkg.description}</span>
                  </li>
                  {/* Add other details as needed */}
                </ul>
                <div className="text-center">
                  {/* Use Link to navigate to the booking page, passing package info */}
                  <Link to={`/book-package/${pkg.id}`} className="buy-btn">Book Now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackageList;
