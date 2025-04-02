import React from "react";
import "./feature.css";
import { Link } from "react-router";

const FeatureBottom = ({ cards, featureType }) => {
  
  const relatedcards = cards.slice(0, 3)


  return (
    <div className="feature_bottom container">
      {featureType === "homepage" ? (
        cards.map((feature, index) => (
          <div key={index} className="feature_card">
            <img src={feature.imgSrc} alt="" />
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
            <Link to={feature.link}>
              {feature.altText} <i class="fa-solid fa-caret-right"></i>
            </Link>
          </div>
        ))
      ) :
      featureType === "giving" ? (
        cards.map((feature, index) => (
          <div key={index} className="feature_card giving_card">
            <img src={feature.imgSrc} alt="" />
            <div className="feature_text">
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
            </div>
         
          </div>
        ))
      ) 
      : featureType === "sermon" ? (
        !cards || !Array.isArray(cards) || cards.length === 0 ? (
          <p>unable to load data an error occured</p>
        ) : (
          cards.map((sermon, index) => (
            <Link
              to={`/video/${index}`}
              state={{
                sermon: sermon,
                relatedSermon: cards,
              }}
              key={index}
              className="sermon_card"
            >
              <img
                src={sermon.imgSrc}
                alt={sermon.title}
                className="sermon_thumbnail"
              />
              <div className="text">
                <h2>{sermon.title}</h2>
                <div className="details">
                  <p>
                    <strong>Preacher:</strong> {sermon.preacher}
                  </p>
                  <p>
                    <strong>Date:</strong> {sermon.date}
                  </p>
                </div>
                <p className="description">{sermon.description}</p>
              </div>
            </Link>
          ))
        )
      ) :
      featureType === "relatedsermon" ? (
        !cards || !Array.isArray(cards) || cards.length === 0 ? (
          <p>unable to load data an error occured</p>
        ) : (
          relatedcards.map((sermon, index) => (
            <Link
              to={`/video/${index}`}
              state={{
                sermon: sermon,
                relatedSermon: cards,
              }}
              key={index}
              className="sermon_card"
            >
              <img
                src={sermon.imgSrc}
                alt={sermon.title}
                className="sermon_thumbnail"
              />
              <div className="text">
                <h2>{sermon.title}</h2>
                <div className="details">
                  <p>
                    <strong>Preacher:</strong> {sermon.preacher}
                  </p>
                  <p>
                    <strong>Date:</strong> {sermon.date}
                  </p>
                </div>
                <p className="description">{sermon.description}</p>
              </div>
            </Link>
          ))
        )
      ) : null}
    </div>
  );
};

export default FeatureBottom;
