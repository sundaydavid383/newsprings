import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LatestService.css"

const LatestService = () => {
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState("")
  const [isError, setIsError] = useState(false);
  const CHANNEL_ID = "UCjFN5R2r5U8avPicFnDjkng";



  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/service-description");
        setDescription(res.data.data.description || "no description");
      } catch (err) {
        console.error("Failed to fetch description", err);
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
        const liveVideo = await fetchVideoFromFeed(liveFeedURL);
        setVideo({ ...liveVideo, type: "Live Service" });
      } catch (liveError) {
        console.warn("No live video found. Fetching latest upload...");
        try {
          const latestVideo = await fetchVideoFromFeed(latestFeedURL);
          setVideo({ ...latestVideo, type: "Latest Upload" });
        } catch (latestError) {
          console.error("Failed to fetch latest video:", latestError);
          setIsError(true);
        }
      }
    };

    tryFetchLiveOrLatest();
  }, []);

  if (isError) {
    return (
      <div className="">
        <h2 className="">No Service Found</h2>
        <p className="">
          We couldn’t find any live or recent service. Please check back later or visit our YouTube channel.
        </p>
      </div>
    );
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
       {new Date(video.published).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <p className="description">{description}</p>
    </div>
  ) : (
    <p className="text-gray-600">Checking for a live service...</p>
  );
};

export default LatestService;