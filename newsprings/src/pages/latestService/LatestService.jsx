import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LatestService.css"

const LatestService = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState("unable to receive service data")
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState("")
  const [isError, setIsError] = useState(false);
  const CHANNEL_ID = "UCjFN5R2r5U8avPicFnDjkng";
  const baseUrl = 'https://newsprings.onrender.com/'
 const extractDateFromTitle = (title) =>{
  const match = title.match(/\d{1,2}(st|nd|rd|th)? of \w+,? \d{4}/i);
  return match ? match[0] : null;
 }

  useEffect(() => {
    
    const fetchDescription = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${baseUrl}api/service-description`);
        setDescription(res.data.data.description || "no description");
        setLoading(false)
      } catch (err) {
        console.error("Failed to fetch description", err);
        setLoading(false)
      }
    };

    fetchDescription();
  }, []);

  const fetchVideoFromFeed = async (feedUrl) => {
    const res = await axios.get(feedUrl);
    const parser = new DOMParser();
    const xml = parser.parseFromString(res.data, "text/xml");
    const entries = xml.getElementsByTagName("entry");
    if (entries.length > 0) {
      const firstEntry = entries[0];
      const title = firstEntry.getElementsByTagName("title")[0].textContent;
      const link = firstEntry.getElementsByTagName("link")[0].getAttribute("href");
      const published = firstEntry.getElementsByTagName("published")[0].textContent;

      // Extract video ID from the link
      const videoId = new URL(link).searchParams.get("v");
      return { title, videoId, published };
    } else {
      throw new Error("No entries found");
    }
  };

  useEffect(() => {
    const tryFetchLiveOrLatest = async () => {
      const liveFeedURL = `https://api.allorigins.win/raw?url=https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}/live`;
      const latestFeedURL = `https://api.allorigins.win/raw?url=https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

      try {
        setLoading(true)
        const liveVideo = await fetchVideoFromFeed(liveFeedURL);
        setVideo({ ...liveVideo, type: "Live Service" });
        setLoading(false)
      } catch (liveError) {
        setLoading(true)
        console.warn("No live video found. Fetching latest upload...");
        try {
          const latestVideo = await fetchVideoFromFeed(latestFeedURL);
          setVideo({ ...latestVideo, type: "Latest Upload" });
          setLoading(false)
        } catch (latestError) {
          console.error("Failed to fetch latest video:", latestError);
          setIsError(true);
          setLoading(false)
        }
      }
    };

    tryFetchLiveOrLatest();
  }, []);

  if (isError) {
    return (
      <div className="alert_holder">
      <div className="alert">
        <p>{alertText}</p>
        <div onClick={() => setAlert(false)} className="btn">
          <p>OK</p>
        </div>
      </div>
    </div>
    );
  }
  if (loading){
    return (
      <div className="EasterLoader">
  <div className="visualizer">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>
    )
  }

  return video ? (
    <div className="live_video">
      <h2 className="">{video.type}</h2>
      <div className="">
        <iframe
          className="w-full h-full rounded-xl"
          src={`https://www.youtube.com/embed/${video.videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p className="video_title">{video.title}</p>
      <p className="video_date">
       {extractDateFromTitle(video.title) || new Date(video.published).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <p className="description">{description}</p>
    </div>
  ) : (
    <div className="testimonyFormLoader">
  <div className="loader"></div>
</div>
  );
};

export default LatestService;