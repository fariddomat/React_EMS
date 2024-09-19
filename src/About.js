import React from 'react';

const About = () => {
  return (
    <section id="about" className="about section mt-5">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <span>About Us<br /></span>
        <h2>About Us<br /></h2>
        <p>Your Event Management System aims to provide seamless event planning and management solutions.</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="100">
            <img src="./img/about.jpg" className="img-fluid" alt="About Us" />
          </div>

          <div className="col-lg-6 order-2 order-lg-1 content" data-aos="fade-up" data-aos-delay="200">
            <h3>Empowering Your Events</h3>
            <p className="fst-italic">
              At our Event Management System, we are dedicated to ensuring that your events are memorable and successful. 
              From planning to execution, we have you covered.
            </p>
            <ul>
              <li><i className="bi bi-check-circle"></i> <span>Comprehensive event planning tools for every need.</span></li>
              <li><i className="bi bi-check-circle"></i> <span>User-friendly interface for easy navigation.</span></li>
              <li><i className="bi bi-check-circle"></i> <span>Real-time updates and management capabilities.</span></li>
            </ul>
            <h4>Features of Our Event Management System</h4>
            <p>Our system includes a wide range of features designed to enhance your event experience:</p>
            <ul>
              <li><strong>Event Creation:</strong> Easily create and customize your events with all necessary details.</li>
              <li><strong>Ticketing System:</strong> Manage ticket sales and registrations effortlessly.</li>
              <li><strong>Attendee Management:</strong> Track and manage attendee lists for seamless check-ins.</li>
              <li><strong>Communication Tools:</strong> Engage with attendees via email notifications and updates.</li>
              <li><strong>Analytics:</strong> Gain insights into event performance and attendee engagement.</li>
            </ul>
            <h4>Our Commitment</h4>
            <p>We strive to provide you with the best tools and support to make your events a success. Our team is here to help you every step of the way!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
