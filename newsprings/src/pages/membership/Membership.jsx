import React, { useEffect } from 'react'
import image1 from "../../assets/beliversfoundation.jpg"
import EducativeTextH3 from '../../component/educativetexth3/EducativeTextH3'
import { Link } from 'react-router'
import "./membership.css"

const Membership = ({setActivePage}) => {
    useEffect(() => {
      setActivePage("membership")
    }, [])
    const educationTextH3p = (
      <>
        <div className="div">
          <h3>Join Our Membership Class</h3>
          <p>
            Are you ready to take the next step in your journey with Christ? At <strong>RCCG New Springs</strong>, our <strong>Membership Class</strong> is designed to help new and existing members understand the vision, mission, and beliefs of our church. 
          </p>
          <p>
            This class provides insight into:
          </p>
          <ul>
            <li>The history and foundation of RCCG</li>
            <li>Our core values and doctrinal beliefs</li>
            <li>Opportunities for spiritual growth</li>
            <li>Ways to get involved in ministries and outreach programs</li>
          </ul>
          <p>
            Whether you are new to the faith or looking for a place to call home, we welcome you with open arms. Join us and become a part of a growing family dedicated to worship, service, and love.
          </p>
          <p>
            <strong>Location:</strong> RCCG New Springs, 332 Ikorodu Road, Idi Iroko Bus Stop, Maryland, Lagos. <br />
            <strong>Time:</strong> Every Sunday after service <br />
            <strong>Contact:</strong> For more information, call <a href="tel:+234937477838">+234937477838</a> or visit our <Link to="/connect">connect page</Link>.
          </p>
        </div>
    
        <div className="div">
          <h3>Why is my financial contribution important at RCCG New Springs?</h3>
          <p>
            Your financial contribution is vital to support the ongoing activities and ministry at RCCG New Springs. It helps fund worship services, Bible studies, community outreach, and many other programs designed to bring people closer to God. Your giving enables us to continue transforming lives and spreading the message of Christ to a broader community.
          </p>
        </div>
    
        <div className="div">
          <h3>How can I give to RCCG New Springs?</h3>
          <p>
            There are multiple ways you can give to RCCG New Springs. You can donate through:
          </p>
          <ul>
            <li><strong>Bank Transfer</strong> - Details available from the finance department.</li>
            <li><strong>Online Giving</strong> - Visit our website to donate securely online.</li>
            <li><strong>In-Person Giving</strong> - You can give during our services with cash or cheque.</li>
          </ul>
          <p>
            Your contributions, no matter the size, help in fulfilling our mission of impacting lives and serving others.
          </p>
        </div>
    
        <div className="div">
          <h3>What will my donations be used for?</h3>
          <p>
            Your donations help fund several key initiatives within RCCG New Springs, including:
          </p>
          <ul>
            <li>Worship Services: Ensuring the atmosphere of praise and worship continues to grow.</li>
            <li>Bible Studies: Providing resources and support for spiritual growth.</li>
            <li>Community Outreach: Supporting programs that reach those in need.</li>
            <li>Church Development: Ensuring the church infrastructure is sustained and improved.</li>
          </ul>
          <p>
            With your help, we are able to continue our mission and spread the love of Christ in the community.
          </p>
        </div>
    
        <div className="div">
          <h3>Is giving mandatory at RCCG New Springs?</h3>
          <p>
            While giving is not mandatory, it is encouraged as an act of faith and obedience to God's word. We believe that God loves a cheerful giver, and your generosity helps build and sustain the church's mission. It is through the collective giving of all our members that we are able to make a significant impact in the world around us.
          </p>
        </div>
    
        <div className="div">
          <h3>Can I get a tax receipt for my donation?</h3>
          <p>
            Yes, if you give at RCCG New Springs, you can receive a tax receipt for your donation. Our finance team provides receipts for donations made in-person or online, which can be used for tax purposes. For more details on receiving your receipt, please contact our finance department.
          </p>
        </div>
    
        <div className="div">
          <h3>Why should I give cheerfully?</h3>
          <p>
            The Bible encourages us to give cheerfully and with a willing heart. When we give cheerfully, we are acknowledging God's provision in our lives and expressing gratitude for all that He has done. Cheerful giving is also a reflection of our love for God and for others, as it supports the mission of the church and blesses those in need.
          </p>
        </div>
    
        <div className="div">
          <h3>What are the benefits of giving?</h3>
          <p>
            Giving is not only a blessing to others, but it also brings spiritual benefits to the giver. The Bible teaches that when we give, we open ourselves to receive blessings from God. Through giving, we grow in faith, develop a spirit of generosity, and experience the joy that comes from helping others. Your contributions can impact both your life and the lives of those around you.
          </p>
        </div>
    
        <div className="div">
          <h3>Can I contribute to specific projects or causes at RCCG New Springs?</h3>
          <p>
            Yes! We often have specific projects or causes that you can contribute to. These include building and development projects, special outreach programs, and initiatives supporting the less privileged. You can specify your donation to go towards a particular cause by contacting our finance department or selecting the relevant option on our online giving platform.
          </p>
        </div>
    
        <div className="div">
          <h3>How does my giving impact the church community?</h3>
          <p>
            Your giving plays a crucial role in advancing the mission and vision of RCCG New Springs. It allows us to continue reaching out to those in need, building spiritual growth through our worship services and Bible studies, and expanding our facilities to accommodate a growing congregation. Your contributions create lasting change within the church and the broader community.
          </p>
        </div>
      </>
    );
    
  return (
    <div className='membership'>
       <img src={image1} alt="" />

       <div className="membership_text">
       <h1>Belivers Foundation</h1>
       <EducativeTextH3 >{educationTextH3p}</EducativeTextH3>
       </div>
   
    </div>
  )
}

export default Membership
