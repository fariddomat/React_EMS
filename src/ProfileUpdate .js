import React, { useState, useEffect } from 'react';
import api from './api';  // Axios instance for API calls
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProfileUpdate = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    AOS.init(); // Initialize AOS

    // Fetch current user details
    api.get('/user')
      .then(response => {
        setUserData({
          name: response.data.name,
          email: response.data.email,
          password: '', // Leave password empty by default
        });
      })
      .catch(() => {
        setError('Error fetching user data');
      });
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update user data
    api.put('/user', userData)
      .then(response => {
        setSuccess('Profile updated successfully');
        setError('');
      })
      .catch(() => {
        setError('Error updating profile');
        setSuccess('');
      });
  };

  return (
    <section id="profile" className="profile section mt-5">
      <div className="container section-title" data-aos="fade-up">
        <span>Profile</span>
        <h2>Update Profile</h2>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="card-title mb-4">Update Your Profile</h4>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={userData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={userData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Leave blank to keep the current password"
                      value={userData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">Update Profile</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileUpdate;
