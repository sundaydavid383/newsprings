import React from 'react';
import './sectionHighlight.css';

const SectionHighlight = ({ image, title, paragraphs = [] }) => {
  return (
    <div className="career_hero">
      <img src={image} alt="Section highlight" />
      <div className="text">
        <h3>{title}</h3>
        {paragraphs.map((para, index) => (
          <p key={index}>{para}</p>
        ))}
      </div>
    </div>
  );
};

export default SectionHighlight;