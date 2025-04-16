import React, { useEffect,  useState } from 'react'
import ShadowTextHero from '../../component/shadowtextHero/ShadowTextHero'
import FeatureBottom from '../../component/feature/FeatureBottom'

const Sermon = ({setActivePage}) => {
  const [descirptionDetails, setsetDescirptionDetails] = useState([])
  useEffect(() => {
    setActivePage("sermons")
  }, [])
    


  const featureType = "sermon"
  const CHANNEL_ID = "UCjFN5R2r5U8avPicFnDjkng";
  const CORS_PROXY = "https://api.allorigins.win/raw?url=";
  const FEED_URL = `${CORS_PROXY}https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  
  const [videos, setVideos] = useState([]);
  
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const [descripresponse, feedResponse] = await Promise.all([ fetch("http://localhost:4000/api/sermon-configs"),fetch(FEED_URL)])
        
        
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
  
        setVideos(data);
      } catch (error) {
        console.error("Failed to fetch feed", error);
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


  return (
    <div className='sermon'>
       <ShadowTextHero/>
       <FeatureBottom cards={videos} featureType={featureType}/>
    </div>
  )
}

export default Sermon

