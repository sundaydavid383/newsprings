import React, { useState, useEffect } from 'react'
import "./contact.css"
import image1 from "../../assets/church1.jpg"
import image2 from "../../assets/cleaner10.jpg"
import image3 from "../../assets/cleaner8.jpg"
import image4 from "../../assets/cleaner9.jpg"
import image5 from "../../assets/cleaner7.jpg"

const Contact = () => {
  const [translate, setTranslate] = useState(0)
useEffect(() => {
      document.querySelector(".service_holder").style.transform = `translateX(${translate}px)`
}, [translate])


    
  
  return (
    <div className='contact'>
      {translate < 0?<div onClick={()=>{setTranslate(prev=>prev+480)}} className="moveleft iconactive"><i className="fa-solid fa-arrow-left-long"></i></div>:null}
      {translate > -1350?<div onClick={()=>{setTranslate(prev=>prev-480)}} className="moveright iconactive"><i className="fa-solid fa-arrow-right-long"></i></div>:null}
   <div className="bubble b1 "><small></small></div>
      <div className="bubble b2"><small></small></div>
      <div className="bubble b3"><small></small></div>
      <div className="bubble b4"><small></small></div>
      <div className="bubble b5"><small></small></div>
      <div className="bubble b6"><small></small></div>
      <div className="bubble b7"><small></small></div>
      <div className="bubble b8"><small></small></div>
      <div className="bubble b9"><small></small></div>
      <div className="bubble b10"><small></small></div>
      <div className="bubble b11"><small></small></div>
       <div className="main_contact">
        <h1>Get A Free Appoinmnet</h1>
        <form action="">
          <input type="text" placeholder='name' /><input  type="text" placeholder='phone number'/>
          <select name="cleaning_service" id="cleaning_service" >
  <option value="residential">Residential Cleaning</option>
  <option value="commercial">Commercial Cleaning</option>
  <option value="deep_cleaning">Deep Cleaning</option>
  <option value="move_in_move_out">Move In/Move Out Cleaning</option>
  <option value="post_construction">Post-Construction Cleaning</option>
  <option value="carpet_cleaning">Carpet Cleaning</option>
  <option value="window_cleaning">Window Cleaning</option>
           <option value="office_cleaning">Office Cleaning</option></select>
           <div className="btn">
          <p>
            Book Now <i className="fa-solid fa-arrow-right-long"></i>
          </p>
        </div>
        </form>
       </div>
       <div className="contact_service">
        <div className="title">
          <span>our services</span>
          <h2>Professional Cleaning Services</h2>
        </div> 
        <div className="service_holder container">
  <div className="service">
    <img src={image5} alt="Residential Cleaning" />
  <div className='text'><div className='text_span'></div>
      
      .<i className="fas fa-home text_decription iconactive"></i> 

      <div className='h2'>Residential Cleaning</div>
      <ul>
        <li>
          <i className="fas fa-broom"></i> 
          <p>We offer professional cleaning for homes, ensuring every room is spotless.</p>
        </li>
        <li>
        <i class="fa-solid fa-hand-sparkles"></i>
          <p>From dusting to vacuuming, we handle all aspects of your home’s cleanliness.</p>
        </li>
      </ul>
      <div className="btn">
          <p>
            Book Now <i className="fa-solid fa-arrow-right-long"></i>
          </p>
        </div>
    </div>
  </div>
  <div className="service">
    <img src={image4} alt="Commercial Cleaning" />
  <div className='text'><div className='text_span'></div>
      <i className="fas fa-building text_decription iconactive"></i> 
      <div className='h2'>Commercial Cleaning</div>
      <ul>
        <li>
          <i className="fas fa-spray-can "></i> 
          <p>Specialized cleaning for office spaces, shops, and business premises.</p>
        </li>
        <li>
        <i class="fa-solid fa-cloud-sun"></i>
          <p>We ensure a clean, professional environment for both employees and clients.</p>
        </li>
      </ul>
      <div className="btn">
          <p>
            Book Now <i className="fa-solid fa-arrow-right-long"></i>
          </p>
        </div>
    </div>
  </div>
  <div className="service">
    <img src={image3} alt="Deep Cleaning" />
  <div className='text'><div className='text_span'></div>
      <i className="fas fa-spa text_decription iconactive"></i> 
     
      <div className='h2'>Deep Cleaning</div>
      <ul>
        <li>
          <i className="fas fa-clipboard-list"></i> 
          <p>Thorough cleaning for hard-to-reach areas, such as behind furniture and appliances.</p>
        </li>
        <li>
        <i class="fa-solid fa-toilet-paper"></i>
          <p>Our deep cleaning services leave your home sparkling and fresh with detailed attention.</p>
        </li>
      </ul>
      <div className="btn">
          <p>
            Book Now <i className="fa-solid fa-arrow-right-long"></i>
          </p>
        </div>
    </div>
  </div>
  <div className="service">
  <img src={image2} alt="Move-In/Move-Out Cleaning" />
<div className='text'><div className='text_span'></div>
    <i className="fas fa-truck text_decription iconactive"></i> 
    <div className='h2'>Move-In/Move-Out Cleaning</div>
    <ul>
      <li>
        <i className="fas fa-broom"></i> 
        <p>We help you clean your space before or after moving, ensuring a fresh start.</p>
      </li>
      <li>
      <i class="fa-solid fa-list-check"></i>
        <p>Our team handles all cleaning tasks, from removing debris to scrubbing every corner.</p>
      </li>
    </ul>
    <div className="btn">
      <p>
        Book Now <i className="fa-solid fa-arrow-right-long"></i>
      </p>
    </div>
  </div>
</div>

<div className="service">
  <img src={image1} alt="Window Cleaning" />
<div className='text'><div className='text_span'></div>
    <i className="fas fa-window-maximize text_decription iconactive"></i> 
    <div className='h2'>Window Cleaning</div>
    <ul>
      <li>
      <i class="fa-brands fa-windows"></i>
        <p>We provide expert window cleaning services, ensuring your windows are streak-free and clear.</p>
      </li>
      <li>
        <i className="fas fa-sun"></i> 
        <p>Let the sunlight in with windows that shine, both inside and out.</p>
      </li>  </ul>
    <div className="btn">
      <p>
        Book Now <i className="fa-solid fa-arrow-right-long"></i>
      </p>
    </div>
  </div>
</div>
</div>
       </div>

    </div>
  )
}

export default Contact
