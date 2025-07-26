import React from "react";
import image from "../../assets/suncity-kids.jpg";

const program = {
  title: "SunCity Kids",
  age: "Ages 0 – 12",
  description:
    "SunCity Kids is a vibrant, Christ-centered ministry designed to help children grow in their understanding of God’s love from an early age. In a fun, safe, and nurturing environment, kids engage with Scripture through age-appropriate Bible lessons, worship songs, colorful stories, creative crafts, and interactive games. Every Sunday, our passionate team of teachers and volunteers creates a space where children not only learn about Jesus but build real friendships, discover their God-given purpose, and are inspired to walk boldly in faith — even at a young age.",
  image,
};

const SuncityPrograms = () => {
  return (
    <section className="suncity-programs">
      <div className="program-card">
        <div className="text-content">
          <h3>{program.title}</h3>
          <p><strong>{program.age}</strong></p>
          <p>{program.description}</p>
        </div>
        <img src={program.image} alt={program.title} />
      </div>
    </section>
  );
};

export default SuncityPrograms;