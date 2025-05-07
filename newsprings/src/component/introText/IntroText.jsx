import React from 'react'
import "./introText.css"

const IntroText = ({header, text}) => {
  return (
    <div className='introtext'>
      <h3>{header}</h3>
      <p>{text} </p>
    </div>
  )
}

export default IntroText
