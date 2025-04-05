import React from 'react'
import "./shadowtext.css"
import image from "../../assets/worship.jpg"

const ShadowTextHero = () => {
  return (
    <div className='ShadowTextHero container'>
             <div className="text">
             <h1>Experience RCCG New Springs Anywhere, Anytime!</h1>
             <p>Explore our archive and watch inspiring messages on any of your devices.</p>
       </div>
       <div className="image">
       <img src={image} alt="" />
       </div>
     
    </div>
  )
}

export default ShadowTextHero
