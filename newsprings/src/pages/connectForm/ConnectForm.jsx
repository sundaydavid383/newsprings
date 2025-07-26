import React, { useState } from 'react';
import './connectForm.css';
import axios from "axios"
import { useNavigate } from "react-router-dom";

const ConnectForm = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [loading, setLoading] = useState(null);
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone: '',
        serviceDate: '',
        guests: '',
        bringingKids: '',
        contactMethod: '',
        heardFrom: '',
        accessibilityNeeds: '',
        message: '',
    });
    //
    const baseUrl = 'https://newsprings.onrender.com/';
    const today = new Date().toISOString().split("T")[0]
    const fiveWeeks = new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    function isLastFriday(date) {
        const d = new Date(date);
        const day = d.getDay(); // 5 = Friday

        // Get the last day of the month
        const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);

        // Check if selected date is the last Friday of the month
        while (lastDay.getDay() !== 5) {
            lastDay.setDate(lastDay.getDate() - 1);
        }

        return (
            day === 5 &&
            d.getDate() === lastDay.getDate() &&
            d.getMonth() === lastDay.getMonth() &&
            d.getFullYear() === lastDay.getFullYear()
        );
    }

    function validateServiceDate(dateString) {
        const selectedDate = new Date(dateString);
        const dayOfWeek = selectedDate.getDay();

        if (dayOfWeek === 0 || dayOfWeek === 2 || isLastFriday(selectedDate)) {
            return true;
        } else {
            return false;
        }
    }

    const checkIfLastFridayOfTheNext35DaysHasPast = ()=>{
        const today = new Date();
        const lastFriday = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        lastFriday.setDate(lastFriday.getDate() - (lastFriday.getDay() + 2) % 7); // Adjust to last Friday
        return lastFriday < today;
    }

   const validate = () => {
  const today = new Date();
  const selectedDate = new Date(formData.serviceDate);

  if (!formData.fullname.trim())
    return "Please enter your full name so we can recognize you better.";

  if (!formData.email.trim())
    return "Your email is required so we can keep in touch with you.";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email))
    return "The email format seems incorrect. Please use a valid email like example@gmail.com.";

  if (formData.phone && !/^\d{10,15}$/.test(formData.phone))
    return "Your phone number should contain only digits (10 to 15 numbers, no spaces or symbols).";

  if (!formData.serviceDate)
    return "Kindly select the date you'd like to attend our service.";

  if (!validateServiceDate(formData.serviceDate))
    return "We hold special services only on Sundays, Tuesdays, and the last Friday of the month. Please pick one of those days.";

  if (!formData.guests)
    return "Please let us know how many guests you'll be coming with, even if it's just you.";

  if (!formData.contactMethod)
    return "Choose how you'd prefer us to reach out to you (e.g., Phone, Email, SMS).";

  return null; // all good
};

   const handleSubmit = async (e) => { 
    e.preventDefault();
    
    const error = validate();
    if (error) {
        setAlertText(error);
        setAlert(true);
        return;
    }

    setLoading(true);
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}api/connect-visitor`, formData);

        if (response.status !== 201) {
            setAlertText(response.data.message || "Something went wrong. Please try again.");
            setAlert(true);
            return;
        }

        console.log('Form submitted:', formData);

        setAlertText("Thank you for planning your visit! We'll be ready to welcome you.");
        setAlert(true);

        // Reset form
        setFormData({
            fullname: '',
            email: '',
            phone: '',
            serviceDate: '',
            guests: '',
            bringingKids: '',
            contactMethod: '',
            heardFrom: '',
            accessibilityNeeds: '',
            message: '',
        });
        setTimeout(()=>{
          navigate("/");
        },3000)
       
        
    } catch (error) {
        const message =
            error?.response?.data?.message || 
            error?.message || 
            "An unexpected error occurred. Please try again.";

        setAlertText(message);
        setAlert(true);
    } finally {
        setLoading(false);
    }
};


    if (loading) return (
       <div className="EasterLoader">
  <div className="visualizer">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>
    );

    if (alert) return (
        <div className="alert_holder">
            <div className="alert">
                <p>{alertText}</p>
                <div onClick={() => setAlert(false)} className="btn">
                    <p>OK</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="connect-form-page">
            <h2>Plan Your Visit</h2>
            <p>We’re excited to meet you! Please fill out this form so we can prepare to welcome you.</p>

            <form onSubmit={handleSubmit} className="connect-form">
                <div className="form-group">
                    <label htmlFor="fullname">Full Name *</label>
                    <input
                        type="text"
                        name="fullname"
                        id="fullname"
                        value={formData.fullname}
                        placeholder="Enter your full name"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        placeholder="Enter your email address"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        placeholder="Enter your phone number"
                        onChange={handleChange}
                    />
                </div>

                 
                <div className="form-group">
                    <label htmlFor="serviceDate">Which day are you visiting?</label>
                    <input
                        type="date"
                        name="serviceDate"
                        id="serviceDate"
                        value={formData.serviceDate}
                        min={today} // prevent past selection
                        max={fiveWeeks}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="guests">How many people are coming with you? *</label>
                    <select name="guests" id="guests" value={formData.guests} onChange={handleChange}>
                        <option value="">-- Select --</option>
                        <option value="Just me">Just me</option>
                        <option value="2-3">2–3 people</option>
                        <option value="4 or more">4 or more</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="bringingKids">Are you bringing kids?</label>
                    <select name="bringingKids" id="bringingKids" value={formData.bringingKids} onChange={handleChange}>
                        <option value="">-- Select --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Not sure yet">Not sure yet</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="contactMethod">Preferred Contact Method *</label>
                    <select name="contactMethod" id="contactMethod" value={formData.contactMethod} onChange={handleChange}>
                        <option value="">-- Select --</option>
                        <option value="Email">Email</option>
                        <option value="Phone call">Phone call</option>
                        <option value="WhatsApp">WhatsApp</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="heardFrom">How did you hear about us?</label>
                    <select
                        name="heardFrom"
                        id="heardFrom"
                        value={formData.heardFrom}
                        onChange={handleChange}
                    >
                        <option value="">-- Select an option --</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Friend">Friend</option>
                        <option value="Flyer">Flyer</option>
                        <option value="Google Search">Google Search</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="accessibilityNeeds">Any accessibility needs?</label>
                    <textarea name="accessibilityNeeds" id="accessibilityNeeds" rows="2" value={formData.accessibilityNeeds} onChange={handleChange}></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="message">Any other message or request?</label>
                    <textarea name="message" id="message" rows="4" value={formData.message} onChange={handleChange}></textarea>
                </div>

                <button type="submit" className="btn">
                    <p>Submit <i className="fa-solid fa-paper-plane"></i></p>
                </button>
            </form>
        </div>
    );
};

export default ConnectForm;
