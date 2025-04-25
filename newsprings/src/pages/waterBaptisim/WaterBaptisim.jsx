import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './waterBaptisim.css'; // your normal CSS file

const WaterBaptisim = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertText, setAlertText] = useState("I am here to alert you about your problems");

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
      fullName: form.fullName.value,
      email: form.email.value,
      phone: form.phone.value,
      dob: form.dob.value,
      gender: form.gender.value,
      bornAgain: form.bornAgain.value,
    };

    try {
      await axios.post('http://localhost:4000/api/events/baptism/register', formData);
      alert('Registration successful!');
      form.reset();
    } catch (err) {
      console.error('Error submitting registration:', err);
      alert('Registration failed. Please try again.');
    }
  };

  if (loading) return (
    <div className="testimonyFormLoader">
      <div className="loader"></div>
    </div>
  );

  return (
    !event ? (
      <div className="alert_holder">
        <div className="alert">
          {alertText}
          <div onClick={() => setAlertText("")} className="btn">
            <p>OK</p>
          </div>
        </div>
      </div>
    ) :
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
          <h3>Upcoming Events</h3>
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
            <img src="https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-6/487809254_1077807161039898_3562322017601138802_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeEJ-Hl3TueI62uYUks1khVgQH0Hr9hY6nVAfQev2FjqddOblFGoV8qpFFvkNFcgzvLyEmoiiLN_ApRSxqO1EpqE&_nc_ohc=ZVwGfFXEUbkQ7kNvwHQG4Ys&_nc_oc=AdkFFd87S2TthDnWflKWiDlmKUSRc-LiKtG0UjNvhwfBsadpQcIbvJQvngtEmG2jhaE&_nc_zt=23&_nc_ht=scontent-los2-1.xx&_nc_gid=3U49bYYBTZtXxC8JgFtGoA&oh=00_AfGuLWMuunkmCSKVI-drqHHT1l-20l6ymJX0W879PJOaEQ&oe=6811D08B" alt="Church welcome" />
          </div>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name</label>
            <input id="fullName" name="fullName" type="text" placeholder="Your full name" required />
            <label htmlFor="email">Email Address</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" required />
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" name="phone" type="tel" placeholder="+234 80 1234 5678" required />
            <label htmlFor="dob">Date of Birth</label>
            <input id="dob" name="dob" type="date" required />
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" required>
              <option value=""> Select </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <label htmlFor="bornAgain">Are you born again?</label>
            <select id="bornAgain" name="bornAgain" required>
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
  );
};

export default WaterBaptisim;