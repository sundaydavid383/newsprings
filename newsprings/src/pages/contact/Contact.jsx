import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./contact.css";
import MapSection from '../../component/mapsection/MapSection';

const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState("")
    const baseUrl = 'https://newsprings.onrender.com/'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone:'',
    message: '',
  });

  useEffect(() => {
    setLoading(true);
    axios.get(`${baseUrl}api/contact`)
      .then(res => {
        setContactData(res.data.data);
        console.log("contact data", res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load contact data:", err);
        setLoading(false);
      });
  }, []);

  if (!contactData) return (
    <div className="testimonyFormLoader">
      <div className="loader"></div>
    </div>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      // You can POST it to your backend email service
      await axios.post(`${baseUrl}api/contact/send-contact-message`, formData);
      setAlert(true)
      setAlertText('Message sent successfully!');
      setFormData({ name: '', email: '', phone:'', message: '' }); // Reset form
    } catch (error) {
      console.error('Error sending message:', error);
      let message = 'Failed to send message. Please try again.'
      setAlert(true)
      if( error?.response?.data?.message){
        message = error.response.data.message
      }
      setAlertText(message);
    }
    finally{
      setLoading(false)
    }
  };

  return (
  loading ? (
  <div className="testimonyFormLoader">
    <div className="loader"></div>
  </div>
):<>
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
        <a target='_blank' href={`https://www.google.com/maps/place/Capital+Building,+332+Ikorodu+Rd,+Anthony,+Lagos+105102,+Lagos/@6.5643704,3.3624986,17z/data=!3m1!4b1!4m6!3m5!1s0x103b8d88f6105f45:0x9816a89e9be63dc4!8m2!3d6.5643651!4d3.367112!16s%2Fg%2F12hn69cfb?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D`}>{contactData.address}</a>
      </section>
  
      <MapSection/>
      {/* <section className="map-section">
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
      </section> */}

      <section className="email-us">
        <h2>Email Us</h2>
        <a target='_blank' href={`mailto:${contactData.email}`}>{contactData.email}</a>
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

      {/* ===== User Contact Form ===== */}
      <section className="user-contact-form">
            <div className="signuppage">
            {alert && (
              <div className="alert_holder">
                <div className="alert">
                  <p>{alertText}</p>
                  <div onClick={() => setAlert(false)} className="btn">
                    <p>OK</p>
                  </div>
                </div>
              </div>
            )}
              <span></span>
              <img src={"https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-6/489926662_1096424505844830_6847305588891424722_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeHuQYyXdr00d6V2RLQEMtIt5CkuNmbbwArkKS42ZtvACudnE29YYx2PLzC-nDz3D6kW1MZPCnEoBFZaJHbWzPaY&_nc_ohc=pKDHZTLwmiMQ7kNvwEdtboz&_nc_oc=AdkWFuBXi-9Swba8F3Q3Z8Pqui1TLpMe-fbtow3F3QwioTjKrEgzW_5J5n8AzILzVqQ&_nc_zt=23&_nc_ht=scontent-los2-1.xx&_nc_gid=zceBV34wAa632sOyO_MkbQ&oh=00_AfE9M2vvaUm5OkSc0p5_RgLvYTOpiaW6Ix5Np6_Jtiti0g&oe=6815D908"} alt="Church welcome" />
            </div>
        <h2>Send Us a Message</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            required
          />
                    <input
            type="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </section>
 
      </>);
};

export default Contact;