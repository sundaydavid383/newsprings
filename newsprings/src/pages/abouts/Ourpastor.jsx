import React from 'react'
import "./ourpastor.css"
import { Link } from 'react-router'
import pastor from "../../assets/ourpastor.jpg"

const Ourpastor = () => {
  return (
    <div className="about general">
    <ul className="about_nav">
<li
>
 <Link to="/mission-and-vision">Mission and Vision</Link>
</li>
<li >
 <Link  className={``} to="/core-values">Core Values</Link>
</li>
<li className={``}>
 <Link to="/stories">Stories</Link>
</li>
<li >
 <Link className={``} to="/general">General Overseer</Link>
</li>
<li >
 <Link className={`liactive`} to="/our-pastor">Our Pastor</Link>
</li>
<li className={``}>
<Link to="/career">Career</Link>
</li>
</ul>
  <h2>Our Pastor</h2>
  <div className="genral_overseer_words pastor_words">
    <div className="pastor_words_image">
    <div className="image">
          <img src={pastor} alt="" />
          </div>
          <h3>Parish Pastor</h3>
          <h1>Olusola Adewole</h1>
    </div>
    
          <div className="text">
              <p>
         
Parish Pastor
Olusola Adewole
Olusola Adewole is a teacher of the word of God and is the Pastor of the NewSprings Parish of the Redeemed Christian Church of God at Maryland, Ikeja.</p>  <p>He believes that anyone can reach any height as long as they walk right with God. God has given him an assignment to preach the message of personal excellence and make disciples of Christ out of every one he comes into contact with.

In addition, Olusola Adewole is an HR specialist with diverse experience in consulting and training in the public and private sectors of Nigeria.</p><p>Olusola has facilitated executive learning sessions for over 2000 professionals in Nigeria.

He is a senior consulting alumnus of Accenture and Phillips Consulting.</p> <p>Currently, he is the Director, People and Organization at PwC Nigeria.  Before HR Consulting, Olusola was a banker and rose to be Company treasurer in the Nigerian financial services industry. He left Accenture in May 2001 to start Human Performance Solutions.

He is happily married to the love of his life, Omowunmi and they are blessed with children.
              </p>
      </div>
  </div>
     <div className="about_links">
            <Link to={"/general"}>General Overseer  <i class="fa-solid fa-caret-left"></i></Link>
            <Link to={"/career"}>Career <i class="fa-solid fa-caret-right"></i></Link>
          </div>

</div>
  )
}

export default Ourpastor
