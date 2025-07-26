import React, { useEffect, useState, useRef } from "react";
import "./hero.css";
import { Link } from "react-router";
import axios from "axios";

const Hero = () => {
  const [printedSection, setPrintedSection] = useState(0);
  const printedSectionRef = useRef(0);
  const [section, setSection] = useState([]);
  const baseUrl = 'https://newsprings.onrender.com/';

useEffect(() => {
   const getFromLocalStorage = () => {
    try {
      const data = localStorage.getItem('hero_sections');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Failed to parse localStorage data:", error);
      return null;
    }
  };

  // Load cached data immediately (for instant display)
  const cachedSections = getFromLocalStorage();
  if (cachedSections && Array.isArray(cachedSections) && cachedSections.length > 0) {
    setSection(cachedSections);
    console.log("Loaded from localStorage:", cachedSections);
  }

  const fetchHero = async () => {
    try {
      const response = await axios.get(`${baseUrl}api/hero-sections?timestamp=${Date.now()}`);
      const fetchedSections = response.data.sections;

      if (
        !Array.isArray(fetchedSections) ||
        JSON.stringify(fetchedSections) === JSON.stringify(section)
      ) {
        return; // avoid unnecessary updates
      }

      setSection(fetchedSections);
      localStorage.setItem('hero_sections', JSON.stringify(fetchedSections));
      console.log("Fetched and updated from API:", fetchedSections);
    } catch (error) {
      console.error("An error occurred while fetching from the server:", error);
    }
  };

  fetchHero(); // always fetch the latest from the server

}, []);
  useEffect(() => {
    if (section.length === 0) return;

    const sectionInterval = setInterval(() => {
      printedSectionRef.current = (printedSectionRef.current + 1) % section.length;
      setPrintedSection(printedSectionRef.current);
    }, 200000);

    return () => {
      clearInterval(sectionInterval);
    };
  }, [section]);

  const moveLeft = () => {
    setPrintedSection(prev => {
      const newSection = (prev - 1 + section.length) % section.length;
      printedSectionRef.current = newSection;
      return newSection;
    });
  };

  const moveRight = () => {
    setPrintedSection(prev => {
      const newSection = (prev + 1) % section.length;
      printedSectionRef.current = newSection;
      return newSection;
    });
  };

  if (section.length === 0) {
    return (
      <div className="hero_loading_holder">
        <div className="loading_text">
          <div className="text text1"></div>
          <div className="text text3"></div>
          <div className="text text2"></div>
          <div className="loading_button"></div>
        </div>
        <div className="loading_image"></div>
      </div>
    );
  }

  return section.map((page, index) =>
    index === printedSection ? (
      <div key={index} className={`hero hero${page.id} container`}>
        <div onClick={moveLeft} className="moveleft iconactive">
          <i className="fa-solid fa-arrow-left-long"></i>
        </div>

        <div onClick={moveRight} className="moveright iconactive">
          <i className="fa-solid fa-arrow-right-long"></i>
        </div>

        <div className="text">
          <h1>
            {page.header}
            <span> {page.headerspan}</span>
          </h1>
          <div className="ps">
            {page.ps.map((p) => (
              <p key={p}>{p}</p>
            ))}
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
      </div>
    ) : null
  );
};

export default Hero;