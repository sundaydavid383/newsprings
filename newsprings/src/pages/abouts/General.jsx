import React from 'react'
import pastor from "../../assets/pastor.jpg"
import image1 from "../../assets/pastor1.jpg"
import image2 from "../../assets/pastor2.jpg"
import image3 from "../../assets/pastor3.jpg"
import image4 from "../../assets/pastor4.jpg"
import image5 from "../../assets/pastor5.jpg"
import "./general.css"
import { Link } from 'react-router'

const General = () => {
    const sermons = [
        {
          name: "Pastor E.A. Adeboye",
          title: "The Wonders of Divine Encounter",
          date: "2024-03-10",
          soundcloudUrl: "https://soundcloud.com/rccg-overseer/the-wonders-of-divine-encounter",
          imageUrl: image4
        },
        {
          name: "Pastor E.A. Adeboye",
          title: "The God of All Possibilities",
          date: "2024-02-25",
          soundcloudUrl: "https://soundcloud.com/rccg-overseer/the-god-of-all-possibilities",
          imageUrl: image5
        },
        {
          name: "Pastor E.A. Adeboye",
          title: "Let There Be Light",
          date: "2024-01-14",
          soundcloudUrl: "https://soundcloud.com/rccg-overseer/let-there-be-light",
          imageUrl: image3
        },
        {
          name: "Pastor J.F. Odesola",
          title: "The Power of Consistency in Prayer",
          date: "2024-03-05",
          soundcloudUrl: "https://soundcloud.com/rccg-overseer/the-power-of-consistency-in-prayer",
          imageUrl: image2
        },
        {
          name: "Pastor E.A. Adeboye",
          title: "Divine Acceleration",
          date: "2023-12-17",
          soundcloudUrl: "https://soundcloud.com/rccg-overseer/divine-acceleration",
          imageUrl: image1
        }
      ];
  return (
    
    <div className="about general">
          <ul className="about_nav">
     <li
     >
       <Link to="/mission-and-vision">Mission and Vision</Link>
     </li>
     <li >
       <Link  className={``} to="/core-values">Core Values</Link>
     </li>
     <li className={``}>
       <Link to="/stories">Stories</Link>
     </li>
     <li >
       <Link className={`liactive`} to="/general">General Overseer</Link>
     </li>
     <li className={``}>
       <Link to="/our-pastor">Our Pastor</Link>
     </li>
     <li className={``}>
      <Link to="/career">Career</Link>
     </li>
   </ul>
        <h2>The General Overseer</h2>
        <div className="genral_overseer_words">
            <div className="image">
                <img src={pastor} alt="" />
                </div>
                <div className="text">
                    <p>
                    Pastor Enoch Adejare Adeboye is the General Overseer of Redeemed Christian Church of God (RCCG).

                Pastor Adeboye has a PhD in applied mathematics from the University of Lagos, and worked as a lecturer in mathematics at the universities of Lagos and Ilorin. After joining the RCCG, he began working to translate the sermons of its then Pastor and Founder, Rev. Josiah Olufemi Akindayomi, from Yoruba into English.</p>

                <p>In 1981 Adeboye was appointed General Overseer of the Church, taking over from Papa Akindayomi, who had died the previous year. For three years he filled the role part-time, still lecturing at Ilorin, until giving up his university position to preach full-time.

The Church, which was not well known before Adeboye took charge, now claims branches in over a hundred and fifty countries, including more than 14,000 in Nigeria. Adeboye has stated that his aim is to put a Church within five minutes of every person on Earth. He is the national president of RCF (an interdenominational fellowship in all the campuses in Nigeria).</p> <p>In 2008, Newsweek magazine named Adeboye one of the fifty most powerful people in the world. He is married to Foluke Adeboye, also a pastor, with whom he has children.
                    </p>
            </div>
        </div>
        <div className="pastors_blog container">
      {sermons.map((sermon, index) => (
        <div key={index} className="blog_card">
          <div className="image">
            <img src={sermon.imageUrl} alt={sermon.title} />
          </div>
          <div className="text">
            <div className="name">{sermon.name}</div>
            <div className="title">{sermon.title}</div>
            <div className="date">{sermon.date}</div>
            <a href={sermon.soundcloudUrl} target="_blank" rel="noopener noreferrer" className="btn">
              <p>Listen on SoundCloud</p>
            </a>
          </div>
        </div>
      ))}
    </div>
           <div className="about_links">
                  <Link to={"/stories"}>stories  <i class="fa-solid fa-caret-left"></i></Link>
                  <Link to={"/our-pastor"}>Our Pastor <i class="fa-solid fa-caret-right"></i></Link>
                </div>
      
    </div>
  )
}

export default General
