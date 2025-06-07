import React, { useEffect } from 'react'
import "./corevalues.css"
import { Link } from 'react-router'

const Corevalues = ({setActivePage}) => {
   useEffect(() => {
         setActivePage("about")
       }, [])
    const [navOpen, setNavOpen] = useState(false);
  
    const toggleNav = () => {
      setNavOpen(!navOpen);
    };
       
  return (
    <div className="about">
               <button className="nav-toggle" onClick={toggleNav}>
         <p>About menu dropdown</p> ☰
      </button>

           <ul className={`about_nav ${navOpen ? "open" : ""}`}>
        
     <li
     >
       <Link to="/mission-and-vision">Mission and Vision</Link>
     </li>
     <li >
       <Link  className={`liactive`} to="/core-values">Core Values</Link>
     </li>
     <li className={``}>
       <Link to="/stories">Stories</Link>
     </li>
     <li className={``}>
       <Link to="/general">General Overseer</Link>
     </li>
     <li className={``}>
       <Link to="/our-pastor">Our Pastor</Link>
     </li>
     <li className={``}>
       <Link to="/career">Career</Link>
     </li>
   </ul>
   <div className="about_text">
  <h1>Core Vlaues</h1>
  <div className="abouts_article_holder">
  <div className='about-article'>
    <h2>Article 1 – Holiness</h2>
    <p>Holiness is the foundation of our faith and calling. It is not merely an outward appearance but an inward transformation by the Holy Spirit. The Bible commands us to be holy, just as God is holy (1 Peter 1:16). We believe that holiness is a lifestyle of separation from sin and dedication to righteousness, demonstrated through our words, actions, and thoughts. At RCCG Newsprings, we are committed to living lives that reflect the character of Christ, striving for purity, integrity, and godliness in all we do.</p>
  </div>

  <div className='about-article'>
    <h2>Article 2 – Accountability and Responsibility</h2>
    <p>The Christian life is not meant to be lived in isolation but in a community where believers hold one another accountable in love. We recognize that we are accountable first to God and then to one another in our families, workplaces, and church.</p>
    
    <div className="about_article_options">
      <h3>Accountability</h3>
      <p>We believe that spiritual growth thrives in accountability. At RCCG Newsprings, leaders and members encourage, challenge, and support one another, ensuring that we all remain faithful in our walk with Christ.</p>

      <h3>Responsibility</h3>
      <p>Responsibility means faithfully stewarding the gifts, talents, and opportunities God has given us. As members of RCCG Newsprings, we strive to be trustworthy, dependable, and committed to fulfilling God’s purpose in our lives.</p>
    </div>
  </div>

  <div className='about-article'>
    <h2>Article 3 – Resourcefulness</h2>
    <p>God has entrusted His children with resources—both physical and spiritual—to be used for His glory. We believe in making the most of every opportunity, being diligent, and using wisdom in our decisions.</p>

    <div className="about_article_options">
      <h3>Stewardship</h3>
      <p>As faithful stewards, we are called to manage our time, finances, and abilities wisely. Every resource given to us is for the furtherance of God’s kingdom, and we commit to using them in ways that bring glory to His name.</p>

      <h3>Creativity and Innovation</h3>
      <p>At RCCG Newsprings, we embrace creative and innovative ways to share the Gospel and grow our ministry. Through strategic planning and wise decision-making, we maximize opportunities for expansion and impact.</p>
    </div>
  </div>

  <div className='about-article'>
    <h2>Article 4 – Worship</h2>
    <p>Worship is more than just singing songs—it is a lifestyle of reverence and devotion to God. True worship involves surrendering our lives to God, honoring Him in all we do, and acknowledging His sovereignty.</p>

    <div className="about_article_options">
      <h3>Corporate Worship</h3>
      <p>Gathering together to worship strengthens our faith and unites us in the presence of God. At RCCG Newsprings, we create an atmosphere of worship where people can encounter God’s presence, experience spiritual renewal, and grow deeper in their relationship with Him.</p>

      <h3>Personal Worship</h3>
      <p>Beyond the church walls, believers are called to worship God through prayer, studying the Word, and daily obedience to His will.</p>
    </div>
  </div>

  <div className='about-article'>
    <h2>Article 5 – Excellence</h2>
    <p>God deserves our best, and excellence is a reflection of His nature. Whether in our personal lives, ministry, or service to others, we strive for excellence in all we do. This does not mean perfection but rather a commitment to diligence, continuous improvement, and faithfulness.</p>
  </div>

  <div className='about-article'>
    <h2>Article 6 – Expansion</h2>
    <p>The Great Commission commands us to go into the world and make disciples of all nations (Matthew 28:19). We believe that the church must grow—not just in numbers but also in spiritual depth and influence.</p>

    <div className="about_article_options">
      <h3>Evangelism</h3>
      <p>Jesus calls us to share the Gospel with the lost. At RCCG Newsprings, we actively reach out to our communities and beyond, spreading the love of Christ and inviting people into a relationship with Him.</p>

      <h3>Church Growth</h3>
      <p>As a ministry, we are committed to planting churches, discipling new believers, and ensuring that our spiritual family continues to grow in faith and maturity.</p>
    </div>
  </div>

  <div className='about-article'>
    <h2>Article 7 – Love</h2>
    <p>Love is the foundation of all Christian virtues and the essence of God’s nature. Jesus commanded us to love God with all our hearts and to love our neighbors as ourselves (Mark 12:30-31). Love is expressed through acts of kindness, compassion, generosity, and service.</p>

    <div className="about_article_options">
      <h3>Love for God</h3>
      <p>True love begins with a deep and personal relationship with God. At RCCG Newsprings, we prioritize intimacy with Him through prayer, worship, and obedience to His Word.</p>

      <h3>Love for Others</h3>
      <p>Love unites us as a family and enables us to reflect Christ to the world. We are committed to showing love through practical actions—helping the needy, supporting one another, and fostering a welcoming and inclusive church environment.</p>
    </div>
  </div>
</div>
</div>
  <div className="about_links">
      <Link to={"/mission-and-vision"}>Mission and Vision <i class="fa-solid fa-caret-left"></i></Link>
      <Link to="/stories">Stories <i class="fa-solid fa-caret-right"></i></Link>
    </div>
   </div>
  )
}

export default Corevalues
