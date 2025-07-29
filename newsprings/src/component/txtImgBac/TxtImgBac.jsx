import React from 'react'
import { Link } from 'react-router'
import "./txtImgBac.css"

const TxtImgBac = ({p,h2,img, textClass, link,linktext}) => {
  return (
    <div className="career_intro">
      <span></span>
    <div className={textClass}>
    <h2>{h2}</h2>
    <p>{p}</p>
     { link.length > 0 ? <Link to={`${link?link:""}`}>{`${linktext?linktext:""}`}<i className="fa-solid fa-arrow-right-long"></i></Link>:null} 
    </div>
  <img src={img} alt="" />

   </div>
  )
}

export default TxtImgBac
