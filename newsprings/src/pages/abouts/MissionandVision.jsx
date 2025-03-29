import React, { useEffect, useState } from "react";
import "./missionandvision.css"

import { Link } from "react-router";


const MissionandVision = ({setActivePage}) => {
  
     useEffect(() => {
       setActivePage("about")
     }, [])
     
  return (

    <div className="about">
       <ul className="about_nav">
        <li >
          <Link  className={`liactive`} to="/mission-and-vision">Mission and Vision</Link>
        </li>
        <li className={``}>
          <Link to="/core-values">Core Values</Link>
        </li>
        <li className={``}>
          <Link to="/stories">Stories</Link>
        </li>
        <li className={``}>
          <Link to="/general">General Overseer</Link>
        </li>
        <li className={``}>
          <Link to="/our-pastor">Our Pastor</Link>
        </li>
        <li className={``}>
        <Link to="/career">Career</Link>
        </li>
      </ul>
     <div className="about_text">
  <h1>About Us</h1>
  <div className="abouts_p">
    <p>
      Welcome to RCCG New Springs, a vibrant community of believers dedicated to worship, spiritual growth, and impacting lives. 
      As a parish of The Redeemed Christian Church of God, we are committed to spreading the love of Christ, teaching the undiluted Word of God, 
      and fostering an atmosphere where people can experience true transformation.
    </p>
    <p>
      Our mission is to raise disciples who will shine as lights in their communities, bringing hope, faith, and love to the world. 
      Whether you're joining us for the first time or you're a long-time member, we invite you to experience God's presence with us. 
      There is a place for you at RCCG New Springs!
    </p>
  </div>
</div>
<div className="getstarted">
  <h3>Join Us on This Journey</h3>
  <p>
    Are you looking for a place to grow spiritually and connect with a loving family in Christ? 
    RCCG New Springs welcomes you with open arms! 
    Get involved in our <Link to="/service">worship services</Link>, Bible studies, and outreach programs.  
    Come, <Link to="/connect">connect with us</Link> and experience the transforming power of God's presence.
  </p>
</div>
    <div className="about_links">
      <Link></Link>
      <Link to="/core-values">Core values <i class="fa-solid fa-caret-right"></i></Link>
    </div>
    </div>
  );
};

export default MissionandVision;
