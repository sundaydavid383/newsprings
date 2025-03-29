import React from 'react'
import "./shadowtext.css"
import image from "../../assets/worship.jpg"

const ShadowTextHero = () => {
  return (
    <div className='ShadowTextHero container'>
             <div className="text">
         <h1>Watch Gateway content anywhere, anytime!</h1>
         <p>Browse our archive and watch videos on any of your devices.</p>
       </div>
       <div className="image">
       <img src={image} alt="" />
       </div>
     
    </div>
  )
}

export default ShadowTextHero
