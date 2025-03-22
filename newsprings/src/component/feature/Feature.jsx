import React from 'react'
import "./feature.css"
import { Link } from "react-router";

import church1 from "../../assets/church8.jpg"
import church2 from "../../assets/church10.jpg"
import church3 from "../../assets/church11.jpg"


const Feature = () => {
  const features = [
    {
      imgSrc: church1,
      altText: "Worship Service",
      title: "Join Our Worship",
      description: "We can’t wait to welcome you in person or online! Information is available to answer questions ahead of time about your visit so you can feel at home right away in the church service durinig the week.",
      link: "/worship"
    },
    {
      imgSrc: church2,
      altText: "Bible Study",
      title: "Grow in Faith",
      description: "Children’s ministry (birth through sixth grade) is available at all campuses during weekend services, and registration is not required in the expense of this year inspite of the tribulation in faith.",
      link: "/bible-study"
    },
    {
      imgSrc: church3,
      altText: "Community Service",
      title: "Serve with Us",
      description: "Are you looking for meaningful ways to connect with others in the Gateway family? There are resources available to help you find a group, host a weekend-sermon watch party, or dive deeper in your personal relationship with Jesus.",
      link: "/serve"
    }
  ];
  return (
    <div className='features '>
      <div className="feature_top container">
      <iframe width="853" height="480" src="https://www.youtube.com/embed/0L9_QRUSDGY" title="Word Quest || Pastor Olusola Adewole ||  Living in the New Covenant || 18th of March, 2025" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
       <div className="feature_text">
        <h1>“When the Church Prays” by Pastor Shola </h1>
        <small>March 16, 2025</small>
        <p>What do we do when setbacks come our way? Pastor Daniel Floyd continues our Follow Me series, revealing the power of prayer as a spiritual weapon and showing us that while setbacks are inevitable, defeat doesn’t have the final word. Join us as we learn how a praying church can overcome every obstacle and walk in the victory God has promised.</p>
       </div>
      </div>
      <div className="feature_bottom container">
        {features.map((feature, index)=>( <div key={index} className="feature_card">
          <img src={feature.imgSrc} alt="" />
          <h2>{feature.title}</h2>
          <p>{feature.description}</p>
          <Link to={feature.link}>{feature.altText} <i class="fa-solid fa-caret-right"></i></Link>
        </div>))}
       
      
      </div>
      
    </div>
  )
}

export default Feature
