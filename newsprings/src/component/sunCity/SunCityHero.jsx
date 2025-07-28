import React from "react";
import "./sunCity.css";

const SunCityHero = ({ image, h1, span, p }) => {
  return (
    <div
      className="suncity-hero"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url(${image})`,
        backgroundBlendMode: "multiply",
      }}
    >
      {h1 && (
        <h1>
          {h1} {span && <span>{span}</span>}
        </h1>
      )}
      {p && <p>{p}</p>}
    </div>
  );
};

export default SunCityHero;