import React, { useEffect,  useState } from 'react'
import ShadowTextHero from '../../component/shadowtextHero/ShadowTextHero'
import FeatureBottom from '../../component/feature/FeatureBottom'

const Sermon = ({setActivePage}) => {
  const [descirptionDetails, setsetDescirptionDetails] = useState([])
 


    


  const featureType = "sermon"
  const CHANNEL_ID = "UCjFN5R2r5U8avPicFnDjkng";
  const CORS_PROXY = "https://api.allorigins.win/raw?url=";
  const FEED_URL = `${CORS_PROXY}https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  
  const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
  
  useEffect(() => {
      setActivePage("sermons");

      const localData = localStorage.getItem("sermonVideos");
      if (localData) {
        setVideos(JSON.parse(localData));
      }
      // Fetch the feed from YouTube
      // and store it in localStorage
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const [descripresponse, feedResponse] = await Promise.all([ fetch(`${import.meta.env.VITE_API_URL}api/sermon-configs`),fetch(FEED_URL)])
        
        
        const descripdata = await descripresponse.json()
        console.log("descripitonResponse:", descripdata)

        const xmlText = await feedResponse.text();
  
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, "application/xml");
        const entries = xml.getElementsByTagName("entry");
  
        const data = Array.from(entries).map((entry, index) => {
          const title = entry.querySelector("title")?.textContent;
          const videoId = entry.getElementsByTagName("yt:videoId")[0]?.textContent;
          const published = entry.querySelector("published")?.textContent;
  
          // Get description or add a default
          let description =
            entry.querySelector("media\\:description")?.textContent?.trim();
  
          if (!description) {
            description = descripdata[index]?.description;
          }
  
          const thumbnail = entry.getElementsByTagName("media:thumbnail")[0]?.getAttribute("url");
  
          return {
            title,
            videoId,
            date: new Date(published).toLocaleDateString(),
            description,
            imgSrc: thumbnail,
            preacher: descripdata[index]?.preacher, // Optional: you can change this dynamically
          };
        });

        localStorage.setItem("sermonVideos", JSON.stringify(data));
        
        setLoading(false);
        setVideos(data);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch feed", error);
      }
       finally {
      setLoading(false);
    }
    };

      fetchFeed()
  }, []);
//   return (
//     <div>
//       <h2>Latest Videos</h2>
//       {videos.map((video) => (
//         <div key={video.videoId} style={{ marginBottom: "20px" }}>
//           <img src={video.thumbnail} alt={video.title} width="320" />
//           <h3>{video.title}</h3>
//           <p>{video.description}</p>
//           <p><strong>Published:</strong> {new Date(video.published).toLocaleString()}</p>
//           <a href={video.link} target="_blank" rel="noopener noreferrer">
//             Watch on YouTube
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// };

return loading ? (
  <div className="loader_holder testimony_loading">
    <div className="loading_card">
      <div className="loading_img"></div>
      <div className="loading_title"></div>
      <div className="loading_details"></div>
      <div className="loading_text"></div>
      <div className="loading_btn"></div>
    </div>
    <div className="loading_description">
      <div className="loading_text"></div>
      <div className="iframe"></div>
    </div>
  </div>
)
  : (
    <div className='sermon'>
       <ShadowTextHero/>
       <FeatureBottom cards={videos} featureType={featureType}/>
    </div>
  )
}

export default Sermon

