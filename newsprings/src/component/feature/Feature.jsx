import React, { useEffect, useState } from "react";
import "./feature.css";
import axios from 'axios';
import church1 from "../../assets/church8.jpg";
import church2 from "../../assets/church10.jpg";
import church3 from "../../assets/church11.jpg";
import FeatureBottom from "./FeatureBottom";

const Feature = () => {
  const [videoId, setVideoId] = useState(null);
  const [title, setTitle] = useState("");
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState("")
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("")

  const API_KEY = import.meta.env.VITE_API_KEY;
  const CHANNEL_ID = "UCjFN5R2r5U8avPicFnDjkng";
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
  const horuku_url = `https://api.allorigins.win/raw?url=https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  const APi_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&order=date&part=snippet&type=video&maxResult=1`;
    const baseUrl = 'https://newsprings.onrender.com/'
  const extractDateFromTitle = (title) =>{
    const match = title.match(/\d{1,2}(st|nd|rd|th)? of \w+,? \d{4}/i);
    return match ? match[0] : null;
   }
       
       const fetchDescription = async () => {
         try {
           setLoading(true)
           const res = await axios.get(`${baseUrl}api/service-description`);
           setDescription(res.data.data.description || "no description");
           setLoading(false)
           console.log("Description Response:", res.data);
         } catch (err) {
           console.error("Failed to fetch description", err);
           setLoading(false)
           setAlert(true)
           setAlertText("unable to receive services text description data")
         }
       };
   

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
          fetchDescription();
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
 



  return loading ? (
<div className="testimonyFormLoader">
  <div className="loader"></div>
</div>
  ) : alert ?(
    <div className="alert_holder">
    <div className="alert">
      <p>{alertText}</p>
      <div onClick={() => setAlert(false)} className="btn">
        <p>OK</p>
      </div>
    </div>
  </div>
  )
  :
  (
    <div className="features">
      {!videoId ? (
        <p>
          No video found. Please refresh the page or check your connection or,
          <a href="https://www.youtube.com/@RCCGNewSprings"> here</a> to watch it on YouTube.
        </p>
      ) : (
        <div className="feature_top container">
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
  
          <div className="feature_text">
            <h1>{title}</h1>
            <span>{extractDateFromTitle(title)}</span>
            <p>{description.split(0,200)}</p>
          </div>
        </div>
      )}
      <FeatureBottom cards={features} featureType={featureType} />
    </div>
  );
}
  
  

export default Feature;
