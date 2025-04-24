import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './waterBaptisim.css'; // your normal CSS file

const WaterBaptisim = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertText, setAlertText] = useState("I am here to alert you about your problems");
  const [registrants, setRegistrants] = useState([]);

  // Fetch baptism event and registrants
  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:4000/api/baptism');
        if (res.data.success) {
          setEvent(res.data.event);
        }
        const registrantsRes = await axios.get('http://localhost:4000/api/baptism/registrants');
        if (registrantsRes.data.success) {
          setRegistrants(registrantsRes.data.registrants);
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
      await axios.post('http://localhost:4000/api/baptism/register', formData);
      alert('Registration successful!');
      form.reset();
    } catch (err) {
      console.error('Error submitting registration:', err);
      alert('Registration failed. Please try again.');
    }
  };

  // Handle update of registrant
  const handleUpdate = async (index, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/baptism/register/${index}`, updatedData);
      if (response.data.success) {
        alert('Baptism registrant updated successfully!');
        setRegistrants(prevRegistrants => prevRegistrants.map((r, idx) => idx === index ? { ...r, ...updatedData } : r));
      }
    } catch (error) {
      console.error('Error updating registrant:', error);
      alert('Failed to update registrant');
    }
  };

  // Handle delete of registrant
  const handleDelete = async (index) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/baptism/register/${index}`);
      if (response.data.success) {
        alert('Baptism registrant deleted successfully!');
        setRegistrants(prevRegistrants => prevRegistrants.filter((_, idx) => idx !== index));
      }
    } catch (error) {
      console.error('Error deleting registrant:', error);
      alert('Failed to delete registrant');
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
    <div className="container">
      <div className="header">
        <h1>{event.title}</h1>
        <p>{event.date} &middot; {event.time}</p>
        <p>{event.location}</p>
      </div>
      <img src={event.image} alt="Baptism" style={{ width: '100%', borderRadius: '12px', marginBottom: '20px' }} />
      <div className="description">
        {event.description.split('\n\n').map((para, idx) => (
          <p key={idx} style={{ marginBottom: '16px', lineHeight: '1.6' }}>{para}</p>
        ))}
      </div>
      {event.registrationOpen ? (
        <form className="registration-form" onSubmit={handleSubmit}>
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
            <option value="">-- Select --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label htmlFor="bornAgain">Are you born again?</label>
          <select id="bornAgain" name="bornAgain" required>
            <option value="">-- Select --</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <button type="submit">Register Now</button>
        </form>
      ) : (
        <p style={{ color: 'red', textAlign: 'center' }}>Registration is currently closed.</p>
      )}
      <div>
        <h2>Existing Registrants</h2>
        {registrants.length > 0 ? (
          <ul>
            {registrants.map((registrant, idx) => (
              <li key={idx}>
                {registrant.fullName} - {registrant.email}
                <button onClick={() => handleUpdate(idx, { fullName: 'Updated Name' })}>Update</button>
                <button onClick={() => handleDelete(idx)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No registrants yet.</p>
        )}
      </div>
    </div>
  );
};

export default WaterBaptisim;