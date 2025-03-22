import React from 'react'
import Hero from '../../component/hero/Hero'
import Feature from '../../component/feature/Feature'
import About from '../../component/about/About'
import Video from '../../component/video/Video'
import Contact from '../../component/contact/Contact'
import Workingprocess from '../../component/workingprocess/Workingprocess'
import Portfolio from '../../component/portfolio/Portfolio'
import Section from '../../component/section/Section'
import { Link } from 'react-router'
import Footer from '../../component/footer/footer'

const Home = () => {
  return (
    <div>
        <Hero/>
        <Feature/>
         <Section/>
         {/* <Contact/>
         <Workingprocess/>
         <Portfolio/> */}
      
    </div>
  )
}

export default Home
