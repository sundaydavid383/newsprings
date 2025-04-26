import React, { useState, useRef, useEffect } from "react";
import Service from "../pages/service/Service";
import { Routes, Route, Navigate } from "react-router";
import { useUser } from "../context/Usercontext";
import logo from "../assets/logo.png"

import "./authenticated.css"
import Contact from "../pages/contact/Contact";
import Home from "../pages/home/Home";
import MissionandVision from "../pages/abouts/MissionandVision";
import Corevalues from "../pages/abouts/Corevalues";
import Stories from "../pages/abouts/Stories";
import Testimony from "../pages/testimony/Testimony";
import General from "../pages/abouts/General";
import Ourpastor from "../pages/abouts/Ourpastor";
import Career from "../pages/abouts/Career";
import Sermon from "../pages/sermon/Sermon";
import Video from "../pages/video/Video";
import Portfolio from "../component/portfolio/Portfolio";
import Giving from "../pages/giving/Giving";
import Membership from "../pages/membership/Membership";
import ShareTestimony from "../pages/sharetestimony/ShareTestimony";
import Updatingstory from "../pages/updatestory/Updatingstory";
import AdminSendmessage from "../pages/admin/AdminSendmessage";
import LatestService from "../pages/latestService/LatestService"
import PrayerAndFasting from "../pages/prayerandfasting/PrayerAndFasting";
import WaterBaptisim from "../pages/waterBaptisim/WaterBaptisim";



const AuthenticatedRoutes = ({ setActivePage, isAuthenticated }) => {
  
  const getNextServiceTime = () => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = sunday, 1 = monday...
    const currentTime  = now.getTime();

    //helper tocreate a future date
    const createDate = (dayOffset, hour, minute) => {
        const date = new Date(now);
        date.setDate(date.getDate() + dayOffset);
        date.setHours(hour, minute, 0, 0);
        return date;
    };
    const serviceTimes = []
    //Add possible upcoming services
    const daysUntil = (targetDay) => (targetDay - currentDay + 7) % 7 || 7;

    const sunday = createDate(daysUntil(0), 8, 0); //sunday 8am
    const tuesday = createDate(daysUntil(2), 18, 0) //Tuesday 6pm
    const thursday = createDate(daysUntil(4), 18, 0);//thursday 6pm

    //If its today and the time hasnt passed, priortize it
    if(currentDay === 0 && now.getHours() < 8) serviceTimes.push(sunday);
    else if (currentDay === 2 && now.getHours() < 18) serviceTimes.push(tuesday);
    else if (currentDay === 4 && now.getHours() < 18) serviceTimes.push(thursday);

    //Add all the future valid service times
    serviceTimes.push(sunday, tuesday, thursday)

    //Find the next valid one 
    const nextService = serviceTimes.find(service => service.getTime() >  currentTime);
    
    const diff = nextService - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24 ));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60)

    return ` ${days} Day: ${hours} Hours: ${minutes} minute:  ${seconds} second`;

   }
  console.log(isAuthenticated);
  const { messages, user } = useUser();
  const messageEndRef = useRef(null);
   const [seeMessage, setSeeMessage] = useState(false)
   const [seeShedule, setSeeShedule] = useState(true)
   const [serviceTime, setServiceTime] = useState('')
   const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    setInterval(() => {
       setServiceTime(getNextServiceTime())
    }, 1000);
  }, []);
  
  useEffect(() => {
    if (seeMessage) {
      scrollToBottom();
    }
  }, [seeMessage]);


  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />; // Redirect to login page if not authenticated
  }
  return (
    <>
       <i onClick={()=>setSeeMessage(true)} className="iconactive message_state fa-solid fa-message"></i>
        {seeMessage && messages.length > 0 && (
          <div className="message_box_holder">
                   <i onClick={()=>setSeeMessage(false)} className="iconactive fa-solid fa-times"></i>
          <div className="message_box">
            <div className="title">Message</div>
            <ul>
              {messages.map((msg, idx) => (
                <li key={idx}>
                  <div className="box">
                  {msg.message.replace("Dear user", `Dear ${user?.firstName || "user"}`)}
                  </div>
                  <div className="time">
                    {new Date(msg.time).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month:"long",
                      year:"numeric",
                      hour: "2-digit",
                      minute:"2-digit",
                      hour12:true
                    })}
                  </div>
                  
                </li>
              ))}
             <div ref={messageEndRef} />
            </ul>
            
          </div>
          
          </div>
   
        )}
       <i onClick={()=>setSeeShedule(true)} className="iconactive schedule_state fa-solid fa-calendar-week"></i>
       {seeShedule && (
          <div className="schedule_box_holder">
                   <i onClick={()=>setSeeShedule(false)} className="iconactive fa-solid fa-times"></i>
            <div className="text"><div className="title">Next service</div>
           <p>Next service is in :<br/><span>{serviceTime}</span></p></div>
            </div>
   
        )}


    <Routes>
      <Route path="/" element={<Home setActivePage={setActivePage} />} />
      <Route path="/service" element={<Service />} />
      <Route path="/lastestservice" element={<LatestService />} />
      <Route path="/baptisim" element={<WaterBaptisim />} />
      <Route path="/admin45435t654dddsdffgdsdfdfdfdfasdfdedfdfdfdf55" element={<AdminSendmessage />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/sermon"
        element={<Sermon setActivePage={setActivePage} />}
      />
      <Route
        path="/video/:id"
        element={<Video setActivePage={setActivePage} />}
      />
      <Route
        path="/mission-and-vision"
        element={<MissionandVision setActivePage={setActivePage} />}
      />
      <Route
        path="/core-values"
        element={<Corevalues setActivePage={setActivePage} />}
      />
      <Route
        path="/stories"
        element={<Stories setActivePage={setActivePage} />}
      />
      <Route path="/testimony/:id" element={<Testimony />} />
      <Route path="/general" element={<General />} />
      <Route path="/our-pastor" element={<Ourpastor />} />
      <Route path="/career" element={<Career />} />
      <Route path="/diag" element={<Portfolio />} />
      <Route
        path="/updatestory94033030485403893"
        element={<Updatingstory setActivePage={setActivePage} />}
      />
        <Route
        path="/prayer-and-fasting"
        element={<PrayerAndFasting />}
      />
      <Route
        path="/giving"
        element={<Giving setActivePage={setActivePage} />}
      />
      <Route
        path="/membership-class"
        element={<Membership setActivePage={setActivePage} />}
      />
      <Route
        path="/share-testimony"
        element={<ShareTestimony setActivePage={setActivePage} />}
      />
    </Routes>
    </>
  );
};

export default AuthenticatedRoutes;
