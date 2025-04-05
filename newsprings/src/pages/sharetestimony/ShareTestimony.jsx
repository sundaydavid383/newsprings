import React, { useEffect } from 'react'
import Herotransparent from '../../component/herotransparent/Herotransparent'
import './sharetestimony.css'
import image1 from "../../assets/testifier8.jpg"
import image2 from "../../assets/testifier9.jpg"
import image3 from "../../assets/testifier10.jpg"
import TestimonyForm from '../../component/testimonyform/Testimonyform'

const ShareTestimony = ({setActivePage}) => {
    useEffect(() => {
     setActivePage("share-testimony")
    }, [])
    
  return (
    <div className='sharetestimony'>
         <Herotransparent h2={"Share Your Testimonies with RCCG NewSpring and Inspire Others"} img1={image1} img2={image2} img3={image3}/>
         <TestimonyForm/>
    </div>
  )
}

export default ShareTestimony
