import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api';  // Axios instance for API calls
import 'bootstrap/dist/css/bootstrap.min.css';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch cart items from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const handlePlaceOrder = async () => {
    if (!cartItems.length) {
      alert('Cart is empty!');
      return;
    }

    setIsLoading(true);
    
    try {
      const bookings = cartItems.map(item => ({
        event_id: item.event_id,
        booking_date: item.selectedDate,
        details: item.details || 'No details provided',  // Add details if needed
      }));

      // Send the bookings to the API for checkout
      const response = await api.post('/checkout', { bookings });
      
      if (response.status === 200) {
        alert('Booking checkout completed successfully!');
        localStorage.removeItem('cart');  // Clear the cart
        navigate('/bookings');  // Navigate to a success page if needed
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="checkout section mt-5">
      <div className="container section-title" data-aos="fade-up">
        <span>Checkout</span>
        <h2>Review Your Order</h2>
      </div>
      <div className="container">
        {cartItems.length > 0 ? (
          <>
            <ul className="list-group mb-4">
              {cartItems.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{item.name}</h5>
                    <p>Date: {new Date(item.selectedDate).toLocaleString()}</p>
                    <p>Details: {item.details}</p>
                  </div>
                  <p>Price: ${item.price}</p>
                </li>
              ))}
            </ul>

            <button
              className="btn btn-success"
              onClick={handlePlaceOrder}
              disabled={isLoading}
            >
              {isLoading ? 'Placing Order...' : 'Place Order'}
            </button>
          </>
        ) : (
          <p>Your cart is empty. <Link to="/">Go to events</Link></p>
        )}
      </div>
    </section>
  );
};

export default Checkout;
