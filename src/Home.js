import React, { useEffect, useState } from 'react';
import api from './api';  // Import the Axios instance
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import './aos/aos.css';
import Swiper from 'swiper';
import './swiper/swiper-bundle.min.css';
import 'glightbox/dist/css/glightbox.min.css';
import './css/main.css';
import { Link } from 'react-router-dom';
const Home = () => {
    const [events, setEvents] = useState([]);
    const [companies, setCompanies] = useState([]);
  
    // Fetch events and companies on component mount
    useEffect(() => {
      AOS.init();
      new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
          delay: 5000,
        },
        slidesPerView: 'auto',
      });
  
      // Fetch events from API
      api.get('/home-events')
        .then((response) => {
          setEvents(response.data);
        })
        .catch((error) => {
          console.error('Error fetching events:', error);
        });
  
      // Fetch companies from API
      api.get('/companies')
        .then((response) => {
          setCompanies(response.data);
        })
        .catch((error) => {
          console.error('Error fetching companies:', error);
        });
    }, []);
  
    return (
      <>
       {/* {<Navbar />} */}
        <main>
          {/* Hero Section */}
          <section id="hero" className="hero section dark-background" style={{ minHeight:'100vh ' }}>
  <img src="./img/hero-bg.jpg" alt="Hero Background" data-aos="fade-in" />
  <div className="container" data-aos="fade-up" data-aos-delay="100">
    <div className="row justify-content-start">
      <div className="col-lg-8">
        <h2>Welcome to EMS</h2>
        <p>Your go-to platform for hosting and managing events, bringing businesses and audiences together.</p>
        <a href="/about" className="btn-get-started">Get Started</a>
      </div>
    </div>
  </div>
</section>

  
  {/* about us */}
  <section id="about" className="about section">
  <div className="container section-title" data-aos="fade-up">
    <span>About Us<br/></span>
    <h2>Who We Are<br/></h2>
    <p>We are a team of innovators dedicated to connecting businesses and people through meaningful events and collaborative opportunities.</p>
  </div>

  <div className="container">
    <div className="row gy-4">
      <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="100">
        <img src="./img/about.jpg" className="img-fluid" alt="About Us"/>
      </div>

      <div className="col-lg-6 order-2 order-lg-1 content" data-aos="fade-up" data-aos-delay="200">
        <h3>Empowering Businesses Through Events</h3>
        <p className="fst-italic">
          Our mission is to provide an all-in-one platform for companies to showcase their services, host events, and engage with their audience effectively.
        </p>
        <ul>
          <li><i className="bi bi-check-circle"></i> <span>We facilitate seamless event management for businesses.</span></li>
          <li><i className="bi bi-check-circle"></i> <span>Connect with your target audience through custom-designed events.</span></li>
          <li><i className="bi bi-check-circle"></i> <span>Our platform is built to enhance user experience and promote engagement.</span></li>
        </ul>
        <a href="/about" className="read-more"><span>Read More</span><i className="bi bi-arrow-right"></i></a>
      </div>
    </div>
  </div>
</section>

    {/* services */}
    <section id="services" className="services section">
  <div className="container section-title" data-aos="fade-up">
    <span>Our Services</span>
    <h2>What We Offer</h2>
    <p>Discover a range of services designed to streamline your event management experience and connect you with the right audience.</p>
  </div>

  <div className="container">
    <div className="row gy-4">

      <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
        <div className="service-item position-relative">
          <div className="icon">
            <i className="bi bi-calendar-check"></i>
          </div>
          <a href="#" className="stretched-link">
            <h3>Event Planning</h3>
          </a>
          <p>We provide end-to-end event planning services, from ideation to execution, ensuring your events run smoothly and leave a lasting impact.</p>
        </div>
      </div>

      <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
        <div className="service-item position-relative">
          <div className="icon">
            <i className="bi bi-people"></i>
          </div>
          <a href="#" className="stretched-link">
            <h3>Audience Engagement</h3>
          </a>
          <p>Engage with your audience through our platform's advanced networking tools, boosting interaction and participation before, during, and after your events.</p>
        </div>
      </div>

      <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
        <div className="service-item position-relative">
          <div className="icon">
            <i className="bi bi-broadcast"></i>
          </div>
          <a href="#" className="stretched-link">
            <h3>Live Streaming</h3>
          </a>
          <p>Host your events online with our seamless live streaming solutions, reaching a broader audience and increasing your event's accessibility.</p>
        </div>
      </div>

      <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
        <div className="service-item position-relative">
          <div className="icon">
            <i className="bi bi-pie-chart"></i>
          </div>
          <a href="#" className="stretched-link">
            <h3>Analytics & Insights</h3>
          </a>
          <p>Get detailed reports and insights on audience behavior and engagement, helping you optimize future events for even greater success.</p>
        </div>
      </div>

      <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="500">
        <div className="service-item position-relative">
          <div className="icon">
            <i className="bi bi-briefcase"></i>
          </div>
          <a href="#" className="stretched-link">
            <h3>Business Networking</h3>
          </a>
          <p>Connect with industry leaders and potential partners at your events, expanding your business opportunities and strengthening professional relationships.</p>
        </div>
      </div>

      <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="600">
        <div className="service-item position-relative">
          <div className="icon">
            <i className="bi bi-chat-square-text"></i>
          </div>
          <a href="#" className="stretched-link">
            <h3>Custom Support</h3>
          </a>
          <p>Our team is always ready to assist you with any challenges you may face, ensuring a smooth and stress-free event experience.</p>
        </div>
      </div>

    </div>
  </div>
</section>

        {/* call to action */}
        <section id="call-to-action" className="call-to-action section dark-background">
  <img src="./img/cta-bg.jpg" alt=""/>

  <div className="container">
    <div className="row justify-content-center" data-aos="zoom-in" data-aos-delay="100">
      <div className="col-xl-10">
        <div className="text-center">
          <h3>Explore Our Packages</h3>
          <p>Discover a variety of event packages tailored to your needs, designed to make your event planning experience seamless and successful.</p>
          <a className="cta-btn" href="/packageList">View Packages</a>
        </div>
      </div>
    </div>
  </div>
</section>

          {/* Events Section */}
          
      <section id="portfolio" className="portfolio section">
        <div className="container section-title" data-aos="fade-up">
          <span>Events</span>
          <h2>Events</h2>
          <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        </div>

        <div className="container">
          <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
      
            <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
              {events.map(event => (
                <div key={event.id} className="col-lg-4 col-md-6 portfolio-item isotope-item">
                  {/* Display the first image from the images array */}
                  {Array.isArray(event.images) && event.images.length > 0 ? (
                  <img
                    src={event.images && event.images.length > 0
                      ? `http://127.0.0.1:8000${event.images[0]}`  // Adjust based on your API's image URL
                      : './img/hero-bg.jpg'}  // Placeholder image
                    className="img-fluid"
                    alt={event.name}
                  />
                ) : (
                  <img src='./img/hero-bg.jpg' className="img-fluid" alt="Event placeholder" />
                )}
                  <div className="portfolio-info">
                    <h4>{event.name}</h4>
                    <p>{event.description}</p>
                    <Link to={`/events/${event.id}`} className="btn btn-primary">
                    View Event Details
                  </Link>
                    <a
                      href={event.images && event.images.length > 0 ? event.images[0] : '#'}
                      title={event.name}
                      className="glightbox preview-link"
                    >
                      <i className="bi bi-zoom-in"></i>
                    </a>
                    <a
                      href={`/event-details/${event.id}`}
                      title="More Details"
                      className="details-link"
                    >
                      <i className="bi bi-link-45deg"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    
  
              {/* Team/Companies Section */}
      <section id="team" className="team section">
        <div className="container section-title" data-aos="fade-up">
          <span>Our Companies</span>
          <h2>Companies</h2>
          <p>Discover some of the amazing companies working with us</p>
        </div>

        <div className="container">
          <div className="row">
            {companies.map((company, index) => (
              <div key={company.id} className="col-lg-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay={`${(index + 1) * 100}`}>
                <div className="member">
                  {/* Display the first image from the images array, or a placeholder if none */}
                   {Array.isArray(company.images) && company.images.length > 0 ? (
                  <img
                    src={company.images && company.images.length > 0
                      ? `http://127.0.0.1:8000${company.images[0]}`
                      : './img/services.jpg'}
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
                      {/* Example social media links */}
                      <a href="#"><i className="bi bi-twitter"></i></a>
                      <a href="#"><i className="bi bi-facebook"></i></a>
                      <a href="#"><i className="bi bi-instagram"></i></a>
                      <a href="#"><i className="bi bi-linkedin"></i></a>
                     
                    </div> <Link to={`/companies/${company.id}`} className="btn btn-primary mt-3">View Details</Link>
                
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        </main>


      </>
    );
  };
  
  export default Home;