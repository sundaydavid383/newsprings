import React from 'react'
import "./herotransparent.css"


const Herotransparent = ({h2, img1, img2, img3}) => {
  return (
    <div className='Herotransparent'>
      <h2>{h2}</h2>
      <div className="imgaes">
        <img className={"firstimg"} src={img1} alt="" />
        <img className={"secondimg"} src={img2} alt="" />
        <img className={"thirdimg"} src={img3} alt="" />
      </div>
    </div>
  )
}

export default Herotransparent
