import React from 'react';
import "./contact.css"

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      <section className="contact-info">
        <h2>Call Us</h2>
        <p>+234 812 428 5225</p>
        <p>+234 802 033 9007</p>
      </section>

      <section className="visit-us">
        <h2>Visit Us</h2>
        <p>The Capital Building, 332 Ikorodu Road, Maryland, Lagos, Nigeria</p>
      </section>
      <section className="map-section">
  <h2>Find Us on Map</h2>
  <div className="map-embed">
    <iframe
      title="Church Location"
      src="https://www.openstreetmap.org/export/embed.html?bbox=3.3615%2C6.5533%2C3.3915%2C6.5733&layer=mapnik&marker=6.5633,3.3765"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
    ></iframe>
  </div>
</section>

      <section className="email-us">
        <h2>Email Us</h2>
        <p>newspringchristiancentre@gmail.com</p>
      </section>

      <section className="about-us">
        <h2>About Us</h2>
        <p>
          NewSpring is one of the warmest and friendliest churches you would ever attend. We love people; therefore, our desire is to see the message of Christ reach out, inspire our community, and fulfill destinies. God has a plan and a purpose for you. This plan involves building your life upon biblical principles.
        </p>
      </section>

      <section className="social-media">
  <h2>Follow Us</h2>
 
    <div><a
      href="https://facebook.com/202929673070037"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i title='Facebook' className="iconactive fab fa-facebook-f"></i> 
    </a>

    <a
      href="https://instagram.com/rccgnewsprings"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i title="Instagram" className="iconactive fab fa-instagram"></i> 
    </a>
 
  
    <a
      href="https://soundcloud.com/rccg-newsprings"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i title='SoundCloud' className="iconactive fab fa-soundcloud"></i> 
    </a></div>
  
</section>
    </div>
  );
};

export default Contact;
