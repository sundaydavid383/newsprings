import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./contact.css";

const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:4000/api/contact")
      .then(res => {setContactData(res.data.data); console.log("contact data",res.data);  setLoading(false)})
      .catch(err => {console.error("Failed to load contact data:", err);  setLoading(false)});
  }, []);

  if (!contactData) return <p>Loading contact info...</p>;

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      <section className="contact-info">
        <h2>Call Us</h2>
        {contactData.phoneNumbers.map((phone, index) => (
          <p key={index}>{phone}</p>
        ))}
      </section>

      <section className="visit-us">
        <h2>Visit Us</h2>
        <p>{contactData.address}</p>
      </section>

      <section className="map-section">
        <h2>Find Us on Map</h2>
        <div className="map-embed">
          <iframe
            width="100%"
            height="450"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src={contactData.mapSrc}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="RCCG NewSprings Location"
          />
        </div>
      </section>

      <section className="email-us">
        <h2>Email Us</h2>
        <p>{contactData.email}</p>
      </section>

      <section className="about-us">
        <h2>About Us</h2>
        <p>{contactData.about}</p>
      </section>

      <section className="social-media">
        <h2>Follow Us</h2>
        <div>
        {contactData.socials.map((social, index) => (
  <a
    key={index}
    href={social.link}
    target="_blank"
    rel="noopener noreferrer"
  >
    <i title={social.name} className={`iconactive ${social.iconClass}`}></i>
  </a>
))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
