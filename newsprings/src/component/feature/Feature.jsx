import React, { useEffect, useState } from "react";
import "./feature.css";
import church1 from "../../assets/church8.jpg";
import church2 from "../../assets/church10.jpg";
import church3 from "../../assets/church11.jpg";
import FeatureBottom from "./FeatureBottom";

const Feature = () => {
  const [videoId, setVideoId] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const CHANNEL_ID = "UCjFN5R2r5U8avPicFnDjkng";
  const APi_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&order=date&part=snippet&type=video&maxResult=1`;

  useEffect(() => {
    const fetchUpdatedData = async () => {
      setLoading(true);
      const response = await fetch(APi_URL);
      const data = await response.json();
      console.log("Fetched Data:", data); // Check the fetched data

      if (data.items[0] && data.items[0].id.videoId) {
        setTitle(data.items[0].snippet.title);
        setVideoId(data.items[0].id.videoId);
        setLoading(false);
      } else {
        setLoading(false);
        setTitle("Error fetching the data");
        setVideoId(null);
      }
    };
    fetchUpdatedData();
  }, []);

  const featureType = "homepage";
  const features = [
    {
      imgSrc: church1,
      altText: "Worship Service",
      title: "Join Our Worship",
      description:
        "We can’t wait to welcome you in person or online! Information is available to answer questions ahead of time about your visit so you can feel at home right away in the church service during the week.",
      link: "/worship",
    },
    {
      imgSrc: church2,
      altText: "Bible Study",
      title: "Grow in Faith",
      description:
        "Children’s ministry (birth through sixth grade) is available at all campuses during weekend services, and registration is not required in the expense of this year in spite of the tribulation in faith.",
      link: "/bible-study",
    },
    {
      imgSrc: church3,
      altText: "Community Service",
      title: "Serve with Us",
      description:
        "Are you looking for meaningful ways to connect with others in the Gateway family? There are resources available to help you find a group, host a weekend-sermon watch party, or dive deeper in your personal relationship with Jesus.",
      link: "/serve",
    },
  ];

  return (
    <div className="features">
      <div className="feature_top container">
        {videoId && !loading ? (
      <div className="iframe">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <p>
        If the video does not load, click  
        <a href="https://www.youtube.com/@RCCGNewSprings"> here</a> to watch it on YouTube.
      </p>
    </div>
          
        ) : loading ? (
          <div className="loading"></div>
        ) : !loading && !videoId ? (
          <p>No live stream currently available. Please refresh the page.</p>
        ) : 
        null
        }

        <div className="feature_text">
          <h1>{title}</h1>
          <span>Match 4 2025</span>
          <p>
            What do we do when setbacks come our way? Pastor Daniel Floyd
            continues our Follow Me series, revealing the power of prayer as a
            spiritual weapon and showing us that while setbacks are inevitable,
            defeat doesn’t have the final word. Join us as we learn how a
            praying church can overcome every obstacle and walk in the victory
            God has promised.
          </p>
        </div>
      </div>
      <FeatureBottom cards={features} featureType={featureType} />
    </div>
  );
};

export default Feature;
