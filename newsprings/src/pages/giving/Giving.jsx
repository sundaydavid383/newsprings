import React, { useEffect } from 'react'
import "./giving.css"
import SecondNav from '../../component/secondNav/SecondNav'
import IntroText from '../../component/introText/IntroText'
import church1 from "../../assets/church4.jpg"
import church2 from "../../assets/church5.jpg"
import church3 from "../../assets/church3.jpg"
import giving from "../../assets/giving.jpg"
import { Link } from 'react-router'
import FeatureBottom from '../../component/feature/FeatureBottom'
import TxtImgBac from '../../component/txtImgBac/TxtImgBac'
import EducativeTextH3 from '../../component/educativetexth3/EducativeTextH3'

const Giving = ({setActivePage}) => {
  useEffect(() => {
   setActivePage("giving")
  }, [])
  const featureType = "giving"
  const text = "Because of your generous giving, RCCG Newspring is reaching lives with the transformative power of God’s Word. Together, we’re empowering ministries, building stronger communities, and expanding outreach efforts both within and beyond our church. Your faithfulness is helping us spread the message of hope, plant churches in underserved areas, and bring people closer to Christ. Take a look below at how your ongoing support is making a lasting impact on the Kingdom."
    const txtImaBach2 = "How would you like to direct your giving to RCCG Newspring Church?"
    const txtImaBacP="Whether you'd like to make a one-time donation, set up recurring contributions, or view your giving history, you can easily manage it all from your computer or mobile phone."

  const givingDetails = [
    {
      imgSrc: church1,
      altText: "Worship Service",
      title: "Partner in Our Mission",
      description: "Your generous giving helps RCCG Newspring spread the message of hope and transform lives both locally and globally. Together, we’re reaching people with the truth of God’s Word, planting churches, and empowering ministries to make a lasting impact in our community.",
    },
    {
      imgSrc: church2,
      altText: "Bible Study",
      title: "Building Stronger Communities",
      description: "Through your support, RCCG Newspring is able to provide life-changing Bible studies, youth programs, and community engagement efforts that deepen faith and encourage spiritual growth. Your giving helps build a community that thrives in Christ.",
    },
    {
      imgSrc: church3,
      altText: "Community Service",
      title: "Impacting the Kingdom",
      description: "Your faithful contributions are making a real difference in the lives of individuals and families. At RCCG Newspring, we’re using your support to serve others, plant churches in underserved areas, and provide outreach that transforms lives and hearts for Christ.",
    }
    
  ];

  const educationTextH3p = (
    <>
      <div className="div">
        <h3>Join Us on This Journey</h3>
        <p>Are you looking for a place to grow spiritually and connect with a loving family in Christ? RCCG New Springs welcomes you with open arms! Get involved in our
        <Link to="/service"> worship services</Link>, Bible studies, and outreach programs. Come,  
        <Link to="/connect"> connect with us</Link> and experience the transforming power of God's presence.
     </p> </div>
  
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
          <ul>
            <li><strong>Bank Transfer</strong> - Details available from the finance department.</li>
            <li><strong>Online Giving</strong> - Visit our website to donate securely online.</li>
            <li><strong>In-Person Giving</strong> - You can give during our services with cash or cheque.</li>
          </ul>
          Your contributions, no matter the size, help in fulfilling our mission of impacting lives and serving others.
        </p>
      </div>
  
      <div className="div">
        <h3>What will my donations be used for?</h3>
        <p>
          Your donations help fund several key initiatives within RCCG New Springs, including:
          <ul>
            <li>Worship Services: Ensuring the atmosphere of praise and worship continues to grow.</li>
            <li>Bible Studies: Providing resources and support for spiritual growth.</li>
            <li>Community Outreach: Supporting programs that reach those in need.</li>
            <li>Church Development: Ensuring the church infrastructure is sustained and improved.</li>
          </ul>
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
    <div className='giving'>
       <SecondNav text={"learn giving today"} link={"/give"} btntext={"give"}/>
       <IntroText header={"Your giving changes lives."} text={text}/>
       <FeatureBottom cards={givingDetails} featureType={featureType}/>
       <TxtImgBac img={giving} p={txtImaBacP} h2={txtImaBach2} textClass={"giving_Img_background_text"} link={"/give"} linktext={"give"}/>
       <div className="questionAndAnswer">
        <h1>Frequently Asked Questions</h1>
        <EducativeTextH3 >{educationTextH3p}</EducativeTextH3>
        <p className='moreInfo'>
  For more information about online giving, email our  
  <a href='mailto:rccgnewsprings.com'> revenue accounting team</a> or 
  <a href='tel:+2348175523600'> call 0817.552.3600</a>
</p>
       </div>

    </div>
  )
}

export default Giving
