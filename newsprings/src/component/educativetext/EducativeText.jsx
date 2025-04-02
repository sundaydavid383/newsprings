import React from 'react'
import "./educativetext.css"

const EducativeText = ({h1, p}) => {
  return (
    <div className="about_text">
    <h1>{h1}</h1>
    <div className="abouts_p">
       {p.map((ptag, index)=>(
        <p key={index}>{ptag}</p>
       ))}
 
    </div>
  </div>
  )
}

export default EducativeText
