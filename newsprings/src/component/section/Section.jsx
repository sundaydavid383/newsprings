import React from 'react'
import "./section.css"
import church1 from "../../assets/church12.jpg"
import church2 from "../../assets/church13.jpg"
import church3 from "../../assets/church14.jpg"
import church4 from "../../assets/church15.jpg"
import church5 from "../../assets/church5.jpg"
import church6 from "../../assets/church6.jpg"
import church7 from "../../assets/church7.jpg"
import { Link } from 'react-router'

const Section = () => {
    const churchPrograms = [
        {
          imgSrc: church1,
          altText: "Easter Celebration",
          title: "Easter Celebration",
          description: "Celebrate Christ's resurrection with a special service, powerful worship, and meaningful fellowship as we honor this life-changing event together.",
          link: "/easter",
          btnText: "Join Us"
        },
        {
          imgSrc: church2,
          altText: "Church Prayer and fasting",
          title: "Church Prayer and fasting",
          description: "Join us for our 100 Days of Prayer and Fasting every January. This is a time to seek God's guidance, deepen your faith, and experience spiritual transformation as we pray and fast together.",
          link: "/prayer-and-fasting",
          btnText: "prayer and fasting"
        },
        {
          imgSrc: church3,
          altText: "Revival Service",
          title: "Revival Service",
          description: "A time of refreshing in God’s presence with powerful worship, word, and miracles.",
          link: "/revival",
          btnText: "Be Revived"
        },
        {
          imgSrc: church4,
          altText: "Christmas Service",
          title: "Christmas Service",
          description: "Rejoice in the birth of Jesus Christ with carols, a special message, and love.",
          link: "/christmas",
          btnText: "Celebrate"
        }
      ];
    const churchInto = [
        {
            link:"/lastestservice",
            img:church6,
            h1:"Join Our Live Service",
            p:"Experience powerful worship, inspiring sermons, and the presence of God from wherever you are.",
            spanText:"Watch Live"
        },
        {
            link:"/mission-and-vision",
            img:church7,
            h1:"Who We Are",
            p:"Discover our mission, vision, and core values as a church committed to spreading God’s love.",
            spanText:"Get to Know Us"
        }
    ]
  return (
    <div className='sections'>
       <div className="first-section container">
    {churchPrograms.map((program,index)=>(
           <Link key={index} to={program.link}><img src={program.imgSrc} alt="" /><div className="text"><h1>{program.title}</h1>
           <p>{program.description}</p>
           <div className="link">{program.btnText} <i className="fa-solid fa-caret-right"></i></div></div></Link>
    ))}
     
      
       </div>
       <div className="middle-section container">
  <img src={church5} alt="Church Event" />
  <div className="text">
  <p>
    "In every season of life, God remains faithful. As a church, we are called to be the light 
    in a dark world, to love unconditionally, and to serve wholeheartedly. Together, we stand as a family, 
    growing in faith, strengthening one another, and advancing God’s kingdom. No matter the challenges. Let us press forward, worshiping in 
    spirit and in truth, and being vessels of His glory."
    “But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.”
  </p>
  <span> Isaiah 40:31</span>
  </div>
 
</div>
       <div className="last-section container">
        {churchInto.map((Intro, index)=>(
     <Link key={index} to={Intro.link}>
     <img src={Intro.img} alt="Live Service" />
     <div className="text">
       <h2>{Intro.h1}</h2>
       <p>{Intro.p}</p>
       <span>{Intro.spanText} <i className="fa-solid fa-caret-right"></i></span>
     </div>
   </Link>
        ))}
  

       </div>
    </div>
  )
}

export default Section
