import React from 'react'
import About from './component/about/About';
import Service from './pages/service/Service';
import Nav from './component/nav/Nav'
import {BrowserRouter, Routes, Route} from 'react-router';
import Footer from './component/footer/footer'
import Contact from './pages/contact/Contact'
import Home from './pages/home/Home'

const App = () => {
  return (
    <BrowserRouter>
    <Nav/>
    <Routes>
       <Route path="" element={<Home/>}/>
       <Route path="/service" element={<Service/>}/>
       <Route path="/about" element={<About/>}/>
       <Route path="/contact" element={<Contact/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
