import React from 'react'
import "./secondNav.css"
import { Link } from 'react-router'

const SecondNav = ({text, link, btntext}) => {
  return (
    <div className="career_nav">
    <p className='career_nav_p'>{text}</p>
 <Link className="btn" to={link}>
       <p>
         {btntext} <i className="fa-solid fa-arrow-right-long"></i>
       </p>
     </Link>
    </div>
  )
}

export default SecondNav
