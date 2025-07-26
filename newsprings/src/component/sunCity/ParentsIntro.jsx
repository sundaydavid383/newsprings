import React from "react";
import "./sunCity.css";
import welcomeImage from "../../assets/parents-welcome.jpg"; // add a suitable image
import happyKids from "../../assets/happy-kids.jpg"; // another warm image

const SuncityParents = () => {
  return (
    <section className="suncity-parents">
      <h2 className="section-title">New Here?</h2>
      <div className="suncity-content">
        <img src={welcomeImage} alt="Welcome" className="parent-img" />
        <div className="suncity-text">
          <p>
            Welcome to <strong>SunCity Kids</strong> – a safe and joyful space
            for your children to grow, play, and encounter God’s love!
          </p>
          <p>
            On arrival, our friendly team will help you check in, guide you to
            the right place, and make sure your child feels at home.
          </p>
          <p>
            Our environment is designed to ensure your child's safety,
            happiness, and spiritual growth.
          </p>
        </div>
        <img src={happyKids} alt="Happy Kids" className="parent-img" />
      </div>
    </section>
  );
};

export default SuncityParents;