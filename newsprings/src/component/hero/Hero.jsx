import React, { useEffect, useState } from "react";
import "./hero.css"
import image1 from "../../assets/church1.jpg"
import image2 from "../../assets/church2.jpg"
import image3 from "../../assets/church3.jpg"
import image4 from "../../assets/church4.jpg"
import Feature from "../feature/Feature";
import { Link } from "react-router";

const Hero = () => {
  const [printedTalk, setPrintedTalk] = useState(0)
  const [printedSection, setPrintedSection] = useState(0)
  const section = [
    {
      id:1,
      header: "Join Us for Worship",
      headerspan: "This Sunday!",
      ps: [
        "Experience God’s presence in a powerful way. Worship with us and grow in faith.",
        "Stay connected through prayer, fellowship, and impactful teachings."
      ],
      sectionimage:image1
      
    },
    
    {
      id:2,
      header: "Grow in Faith",
      headerspan: "With Us!",
      ps: [
        "Deepen your relationship with God through sound teachings and worship.",
        "Join our Bible studies and small groups to stay spiritually nourished."
      ],
      sectionimage:image2
    },
    
    {
      id:3,
      header: "Prayer Changes Things",
      headerspan: "Let’s Pray!",
      ps: [
        "Bring your burdens to the Lord in prayer. We stand with you in faith.",
        "Join our intercessory prayers and experience God’s divine intervention."
      ],
      sectionimage:image3
    },
    
    {
      id:4,
      header: "Serve with Purpose",
      headerspan: "Get Involved!",
      ps: [
        "Use your gifts to glorify God. Volunteer and make a difference in His kingdom.",
        "Join one of our ministries and be a blessing to others."
      ],
      sectionimage:image4
    }
  ];

  let sectionTracker = 0
useEffect(() => {


  const sectionInterval = setInterval(() => {
    sectionTracker++
    setPrintedSection(sectionTracker % 4)

    setTimeout(() => {
      console.log("tracker:",sectionTracker,   "printedsection:",printedSection)
    }, 2000);
  
  }, 4000);



  return () => {
    clearInterval(sectionInterval);
  }
}, [])
 
  
 
  return (
    section.map((page, index)=>(
      index === printedSection ? <div key={index} className={`hero hero${page.id}  container`}>



{printedSection >= 1?<div onClick={()=>{setPrintedSection(prev=>prev-1)}} className="moveleft iconactive"><i className="fa-solid fa-arrow-left-long"></i></div>:null}
{printedSection <= 2?<div onClick={()=>{setPrintedSection(prev=>prev+1)}} className="moveright iconactive"><i className="fa-solid fa-arrow-right-long"></i></div>:null}
      <div className="text">
        <h1>{page.header}<span> {page.headerspan}</span></h1>
        <div className="ps">
          {page.ps.map(p=><p key={p}>{p}</p>)} 
        </div>
        <Link className="btn" to="/connect">
          <p>
            CONTACT <i className="fa-solid fa-arrow-right-long"></i>
          </p>
        </Link>
      </div>
       <div className="image">
        <img className="person" src={page.sectionimage} alt="" />
      </div> 
   
    </div>:null 
        
    
    ))
  );
};

export default Hero;
