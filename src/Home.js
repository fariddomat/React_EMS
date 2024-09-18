import React, { useEffect, useState } from 'react';
import api from './api';  // Import the Axios instance
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import './aos/aos.css';
import Swiper from 'swiper';
import './swiper/swiper-bundle.min.css';
import 'glightbox/dist/css/glightbox.min.css';
import './css/main.css';
import Navbar from './Navbar';

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
      api.get('/events')
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
          <section id="hero" className="hero section dark-background">
            <img src="./img/hero-bg.jpg" alt="" data-aos="fade-in" />
            <div className="container" data-aos="fade-up" data-aos-delay="100">
              <div className="row justify-content-start">
                <div className="col-lg-8">
                  <h2>Welcome to Day</h2>
                  <p>We are team of talented designers making websites with Bootstrap</p>
                  <a href="#about" className="btn-get-started">Get Started</a>
                </div>
              </div>
            </div>
          </section>
  
  {/* about us */}
  <section id="about" className="about section">

      <div className="container section-title" data-aos="fade-up">
        <span>About Us<br/></span>
        <h2>About Us<br/></h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container">

        <div className="row gy-4">

          <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="100">
            <img src="./img/about.jpg" className="img-fluid" alt=""/>
          </div>

          <div className="col-lg-6 order-2 order-lg-1 content" data-aos="fade-up" data-aos-delay="200">
            <h3>Voluptatem dignissimos provident quasi corporis</h3>
            <p className="fst-italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
            <ul>
              <li><i className="bi bi-check-circle"></i> <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></li>
              <li><i className="bi bi-check-circle"></i> <span>Duis aute irure dolor in reprehenderit in voluptate velit.</span></li>
              <li><i className="bi bi-check-circle"></i> <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</span></li>
            </ul>
            <a href="#" className="read-more"><span>Read More</span><i className="bi bi-arrow-right"></i></a>
          </div>

        </div>

      </div>

    </section>

    {/* services */}

    <section id="services" className="services section">

      
      <div className="container section-title" data-aos="fade-up">
        <span>Services</span>
        <h2>Services</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container">

        <div className="row gy-4">

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div className="service-item  position-relative">
              <div className="icon">
                <i className="bi bi-activity"></i>
              </div>
              <a href="#" className="stretched-link">
                <h3>Nesciunt Mete</h3>
              </a>
              <p>Provident nihil minus qui consequatur non omnis maiores. Eos accusantium minus dolores iure perferendis tempore et consequatur.</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-broadcast"></i>
              </div>
              <a href="#" className="stretched-link">
                <h3>Eosle Commodi</h3>
              </a>
              <p>Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non ut nesciunt dolorem.</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-easel"></i>
              </div>
              <a href="#" className="stretched-link">
                <h3>Ledo Markt</h3>
              </a>
              <p>Ut excepturi voluptatem nisi sed. Quidem fuga consequatur. Minus ea aut. Vel qui id voluptas adipisci eos earum corrupti.</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-bounding-box-circles"></i>
              </div>
              <a href="#" className="stretched-link">
                <h3>Asperiores Commodit</h3>
              </a>
              <p>Non et temporibus minus omnis sed dolor esse consequatur. Cupiditate sed error ea fuga sit provident adipisci neque.</p>
              <a href="#" className="stretched-link"></a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="500">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-calendar4-week"></i>
              </div>
              <a href="#" className="stretched-link">
                <h3>Velit Doloremque</h3>
              </a>
              <p>Cumque et suscipit saepe. Est maiores autem enim facilis ut aut ipsam corporis aut. Sed animi at autem alias eius labore.</p>
              <a href="#" className="stretched-link"></a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="600">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-chat-square-text"></i>
              </div>
              <a href="#" className="stretched-link">
                <h3>Dolori Architecto</h3>
              </a>
              <p>Hic molestias ea quibusdam eos. Fugiat enim doloremque aut neque non et debitis iure. Corrupti recusandae ducimus enim.</p>
              <a href="#" className="stretched-link"></a>
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
        <h3>Call To Action</h3>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <a className="cta-btn" href="#">Call To Action</a>
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

            {/* You can customize filters dynamically if needed */}
            <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
              <li data-filter="*" className="filter-active">All</li>
              {/* Add other filters dynamically if needed */}
            </ul>

            <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
              {events.map(event => (
                <div key={event.id} className="col-lg-4 col-md-6 portfolio-item isotope-item">
                  {/* Display the first image from the images array */}
                  <img
                    src={event.images && event.images.length > 0 ? `http://127.0.0.1:8000${event.images[0]}` : '/assets/img/placeholder.png'}
                    className="img-fluid"
                    alt={event.name}
                  />
                  <div className="portfolio-info">
                    <h4>{event.name}</h4>
                    <p>{event.description}</p>
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
                  <img
                    src={company.images && company.images.length > 0
                      ? `http://127.0.0.1:8000${company.images[0]}`
                      : '/assets/img/team/placeholder.jpg'}
                    className="img-fluid"
                    alt={company.name}
                  />
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
                    </div>
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