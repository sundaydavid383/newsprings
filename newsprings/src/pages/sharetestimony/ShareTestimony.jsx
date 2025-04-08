import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Herotransparent from '../../component/herotransparent/Herotransparent';
import './sharetestimony.css';
import image1 from "../../assets/testifier8.jpg";
import image2 from "../../assets/testifier9.jpg";
import image3 from "../../assets/testifier10.jpg";
import TestimonyForm from '../../component/testimonyform/Testimonyform';

const ShareTestimony = ({ setActivePage }) => {
  const location = useLocation();
  const state = location.state || {};

  const [formData, setFormData] = useState({
          video: null,
          image: null,
          name: "David Efiong",
          title: "God healed me miraculously!",
          testimony:
            "I had a severe case of malaria that left me feeling extremely weak and drained. However, through consistent prayer and faith in God's healing power, along with taking the right medication, I gradually began to recover. Each day I felt stronger, and eventually, I was completely healed. I truly believe it was God's grace that restored my health fully.",
          scriptureReference: "Isaiah 53:5",
          testimonyCategory: "Healing",
             impact: "It boosted my faith.",
             lessonLearned: "God is faithful to heal.",
             prayerRequest: "Pray for continued strength.",
             followUpAction: "I shared this with my youth group.",
             churchDetails: {
               name: "NewSprings Chapel",
               location: "Calabar, Nigeria",
               pastor: "Pastor Daniel Floyd",
          },
        }) 

  useEffect(() => {
    setActivePage("share-testimony");

    if (state) {
      setFormData((prev) => ({
        ...prev,
        ...state,
      }));
      console.log("this is thew recieved  formdata",state)
    }
    console.log("no data fro state", state)

  }, []);

  return (
    <div className='sharetestimony'>
      <Herotransparent h2={"Share Your Testimonies with RCCG NewSpring and Inspire Others"} img1={image1} img2={image2} img3={image3} />
      <TestimonyForm formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default ShareTestimony;