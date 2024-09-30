import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetch cart items from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Remove item from cart
  const handleRemoveItem = (eventId) => {
    const updatedCart = cartItems.filter(item => item.event_id !== eventId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Proceed to checkout
  const handleCheckout = () => {
    if (!cartItems.length) {
      alert('Cart is empty!');
      return;
    }

    // Navigate to a checkout page (if exists)
    navigate('/checkout'); 
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price || 0), 0);

  return (
    <section id="events" className="events section mt-5">
      <div className="container section-title" data-aos="fade-up">
        <span>Cart</span>
        <h2>Your Cart</h2>
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
                  </div>
                  <div>
                    <p>Price: ${item.price}</p>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemoveItem(item.event_id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Display the total price */}
            <div className="d-flex justify-content-end mb-3">
              <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
            </div>

            <button className="btn btn-success" onClick={handleCheckout}>Proceed to Checkout</button>
          </>
        ) : (
          <p>Your cart is empty. <Link to="/">Go to events</Link></p>
        )}
      </div>
    </section>
  );
};

export default Cart;
