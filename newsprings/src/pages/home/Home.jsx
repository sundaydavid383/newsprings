import React, { useEffect } from "react";
import Hero from "../../component/hero/Hero";
import Feature from "../../component/feature/Feature";
import Section from "../../component/section/Section";

const Home = ({setActivePage}) => {
  useEffect(() => {
   setActivePage("home")
  }, [])
  
  return (
    <div>
      <Hero />
      <Feature />
      <Section />
    </div>
  );
};

export default Home;
