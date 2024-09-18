import React, { useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    try {
      await api.post('/register', { name, email, password });
      navigate('/login');  // Redirect to login after successful registration
    } catch (err) {
      setError('Error creating account. Please try again.');
    }
  };

  return (
    <section className="team section mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f7f9fc' }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '10px' }}>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#333' }}>Register</h2>

          <div className="form-group mb-3">
            <label htmlFor="name" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your username"
              style={{ padding: '10px', borderRadius: '5px' }}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              style={{ padding: '10px', borderRadius: '5px' }}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              style={{ padding: '10px', borderRadius: '5px' }}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="passwordConfirmation" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              placeholder="Confirm your password"
              style={{ padding: '10px', borderRadius: '5px' }}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-4" style={{ padding: '10px', borderRadius: '5px', fontWeight: 'bold' }}>
            Create Account
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
