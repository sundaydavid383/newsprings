import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './waterBaptisim.css'; // your normal CSS file

const WaterBaptisim = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alert, setAlert] = useState(false)

  // Fetch baptism event and registrants
  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:4000/api/events/baptism');
        if (res.data.success) {
          setEvent(res.data.event);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setAlertText("Unable to fetch baptism information");
        setAlert(true)
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
  
    const formData = {
      fullName: form.fullName.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      dob: form.dob.value,
      gender: form.gender.value,
      bornAgain: form.bornAgain.value,
    };
  
    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+234|0)[789][01]\d{8}$/; // Simple Nigerian phone format
  
    if (!formData.fullName) {
      setAlertText("Full name is required.");
      setAlert(true);
      return;
    }
  
    if (!emailRegex.test(formData.email)) {
      setAlertText("Please enter a valid email address.");
      setAlert(true);
      return;
    }
  
    if (!phoneRegex.test(formData.phone)) {
      setAlertText("Enter a valid Nigerian phone number like +2349012345678.");
      setAlert(true);
      return;
    }
  
    if (!formData.dob) {
      setAlertText("Date of birth is required.");
      setAlert(true);
      return;
    }
  
    const birthDate = new Date(formData.dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
  
    if (age < 14 || (age === 14 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
      setAlertText("You must be at least 14 years old to register.");
      setAlert(true);
      return;
    }
    if (age > 80){
      setAlertText("add a valid age you can't be so old.");
      setAlert(true);
      return;
    }
  
    if (!formData.gender) {
      setAlertText("Please select your gender.");
      setAlert(true);
      return;
    }
  
    if (!formData.bornAgain) {
      setAlertText("Please indicate if you're born again.");
      setAlert(true);
      return;
    }
  
    try {
      await axios.post('http://localhost:4000/api/events/baptism/register', formData);
      setAlertText('Registration successful!');
      setAlert(true);
      form.reset();
    } catch (err) {
      console.error('Error submitting registration:', err);
      setAlertText('Registration failed. Please try again.');
      setAlert(true);
    }
  };

  if (loading) return (
      <div className="loader_holder">
        {Array.from({length:5}).map((_, index) => (
          <div key={index} className="loading_card">
            <div className="loading_img"></div>
            <div className="loading_title"></div>
            <div className="loading_details"></div>
            <div className="loading_text"></div>
            <div className="loading_btn"></div>
          </div>
        ))}
      </div>
    
  );

  return (
    event&&
    <>
      {alert && (<div className="alert_holder">
        <div className="alert">
          {alertText}
          <div onClick={() => {setAlert(false); setAlertText("")}} className="btn">
            <p>OK</p>
          </div>
        </div>
      </div>)}
    <div className="waterbaptisim">
      
      <div className="header">
        <div className='text'>
          <h1>{event.title}</h1>
          <div className='details'>
            <p>{event.date} &middot; {event.time}</p>
            <p>{event.location}</p>
          </div>
        </div>
        <img src={event.image} alt="Baptism" />
      </div>

      <div className="content-wrapper">
        <div className="description">
          {event.description.split('\n\n').map((para, idx) => (
            <p key={idx} style={{ marginBottom: '16px', lineHeight: '1.6' }}>{para}</p>
          ))}
        </div>

        <div className="upcoming-events">
          <h2>Upcoming Events</h2>
          {event.upcomingEvents && event.upcomingEvents.map((upcomingEvent, idx) => (
            <div key={idx} className="upcoming-event">
              <div className='text'>
              <h4>{upcomingEvent.title}</h4>
              <p>{upcomingEvent.date} &middot; {upcomingEvent.time}</p>
              <p>{upcomingEvent.location}</p>
              <p>{upcomingEvent.description}</p>
              </div>
              <img src={upcomingEvent.image} alt={upcomingEvent.title} />
            </div>
          ))}
        </div>
      </div>

      {event.registrationOpen ? (
        <>
          <div className="signuppage">
            <span></span>
            <img src={event.backgroundformimage} alt="Church welcome" />
          </div>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name</label>
            <input id="fullName" name="fullName" type="text" placeholder="Your full name"  />
            <label htmlFor="email">Email Address</label>
            <input id="email" name="email" type="email" placeholder="your@example.com"  />
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" name="phone" type="tel" placeholder="+234 80 1234 5678"  />
            <label htmlFor="dob">Date of Birth</label>
            <input id="dob" name="dob" type="date"  />
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" >
              <option value=""> Select </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <label htmlFor="bornAgain">Are you born again?</label>
            <select id="bornAgain" name="bornAgain" >
              <option value=""> Select </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <button type="submit">Register Now</button>
          </form>
        </>
      ) : (
        <p style={{ color: 'red', textAlign: 'center' }}>Registration is currently closed.</p>
      )}

    </div>
    </>
  );
};

export default WaterBaptisim;