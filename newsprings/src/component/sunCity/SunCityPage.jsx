import React from "react";
import SunCityHero from "./SunCityHero";
import Programs from "./Programs";
import WhySunCity from "./WhySunCity";
import ParentsIntro from "./ParentsIntro";
import CTA from "./CTA";
import "./sunCity.css";
import heroImage from "../../assets/suncity-banner.jpg";

// FadeIn and useInView remain the same
const useInView = () => {
  const ref = React.useRef(null);
  const [hasBeenInView, setHasBeenInView] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenInView) {
          setHasBeenInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasBeenInView]); // depend on hasBeenInView

  return [ref, hasBeenInView];
};

const FadeInSection = ({ children }) => {
  const [ref, inView] = useInView();

  const style = {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(40px)",
    transition: "all 0.6s ease-out",
  };

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
};

const SunCityPage = () => {
  const heroProps = {
    image: heroImage,
    h1: "Welcome to",
    span: "SunCity",
    p: "SunCity is more than just a children’s ministry — it’s a vibrant, joyful space where every child is nurtured in God’s love, inspired to grow spiritually, and encouraged to explore faith through fun, friendship, and creativity. Each week, our kids dive into Bible truths in a way that lights up their hearts and minds, preparing them to shine as champions for Christ in a changing world."
  };

  return (
    <div className="suncity-page">
      <FadeInSection><SunCityHero {...heroProps} /></FadeInSection>
      <FadeInSection><Programs /></FadeInSection>
      <FadeInSection><WhySunCity /></FadeInSection>
      <FadeInSection><ParentsIntro /></FadeInSection>
      <FadeInSection><CTA /></FadeInSection>
    </div>
  );
};

export default SunCityPage;