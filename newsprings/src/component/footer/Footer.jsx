import React from 'react'
import "./footer.css"
import logo from "../../assets/logo.png";
import { Link } from "react-router";

const Footer = () => {
  return (
<div className='footer '>
  <div className="footer_holder container">
  <div className="about">
        <img src={logo} alt="RCCG Newspring Logo" />
        <h3>About</h3>
        <p>"RCCG Newspring is a vibrant and welcoming place of worship, love, and transformation, where people from all walks of life come together to experience the presence of God. Rooted in the teachings of Jesus Christ, we are committed to spreading the gospel with passion and purpose, empowering individuals to grow spiritually, live purposefully, and impact their communities positively. At RCCG Newspring, every soul is valued, every heart is nurtured, and every life is given the opportunity to be transformed by the grace and power of God.</p>
    </div>

    {/* Ministries Section */}
    <div className="ministries">
        <h3>Ministries</h3>
        <Link to="/children">Children's Ministry</Link>
        <Link to="/youth">Youth Ministry</Link>
        <Link to="/women">Women's Fellowship</Link>
        <Link to="/men">Men's Fellowship</Link>
        <Link to="/outreach">Evangelism & Outreach</Link>
    </div>

    {/* Events & Conferences */}
    <div className="event_conference">
        <h3>Events & Conferences</h3>
        <Link to="/upcoming-events">Upcoming Events</Link>
        <Link to="/annual-conference">Annual Conference</Link>
        <Link to="/revival">Revival Services</Link>
        <Link to="/special-services">Special Services</Link>
    </div>

    {/* Resources Section */}
    <div className="resources">
        <h3>Resources</h3>
        <Link to="/sermons">Sermons & Messages</Link>
        <Link to="/bible-study">Bible Study</Link>
        <Link to="/devotionals">Daily Devotionals</Link>
        <Link to="/give">Give/Donations</Link>
        <Link to="/contact">Contact Us</Link>
    </div>
  </div>
   
    <div className="footer_social">
    <div className="footer_terms">
    <p>&copy; 2025 RCCG Newspring. All Rights Reserved.</p>
    <Link to="/privacy-policy">Privacy Policy</Link>
    <Link to="/terms-of-service">Terms of Service</Link>
    <Link to="/contact">Contact Us</Link>
</div>
         <div className="footer_media">
         <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <i className="fa-brands fa-twitter"></i> Twitter
</Link>
<Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <i className="fa-brands fa-facebook"></i> Facebook
</Link>
<Link to="https://instagram.com" target="_blank" rel="noopener noreferrer">
    <i className="fa-brands fa-instagram"></i> Instagram
</Link>
<Link to="https://youtube.com" target="_blank" rel="noopener noreferrer">
    <i className="fa-brands fa-youtube"></i> YouTube
</Link>
         </div>
    </div>
</div>
  )
}

export default Footer
