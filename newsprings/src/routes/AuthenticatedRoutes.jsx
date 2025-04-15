import React, { useState } from "react";
import Service from "../pages/service/Service";
import { Routes, Route, Navigate } from "react-router";
import { useUser } from "../context/Usercontext";

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

const AuthenticatedRoutes = ({ setActivePage, isAuthenticated }) => {
  console.log(isAuthenticated);
  const { messages, user } = useUser();
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />; // Redirect to login page if not authenticated
  }
  return (
    <>
        {/* 🔥 Fixed Messages Card */}
        {messages.length > 0 && (
          <div className="message_box">
            <h4 >Messages</h4>
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
            </ul>
          </div>
        )}
    <Routes>
      <Route path="/" element={<Home setActivePage={setActivePage} />} />
      <Route path="/service" element={<Service />} />
      <Route path="/admin45435t65455" element={<AdminSendmessage />} />
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
