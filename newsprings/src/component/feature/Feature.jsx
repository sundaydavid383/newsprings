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
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
  const horuku_url = `https://api.allorigins.win/raw?url=https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  const APi_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&order=date&part=snippet&type=video&maxResult=1`;

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        const response = await fetch(horuku_url);
        const xmlText = await response.text();
    
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, "application/xml");
    
        const entries = xml.querySelectorAll("entry");
    
        for (let entry of entries) {
          const videoIdTag = entry.getElementsByTagName("yt:videoId")[0] || entry.getElementsByTagName("videoId")[0];
          const titleTag = entry.querySelector("title");
    
          const videoId = videoIdTag?.textContent;
          const title = titleTag?.textContent;
    
          if (videoId && !videoId.includes("RESTRICTED")) {
            setVideoId(videoId);
            setTitle(title);
            return;
          }
        }
    
        console.log("No suitable videos found in the feed.");
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      }
    };
    fetchLatestVideo()
  }, [])
  
  const featureType = "homepage";
  const features = [
    {
      imgSrc: "https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-6/490746010_1096424042511543_3841843314015306465_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeHQqodBRiFeFIWO-1StuM1hDz1ih53oqpEPPWKHneiqkcd8vKbCn5BsPW9G_14MTBCT26rgXbqmur4wjwFpusou&_nc_ohc=ExIQxVR1YT4Q7kNvwFrRy6z&_nc_oc=AdljrJ5tHBHCeHWf4t9lE65qHVuWJwdPdk_NLBUg0zSYngvRXAm2ghp9WEQyISkMpv8&_nc_zt=23&_nc_ht=scontent-los2-1.xx&_nc_gid=MdZbus1ZElJakk1wZoTKXQ&oh=00_AfFqIWUnVY6y-Z-9eSB9SAPUWqB6ZYNZimjhVFL_6dyw9Q&oe=6815E6C7",
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

          <p>
          No video found. Please refresh the page or check your connection or, 
          <a href="https://www.youtube.com/@RCCGNewSprings"> here</a> to watch it on YouTube.
        </p>
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
