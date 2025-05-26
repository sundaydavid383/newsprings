import React, { useEffect, useState, useRef } from "react";
import "./hero.css"
import image1 from "../../assets/church1.jpg"
import image2 from "../../assets/church2.jpg"
import image3 from "../../assets/church3.jpg"
import image4 from "../../assets/church4.jpg"
import Feature from "../feature/Feature";
import { Link } from "react-router";
import axios from "axios";

const Hero = () => {
  const [printedTalk, setPrintedTalk] = useState(0)
 const [printedSection, setPrintedSection] = useState(0)
 const printedSectionRef = useRef(0)
  const [section, setSection] = useState([])
  const baseUrl = 'https://newsprings.onrender.com/'
  
  useEffect( () => {
   
  const fetchHero = async()=>{
    try {
     const response = await axios.get(`${baseUrl}api/hero-sections`) 
     setSection(response.data.sections)
     console.log(response.data.sections)
  } catch (error) {
    console.error("an error occured while fetching data form the server")
  }
}

  fetchHero()
  if (section.length === 0) return; // ❗ don't start interval until we have sections

  const sectionInterval = setInterval(() => {
    printedSectionRef.current = (printedSectionRef.current + 1)% section.length
    setPrintedSection(printedSectionRef.current)

    setTimeout(() => {
      console.log( "printedsection:",printedSection)
    }, 2000);
    

}, 4000);
  return () => {
    clearInterval(sectionInterval);
  }
}, [])
 
// Now for clicking the arrows:
const moveLeft = () => {
  setPrintedSection(prev => {
    const newSection = (prev - 1 + section.length) % section.length;
    printedSectionRef.current = newSection;
    return newSection
  });
};

const moveRight = () => {
  setPrintedSection(prev => {
    const newSection = (prev + 1) % section.length;
    printedSectionRef.current = newSection;
    return newSection;
  });
};
  
 
  return (
    section.length === 0
    ?(
      <div className="hero_loading_holder">
                  <div className="loading_text">
            <div className="text text1"></div>
            <div className="text text3"></div>
            <div className="text text2"></div>
            <div className="loading_button"></div>
          </div>
          <div className="loading_image">
          </div>
      </div>
    )
    : (
    section.map((page, index)=>(
      index === printedSection ? <div key={index} className={`hero hero${page.id}  container`}>




  <div onClick={moveLeft} className="moveleft iconactive">
    <i className="fa-solid fa-arrow-left-long"></i>
  </div>


  <div onClick={moveRight} className="moveright iconactive">
    <i className="fa-solid fa-arrow-right-long"></i>
  </div>
     <div className="text">
        <h1>{page.header}<span> {page.headerspan}</span></h1>
        <div className="ps">
          {page.ps.map(p=><p key={p}>{p}</p>)} 
        </div>
        <Link className="btn" to="/contact">
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
  )
  );
};

export default Hero;
