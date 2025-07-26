import React from 'react';
import SectionHighlight from '../../component/sectionHighlight/SectionHighlight';
import visitHero from '../../assets/plan-a-visit.jpg';
import pastorWelcome from '../../assets/plan-a-visit-intro.jpg';
import worshipImage from '../../assets/worship1.jpg';
import tim412 from '../../assets/tim412.jpg';
import prayerImage from '../../assets/church1.jpg';
import "./planVisit.css";
import VisitFAQ from '../../component/visitFAQ/VisitFAQ';
import SunCityHero from '../../component/sunCity/SunCityHero';
import MapSection from '../../component/mapsection/MapSection';

const PlanVisit = () => {
  const heroProps = {
    image: visitHero,
    h1: "Welcome to RCCG Newsprings,",
    span: "where you belong!",
    p: "Whether you're young or old, single or with family, there's a place for you here. Experience genuine love, vibrant worship, and powerful teachings that will grow your faith. No pressure—just a fresh encounter with God and His people.",
  };
  return (
    <div className="plan-visit">
      {/* HERO */}
      <SunCityHero {...heroProps} />

      {/* PLAN A VISIT CTA */}
      <section className="visit-section highlight-cta">
        <h2>Want us to prepare for your visit?</h2>
        <p>Let us know you're coming—we’ll have a seat saved just for you and someone ready to welcome you personally.</p>
        <a className="btn" href="/connect-form">
          <p>Plan Visit <i className="fa-solid fa-arrow-right-long"></i></p>
        </a>
      </section>

      {/* PASTORAL WELCOME */}
      <section className="visit-section">
        <h2>A Personal Welcome</h2>
        <img src={pastorWelcome} alt="Pastor Welcome" className="visit-image" />
        <p>
          “At RCCG Newsprings, our doors and hearts are wide open to you. We’re not just building a church—we’re building people. Whether you're looking for answers, family, purpose, or a fresh start, there’s a place for you here. We look forward to meeting you soon!”
        </p>
        <p><strong>— Pastor John & The Newsprings Team</strong></p>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="visit-section alt-bg">
        <h2 className="visit-title">What to Expect at RCCG Newsprings Church</h2>
        <p className="visit-intro">
          At RCCG Newsprings, your first visit is more than just attending a service — it's stepping into a place where God's presence is real, His Word is alive, and His people are ready to welcome you like family.
        </p>

        <ul className="visit-list">
          <li><i className="fa-solid fa-church"></i> Powerful, Spirit-led worship that draws you into God's presence</li>
          <li><i className="fa-solid fa-bible"></i> Prophetic teaching rooted in the uncompromised Word of God</li>
          <li><i className="fa-solid fa-users"></i> A loving welcome team to greet, guide, and connect you</li>
          <li><i className="fa-solid fa-child-reaching"></i> Safe, joyful, and Bible-based ministry for children and teens</li>
          <li><i className="fa-solid fa-hand-holding-heart"></i> Personal prayer and encouragement available after service</li>
          <li><i className="fa-solid fa-mug-hot"></i> A chance to meet other believers, enjoy refreshments, and find your place in the family</li>
        </ul>
      </section>

      {/* SERVICE TIMES */}
      <section className="visit-section service-times">
        <h2>Service Times</h2>
        <p>We would love for you to join us during any of our weekly services:</p>
        <div className="visit-times">
          <p><strong>Sundays:</strong> 9:00 AM – Worship Service</p>
          <p><strong>Wednesdays:</strong> 6:00 PM – Bible Study & Prayer</p>
          <p><strong>Fridays:</strong> 5:30 PM – Youth/Teens Fellowship (2nd & 4th Fridays)</p>
        </div>
      </section>
      {/* KIDS & TEENS */}
      <section className="visit-section alt-bg">
        <h2>Youth Church (TIM 412)</h2>
        <div className="visit-flex">
          <img src={tim412} alt="Children and Teens Ministry" />
          <p className="visit-text">
            At RCCG Newsprings, we see every child and teenager as a world-changer in the making. That’s why we created TIM 412 — our dynamic youth ministry rooted in 1 Timothy 4:12. We are passionate about guiding young hearts into a personal relationship with Jesus, helping them grow in truth, boldness, and purpose. Through Bible-centered lessons, interactive activities, drama, music, and games, we nurture their gifts while building a firm spiritual foundation. At TIM 412, your child won’t just have fun — they’ll be empowered to live for Christ with confidence and joy.
            <br />
            <a href="https://full-newspring-rbrg.vercel.app/" target="_blank" className="btn">
              <p>
                TIM 412 <i className="fa-solid fa-arrow-right-long"></i>
              </p>
            </a>
          </p>
        </div>
      </section>

      {/* WORSHIP STYLE */}
      <section className="visit-section">
        <h2>Worship Style</h2>
        <div className="visit-flex">
          <p className="visit-text">
            Our worship at RCCG Newsprings is more than just music — it's a joyful expression of love and surrender to God. With a vibrant blend of contemporary praise and heartfelt worship, every moment is designed to draw you closer to His presence. Whether you're clapping, dancing, kneeling, or simply soaking it all in, you're free to worship authentically and without pressure. We value a worship experience that brings healing, lifts hearts, and prepares people to receive God's Word with gladness. Come as you are, and encounter God in a real and refreshing way.
          </p>
          <img src={worshipImage} alt="Worship Experience" />
        </div>
      </section>

      {/* QUESTION AND ANSWER */}
      <VisitFAQ />



      {/* ALTAR CALL & PRAYER */}
      <section className="visit-section">
        <h2>Need Prayer?</h2>
        <div className="visit-flex">
          <img src={prayerImage} alt="Prayer at Newsprings" />
          <div className="visit-text">
            <p>
              Life can get overwhelming. At Newsprings, we believe in the power of prayer. Our altar is open after every service for you to receive one-on-one prayer, encouragement, and breakthrough.
              You can also submit a prayer request online and our team will stand in faith with you.
            </p>
            <a href="/prayer-request" target="_blank" className="btn">
              <p>
                prayer request
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="visit-section alt-bg">
        <h2>Find Us</h2>
        <p><strong>RCCG Newsprings</strong></p>
        <p>332 Capital Building, Idiroko Bus Stop, Maryland, Lagos</p>
       <MapSection/>
        <br />
        <small style={{ textAlign: 'center', display: 'block' }}>
    <a  href={`https://www.google.com/maps/place/Capital+Building,+332+Ikorodu+Rd,+Anthony,+Lagos+105102,+Lagos/@6.5643704,3.3624986,17z/data=!3m1!4b1!4m6!3m5!1s0x103b8d88f6105f45:0x9816a89e9be63dc4!8m2!3d6.5643651!4d3.367112!16s%2Fg%2F12hn69cfb?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D`}
      
            target="_blank"
            rel="noreferrer"
          >
            View Larger Map
          </a>
        </small>
      </section>
    </div>
  );
};

export default PlanVisit;