import React, { useState, useEffect } from "react";
import "./prayerAndFasting.css";
import axios from 'axios';

const PrayerAndFasting = () => {
  const [texts, setTexts] = useState(null);
  const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false)
    const [alertText, setAlertText] = useState("unable to receive prayer and fasting data")

  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:4000/api/prayer-and-fasting')
      .then(res =>{ setTexts(res.data); console.log(res.data); setLoading(false)})
      .catch(err => {console.error("Fetch failed", err); setLoading(false)});
  }, []);


  if (loading) return     <div className="testimonyFormLoader">
  <div className="loader"></div>
</div>; // Wait until data is loaded

  if(!texts) 
   return  <div className="alert_holder">
      <div className="alert">
        <p>{alertText}</p>
        <div onClick={() => setAlert(false)} className="btn">
          <p>OK</p>
        </div>
      </div>
    </div>


  return (
    <div className="prayerandfasting container">
    <img className="first_image" src={texts.image1} alt="" />
      <header className="prayer-header">
        <h1>{texts.header.title}</h1>
        <p>{texts.header.subtitle}</p>
      </header>

      <main className="prayer-main">
        <section className="prayer-section">
          <h2>Why We Fast</h2>
          <p>{texts.whyFast[0]}</p>
          <blockquote>{texts.whyFast[1]}</blockquote>
          <ul>
            {texts.whyFast.slice(2).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        {texts.videoId && (
  <div className="videoContainer">
    <iframe
      src={`https://www.youtube.com/embed/${texts.videoId}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
)}
        <section className="prayer-section">
          <h2>How to Participate</h2>
          <ul>
            {texts.howToParticipate.slice(0, 6).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <blockquote>{texts.howToParticipate[6]}</blockquote>
        </section>

        <section className="prayer-section">
          <h2>Weekly Prayer Focus</h2>
          <ul>
            {texts.prayerFocus.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="prayer-section">
          <h2>Schedule</h2>
          <ul>
            {texts.schedule.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="prayer-section">
          <h2>Gallery</h2>
          <div className="prayer-gallery">
            {texts.gallery.map((img, index) => (
              <img key={index} src={img.src} alt={img.alt} />
            ))}
          </div>
        </section>

        <section className="prayer-section join">
          <h2>Join Us</h2>
          {texts.join.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </section>
      </main>

   
    </div>
  );
};

export default PrayerAndFasting;
