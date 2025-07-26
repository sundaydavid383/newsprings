import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaSun } from "react-icons/fa"; // Import icons

const SuncityCTA = () => {
  return (
    <section className="suncity-cta">
      <h2 className="cta-heading">
        <FaStar style={{ marginRight: "0.5rem", color: "#facc15" }} />
        Discover the Joy of SunCity!
      </h2>
      <p className="cta-text">
        Whether you're new or returning, SunCity is the perfect place for children to experience God’s love through worship, learning, and laughter.
        Make memories, build friendships, and grow in Christ!
      </p>
      <Link to="/connect" className="btn-primary">
        <FaSun style={{ marginRight: "0.5rem", color: "#fbbf24" }} />
        Plan Your Visit Today
      </Link>
    </section>
  );
};

export default SuncityCTA;