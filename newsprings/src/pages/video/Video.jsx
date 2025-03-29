import React, { useEffect } from "react";
import "./video.css";
import { Link } from "react-router";
import FeatureBottom from "../../component/feature/FeatureBottom";
import { useLocation, useParams } from "react-router";

const Video = ({ setActivePage }) => {
  useEffect(() => {
    setActivePage("sermons");
  }, []);
  const { id } = useParams();
  const location = useLocation();
  const sermon = location.state?.sermon;
  let relatedvideo = location.state?.relatedSermon || []; // Ensure fallback to empty array
  const featureType = "relatedsermon";

  const getRandomSermons = (cards, count = 3) => {
    if (!cards || cards.length <= 1) return [];
  
    // Create a new array to prevent mutation
    let availableCards = [...cards];
  
  
    // Shuffle the available cards
    for (let i = availableCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableCards[i], availableCards[j]] = [availableCards[j], availableCards[i]];
    }
  
    // Return a slice of the shuffled array
    console.log(availableCards)
    return availableCards;
   
  };

  relatedvideo = getRandomSermons(relatedvideo)


  return (
    <>
      {!sermon ? (
        <h2>No sermon data found</h2>
      ) : (
        <div className="video">
          <Link className="goback iconactive" to="/sermon">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <iframe
            width="110"
            src={sermon.youtubeLink}
            title={sermon.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <div className="text">
            <h3>{sermon.title}</h3>
            <p className="date">
              <strong>Date:</strong> {sermon.date}
            </p>
            <p className="description">{sermon.description}</p>
          </div>

          {/* Display related videos if available */}
          {relatedvideo.length > 0 ? (
            <FeatureBottom cards={relatedvideo} featureType={featureType} />
          ) : (
            <p>No related videos found...</p>
          )}
        </div>
      )}
    </>
  );
};

export default Video;