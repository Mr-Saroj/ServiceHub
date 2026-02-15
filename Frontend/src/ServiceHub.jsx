import { useState, useEffect } from "react";
import "./ServiceHub.css";
import Footer from "./CommonComonent/Footer";



function ServiceHub() {
  const slides = [
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);
  return (
    <>
      <main>
        <section className="hero">
          <div
            className="hero-slider"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="hero-slide"
                style={{ backgroundImage: `url(${slide})` }}
              >
                <div className="hero-overlay"></div>
              </div>
            ))}
          </div>

          <div className="container hero-content">
            <h1>Book Trusted Local Services</h1>
            <p>
              Connect with verified local technicians for all your home service needs.
              Fast, reliable and affordable solutions.
            </p>

            <div className="hero-buttons">
              <a href="#" className="btn">Book a Service</a>
              <a href="#" className="btn btn-outline">Become a Technician</a>
            </div>

            {/* Dots */}
            <div className="hero-dots">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={current === index ? "dot active" : "dot"}
                  onClick={() => setCurrent(index)}
                ></span>
              ))}
            </div>
          </div>
        </section>


        <section className="services">
          <div className="container">
            <div className="section-title">
              <h2>Popular Services</h2>
              <p>Find the right professional for your needs</p>
            </div>

            <div className="service-cards">
              <div className="service-card">
                <i className="fas fa-bolt"></i>
                <h3>Electrician</h3>
                <p>Installation, repair, and maintenance of electrical systems</p>
                <a href="#" className="btn">Book Now</a>
              </div>

              <div className="service-card">
                <i className="fas fa-wrench"></i>
                <h3>Plumber</h3>
                <p>Pipe installation, leak repair, and bathroom fixtures</p>
                <a href="#" className="btn">Book Now</a>
              </div>

              <div className="service-card">
                <i className="fas fa-graduation-cap"></i>
                <h3>Tutor</h3>
                <p>Academic support and specialized skill training</p>
                <a href="#" className="btn">Book Now</a>
              </div>

              <div className="service-card">
                <i className="fas fa-car"></i>
                <h3>Mechanic</h3>
                <p>Vehicle maintenance, repair, and inspection services</p>
                <a href="#" className="btn">Book Now</a>
              </div>

              <div className="service-card">
                <i className="fas fa-broom"></i>
                <h3>Cleaner</h3>
                <p>Home cleaning, deep cleaning, and organization</p>
                <a href="#" className="btn">Book Now</a>
              </div>
            </div>
          </div>
        </section>

        <section className="how-it-works">
          <div className="container">
            <div className="section-title">
              <h2>How It Works</h2>
              <p>Simple steps to get your service done</p>
            </div>

            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Post Your Request</h3>
                <p>
                  Describe the service you need, provide details about your requirements,
                  and set your budget and timeline.
                </p>
              </div>

              <div className="step">
                <div className="step-number">2</div>
                <h3>Get Matched</h3>
                <p>
                  Our system matches your request with qualified local technicians.
                  Review profiles and select the best fit.
                </p>
              </div>

              <div className="step">
                <div className="step-number">3</div>
                <h3>Get It Done</h3>
                <p>
                  The technician completes the job, and you pay securely
                  through our platform after satisfactory completion.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ServiceHub;
