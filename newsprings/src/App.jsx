import React, { useState } from "react";
import About from "./pages/sermon/Sermon";
import Service from "./pages/service/Service";
import Nav from "./component/nav/Nav";
import { BrowserRouter, Routes, Route } from "react-router";
import Footer from "./component/footer/footer";
import Contact from "./pages/contact/Contact";
import Home from "./pages/home/Home";
import MissionandVision from "./pages/abouts/MissionandVision";
import Corevalues from "./pages/abouts/Corevalues";
import Stories from "./pages/abouts/Stories";
import Testimony from "./pages/testimony/Testimony";
import Scrolldown from "./dependencies/Scrolldown";
import General from "./pages/abouts/General";
import Ourpastor from "./pages/abouts/Ourpastor";
import Career from "./pages/abouts/Career";
import Sermon from "./pages/sermon/Sermon";
import Video from "./pages/video/Video";
import Portfolio from "./component/portfolio/Portfolio";
import Give from "./pages/giving/Giving";
import Giving from "./pages/giving/Giving";
import Membership from "./pages/membership/Membership";
import ShareTestimony from "./pages/sharetestimony/ShareTestimony";
import Updatingstory from "./pages/updatestory/updatingstory";


const App = () => {
  const [activePage, setActivePage] = useState("home")
  return (
    <BrowserRouter>
    <Scrolldown/>
      <Nav activePage={activePage} />
      <Routes>
        <Route path="" element={<Home setActivePage={setActivePage}/>} />
        <Route path="/service" element={<Service />} />
        <Route path="/aboutPage" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sermon" element={<Sermon setActivePage={setActivePage}/>} />
        <Route path="/video/:id" element={<Video setActivePage={setActivePage}/>} />
        <Route path="/mission-and-vision" element={<MissionandVision setActivePage={setActivePage} />} />
        <Route path="/core-values" element={<Corevalues setActivePage={setActivePage}/>} />
        <Route path="/stories" element={<Stories setActivePage={setActivePage}/>} />
        <Route path="/testimony/:id" element={<Testimony/>} />
        <Route path="/general" element={<General/>} />
        <Route path="/our-pastor" element={<Ourpastor/>} />
        <Route path="/career" element={<Career/>}/>
        <Route path="/diag" element={<Portfolio/>}/>
        <Route path="/updatestory94033030485403893" element={<Updatingstory setActivePage={setActivePage}/>}/>
        <Route path="/giving" element={<Giving setActivePage={setActivePage}/>}/>
        <Route path="/membership-class" element={<Membership setActivePage={setActivePage}/>}/>
        <Route path="/share-testimony" element={<ShareTestimony setActivePage={setActivePage}/>}/>

      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
