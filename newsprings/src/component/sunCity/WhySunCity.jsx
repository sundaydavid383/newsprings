import React from "react";
import worshipImg from "../../assets/worship.jpg";
import bibleImg from "../../assets/bible.jpg";
import gamesImg from "../../assets/games.jpg";

const WhySunCity = () => {
  return (
    <section className="suncity-why">
      <h2>Why SunCity?</h2>
      <p className="intro-text">
        At SunCity, we believe every child is a gift from God and deserves a place
        where they can thrive spiritually, emotionally, and socially. That’s why
        we’ve created a fun, vibrant environment where kids can grow in their
        faith, discover their purpose, build godly friendships, and experience
        the joy of knowing Jesus — all while having the time of their lives!
      </p>

      <div className="why-features">
        <div className="why-card shock-animation">
          <img src={worshipImg} alt="Kids Worship" />
          <h3>Joyful Worship</h3>
          <p>
            At SunCity, kids don’t just watch — they participate! Through upbeat
            music, dance, and heartfelt praise, they learn to express their love
            for Jesus with boldness and joy.
          </p>
        </div>

        <div className="why-card shock-animation">
          <img src={bibleImg} alt="Bible Lessons" />
          <h3>Bible Adventures</h3>
          <p>
            God’s Word comes alive every week through exciting stories, creative
            skits, hands-on activities, and simple truths that kids can apply to
            their everyday lives.
          </p>
        </div>

        <div className="why-card shock-animation">
          <img src={gamesImg} alt="Fun and Games" />
          <h3>Godly Fun</h3>
          <p>
            From energetic games to team-building challenges, we use play as a
            powerful tool to help kids laugh, learn, and form strong bonds —
            all while keeping Jesus at the center of it all.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhySunCity;