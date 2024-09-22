import React, { useState, useEffect } from 'react';
import api from './api'; // Axios instance for making API calls
import 'bootstrap/dist/css/bootstrap.min.css';

const UserPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the user's payments
    api.get('/user-payments', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,  // Add user token for authentication
      },
    })
      .then((response) => {
        setPayments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching payments');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section id="pricing" className="pricing section mt-5">
      <div className="container section-title">
        <span>Payment</span>
        <h2>Your Payments</h2>
      </div>
    <div className="container">
        
      <div className="row justify-content-center">
        {payments.length ? (
          payments.map((payment) => (
            <div className="col-md-6 mb-4" key={payment.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{payment.event.name}</h5>
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <th scope="row">Amount</th>
                        <td>${payment.amount}</td>
                      </tr>
                      <tr>
                        <th scope="row">Status</th>
                        <td>
                          <span className={`badge ${payment.status === 'paid' ? 'bg-success' : 'bg-warning'}`}>
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Date</th>
                        <td>{new Date(payment.created_at).toLocaleDateString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No payments found.</p>
        )}
      </div>
    </div>
    </section>
  );
};

export default UserPayments;
