import React from "react";
import "./connect.css";
import image1 from "../../assets/rccg9.jpg"
import image2 from "../../assets/rccg10.jpg"

export default function Connect() {
  return (
    <div className="connect-wrapper">
      <section className="hero-section">
        <img src={image1} alt="Worship gathering" className="hero-image" />
        <div className="hero-content">
          <h1>We’re Glad You’re Here</h1>
          <p>
            Our heart at NewSprings is simple: love God, love people. We help you encounter God,
            discover community, serve with purpose, and grow in your faith—no matter where you're at.
          </p>
        </div>
      </section>

            <section className="connect-section alt">
        <h2>Ready to Take a Next Step?</h2>
        <p>
          We’d love to guide you! Whether you're exploring faith, considering baptism/membership,
          or want to serve—we're here to help.
        </p>
        <a href="/connect-form" className="connect-button">Fill Out Connect Form</a>
      </section>

      <section className="intro-section">
        <img src={image2} alt="People connecting" className="intro-image" />
        <div className="intro-text">
          <h2>Connect With Us</h2>
          <p>
            Whether you're brand new or have been walking with Jesus for years, there's a place for you.
            Explore our ministries, find your people, and take your next step. We're here to help —
            through prayer, resources, events, or a friendly conversation.
          </p>
        </div>
      </section>

      <section className="connect-section">
        <h2>Find Your Community</h2>
        <p>Life is better when we walk together. Find meaningful connection in one of our groups:</p>
   <div className="connect-grid">
  <div className="connect-card">
    <i className="fas fa-church icon"></i>
    <h3>Attend a Service</h3>
    <p>
      Join us Sunday mornings or Wednesday evenings for worship and teaching that's
      both powerful and practical.
    </p>
  </div>
  <div className="connect-card">
    <i className="fas fa-female icon"></i>
    <h3>Women's Group</h3>
    <p>
      Encouraging women to grow in faith and purpose through weekly meetups and monthly
      outreach activities.
    </p>
  </div>
  <div className="connect-card">
    <i className="fas fa-male icon"></i>
    <h3>Men’s Fellowship</h3>
    <p>
      Building strong, godly men with fellowship dinners, prayer nights, and accountability groups.
    </p>
  </div>
  <div className="connect-card">
    <i className="fas fa-users icon"></i>
    <h3>Youth Church</h3>
    <p>
      A vibrant community for 13–18 year olds — packed with worship, Bible teaching,
      fellowship and life-changing experiences.
    </p>
  </div>
  <div className="connect-card">
    <i className="fas fa-child icon"></i>
    <h3>SunCity (Children's Church)</h3>
    <p>
      Fun-filled, safe, Bible-based teaching for kids ages 3–12, happening every Sunday
      during service.
    </p>
  </div>
  <div className="connect-card">
    <i className="fas fa-graduation-cap icon"></i>
    <h3>Campus & Career Fellowship</h3>
    <p>
      Supporting students and young adults on campus and early career through mentorship,
      Bible study, and social fun.
    </p>
  </div>
</div>
      </section>

      <section className="connect-section alt">
        <h2>Annual Events & Experiences</h2>
        <p>There’s always something fresh happening here at NewSprings. Don’t miss out:</p>
        <ul>
          <li><strong>Easter Campout:</strong> A spiritual retreat under the sky with worship, teaching, games, and bonfires. Great for families!</li>
          <li><strong>Church Anniversary:</strong> A special celebration of God’s faithfulness, featuring music, testimonies, and community service.</li>
          <li><strong>Youth Summer Conference:</strong> Weekend retreat for teens with powerful teaching, worship, and fun.</li>
          <li><strong>Women & Men Conferences:</strong> Time for growth, encouragement, and breakthroughs in faith and purpose.</li>
          <li><strong>Community Outreach Days:</strong> Join us to serve our city — feeding the hungry, cleaning neighborhoods, and sharing hope.</li>
          <li><strong>Worship Nights & Revivals:</strong> Monthly gatherings focused on encountering God together through worship.</li>
        </ul>
      </section>

      <section className="plan-visit">
        <h2>Plan Your Visit</h2>
        <p>No expectations, no pressure—just a place to belong. Here's what to expect:</p>
        <ul>
          <li><strong>Service Times:</strong> Sundays at 9AM & 11AM, Wednesdays at 6:30PM</li>
          <li><strong>Location:</strong> The Capital Building, 332 Ikorodu Road, Lagos, Nigeria 100211</li>
          <li><strong>What to Wear:</strong> Come as you are—some dress up, most dress casual.</li>
          <li><strong>Kids Program:</strong> SunCity runs during main services with great teachers and safe fun.</li>
          <li><strong>Connect Central:</strong> Stop by our welcome desk—we'd love to meet you and show you around.</li>
        </ul>
      </section>

<section className="connect-pastor">
  <h2>Talk With a Pastor</h2>
  <p>
    We care about you. Whether you want prayer, advice, or just someone to listen, our pastors
    are available for confidential conversations.
  </p>
<p>
  <a href="mailto:info@rccgnewsprings.org">
    <i className="fas fa-envelope"></i> info@rccgnewsprings.org
  </a>
</p>
<p>
  <a href="tel:+2348030000000">
    <i className="fas fa-phone-alt"></i> +234-803-000-0000
  </a>
</p>
</section>

    <section className="social-section">
  <h2>Stay Connected Online</h2>
  <p>Follow us, watch messages, stay up-to-date and connect any time:</p>
  <ul className="social-links">
    <li >
      <a href="https://facebook.com/RCCGNewSprings" target="_blank" rel="noopener noreferrer">
        <i className="iconactive fab fa-facebook-f"></i> Facebook
      </a>
    </li>
    <li>
      <a href="https://instagram.com/rccgnewsprings" target="_blank" rel="noopener noreferrer">
        <i className="iconactive fab fa-instagram"></i> Instagram
      </a>
    </li>
    <li>
      <a href="https://youtube.com/user/RCCGNewSprings" target="_blank" rel="noopener noreferrer">
        <i className="iconactive fab fa-youtube"></i> YouTube
      </a>
    </li>
  </ul>
</section>


    </div>
  );
}