import React, { useEffect, useState } from 'react';
import api from './api';  // Axios instance for API calls

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/notifications')  // Fetch notifications from the API
      .then(response => {
        setNotifications(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching notifications", error);
        setLoading(false);
      });
  }, []);

  const markAsRead = (id) => {
    api.post(`/notifications/${id}/read`)
      .then(() => {
        setNotifications(notifications.map(notification =>
          notification.id === id ? { ...notification, status: 'read' } : notification
        ));
      })
      .catch(error => {
        console.error("Error marking notification as read", error);
      });
  };

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  return (
    <section id="team" className="team section mt-5">
    <div className="container section-title" data-aos="fade-up">
      <span>Notifications</span>
      <h2>Notifications</h2>
    </div>

    <div className="container">
      <h2>Your Notifications</h2>
      <ul className="list-group">
        {notifications.map(notification => (
          <li key={notification.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {notification.message} - <span className={`badge ${notification.status === 'read' ? 'bg-success' : 'bg-secondary'}`}>{notification.status}</span>
            </div>
            {notification.status === 'unread' && (
              <button className="btn btn-sm btn-primary" onClick={() => markAsRead(notification.id)}>Mark as Read</button>
            )}
          </li>
        ))}
      </ul>
    </div>
    </section>
  );
};

export default Notifications;
