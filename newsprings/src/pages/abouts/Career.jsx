import {useState, useEffect} from 'react'
import { Link } from 'react-router'
import "./career.css"
import image1 from "../../assets/career2.jpg"
import worker1 from "../../assets/worker1.jpg"
import worker2 from "../../assets/worker2.jpg"
import worker3 from "../../assets/worker3.jpg"
import worker4 from "../../assets/worker4.jpg"
import worker5 from "../../assets/worker5.jpg"
import testimony1 from "../../assets/testimony1.jpg"
import testimony2 from "../../assets/testimony2.jpg"
import testimony3 from "../../assets/testimony3.jpg"
import testimony4 from "../../assets/testimony4.jpg"
import testimony5 from "../../assets/testimony5.jpg"
import benefit from "../../assets/benefit1.jpg"
import SecondNav from '../../component/secondNav/SecondNav'
import TxtImgBac from '../../component/txtImgBac/TxtImgBac'

const Career = () => {
   const [navOpen, setNavOpen] = useState(false);
  
    const toggleNav = () => {
      setNavOpen(!navOpen);
    };
      const [printedSection, setPrintedSection] = useState(0)
      const [move, setMove] = useState(0)
      const txtImaBach2 = "Here at Gateway, you're not just another employee—you’re an essential part of a vision-inspired, mission-driven team."
      const txtImaBacP="We invest in relationships, operate with transparency and integrity, and are committed to helping you reach your full potential. And, we have a lot of fun!"
      const [alertText, setAlertText] = useState(
              "I am here to alert to alert you about your problems"
            );
      const [alert, setAlert] = useState(false)
      const [loading, setLoading] = useState(false)
      const stillNeeded = "yes"
      const benefits = [
        {
          icon: "fa-solid fa-handshake",
          title: "Spiritual Growth",
          description: "At RCCG Newsprings, we prioritize spiritual development by offering daily prayers, in-depth Bible studies, and faith-building teachings. Working here strengthens your relationship with God while allowing you to serve in a Christ-centered environment that encourages worship and devotion."
        },
        {
          icon: "fa-solid fa-people-group",
          title: "Supportive Community",
          description: "You will be part of a close-knit Christian community that genuinely cares about your personal and spiritual well-being. Our team fosters an atmosphere of encouragement, collaboration, and mentorship, ensuring that you never feel alone in your journey of faith and service."
        },
        {
          icon: "fa-solid fa-chart-line",
          title: "Career Development",
          description: "We believe that growth is essential, not only spiritually but also professionally. RCCG Newsprings provides opportunities for skill enhancement, leadership training, and exposure to various aspects of ministry, media, and administration, preparing you for greater responsibilities."
        },
        {
          icon: "fa-solid fa-heart",
          title: "Meaningful Work",
          description: "Every task and assignment at RCCG Newsprings contributes to the greater purpose of spreading the gospel and positively impacting lives. You are not just working—you are serving God and making a lasting difference in people’s lives through media, outreach, and discipleship programs."
        },
        {
          icon: "fa-solid fa-house-user",
          title: "Work-Life Balance",
          description: "We understand the importance of maintaining a healthy work-life balance. Our flexible and encouraging work environment allows you to dedicate time to your family, personal interests, and spiritual activities while still being productive in your role within the ministry."
        },
        {
          icon: "fa-solid fa-graduation-cap",
          title: "Continuous Learning",
          description: "At RCCG Newsprings, you will have access to ongoing training sessions, leadership conferences, and mentorship programs that help you grow in your faith and professional expertise. We believe in equipping individuals with the right knowledge and skills to thrive in both ministry and career."
        }
      ];
      const testimonies = [
        {
          imageUrl: testimony1,
          testimony: "I never imagined that I could transition into the tech industry with such ease. The mentorship and structured learning process gave me the confidence to apply for roles I never thought I was qualified for. Now, I'm working as a software engineer at one of the leading tech companies, and I couldn't be more grateful!",
          name: "John Doe",
          company: "Tech Innovators Inc."
        },
        {
          imageUrl: testimony2,
          testimony: "Before joining this program, I struggled to find direction in my career. With the incredible support from mentors and hands-on training, I was able to refine my skills and secure a dream job. The structured learning and career guidance completely changed my perspective on what I could achieve!",
          name: "Jane Smith",
          company: "Creative Solutions Ltd."
        },
        {
          imageUrl: testimony3,
          testimony: "The journey to finding the right career path wasn't easy for me. I kept getting rejections and lost confidence in my abilities. However, this program not only equipped me with the technical skills but also helped me develop the right mindset. Now, I’m excelling in my role, and I owe it all to the training and support I received here!",
          name: "Michael Johnson",
          company: "Future Enterprises"
        },
        {
          imageUrl: testimony4,
          testimony: "Coming from a non-technical background, I was always afraid of stepping into the tech industry. But the step-by-step guidance, real-world projects, and interview coaching provided by this program made all the difference. I now have a rewarding job that I love and endless growth opportunities ahead of me!",
          name: "Emily Williams",
          company: "Bright Futures Corp."
        }
      ];
      const testimonyImages = [
        { imageUrl: worker2 },
        { imageUrl: worker1 },
        { imageUrl: worker3 },
        { imageUrl: worker4 },
        { imageUrl: worker5 }
      ];
         let sectionTracker = 0
       //  let imageTracker = 0
       useEffect(() => {
        // const imageInterval = setInterval(() => {
        //   imageInterval++
        //   setPrintedImage(imageTracker % 4)
      
        //   setTimeout(() => {
        //     console.log("tracker:",sectionTracker,   "printedsection:",printedSection)
        //   }, 2000);
        
        // }, 4000);
       
         const sectionInterval = setInterval(() => {
           sectionTracker++
           setPrintedSection(sectionTracker % 4)
       
           setTimeout(() => {
             console.log("tracker:",sectionTracker,   "printedsection:",printedSection)
           }, 2000);
         
         }, 4000);
       
       
       
         return () => {
           clearInterval(sectionInterval);
          // clearInterval(imageInterval);
         }
       }, [])
        const handleSubmit = async (e) => {
           e.preventDefault();
           const form = e.target;
         
           const formData = {
             fullName: form.fullName.value.trim(),
             email: form.email.value.trim(),
             phone: form.phone.value.trim(),
             dob: form.dob.value,
             gender: form.gender.value,
             bornAgain: form.bornAgain.value,
           };
         
           // Validation
           const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
           const phoneRegex = /^(\+234|0)[789][01]\d{8}$/; // Simple Nigerian phone format
         
           if (!formData.fullName) {
             setAlertText("Full name is required.");
             setAlert(true);
             return;
           }
         
           if (!emailRegex.test(formData.email)) {
             setAlertText("Please enter a valid email address.");
             setAlert(true);
             return;
           }
         
           if (!phoneRegex.test(formData.phone)) {
             setAlertText("Enter a valid Nigerian phone number like +2349012345678.");
             setAlert(true);
             return;
           }
         
           if (!formData.dob) {
             setAlertText("Date of birth is required.");
             setAlert(true);
             return;
           }
         
           const birthDate = new Date(formData.dob);
           const today = new Date();
           const age = today.getFullYear() - birthDate.getFullYear();
           const monthDiff = today.getMonth() - birthDate.getMonth();
           const dayDiff = today.getDate() - birthDate.getDate();
         
           if (age < 14 || (age === 14 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
             setAlertText("You must be at least 14 years old to register.");
             setAlert(true);
             return;
           }
         
           if (!formData.gender) {
             setAlertText("Please select your gender.");
             setAlert(true);
             return;
           }
         
           if (!formData.bornAgain) {
             setAlertText("Please indicate if you're born again.");
             setAlert(true);
             return;
           }
         
           try {
            setLoading(true)
             await axios.post('http://localhost:4000/api/career/register', formData);
             setAlertText('Registration successful!');
             setAlert(true);
             form.reset();
             setLoading(false)
           } catch (err) {
             console.error('Error submitting registration:', err);
             setAlertText('Registration failed. Please try again.');
             setAlert(true);
             setLoading(false)
           }
         };

         if (loading) return (
          <div className="testimonyFormLoader">
          <div className="loader"></div>
        </div>
         );
  return (
    <>
       {alert && (
      <div className="alert_holder">
        <div className="alert">
          <p>{alertText}</p>
          <div onClick={() => setAlert(false)} className="btn">
            <p>OK</p>
          </div>
        </div>
      </div>
    )}
    <div className='about career'>
      <SecondNav text={"join the team"} link={"/connect"} btntext={"view all jobs"}/>
       <div className="career_hero">
        <img src={image1} alt="" />
        <div className="text">
            <h3>Let’s impact lives together.</h3>
            <p>At Gateway, we’re all about people because God is all about people. If you want to use your gifts and skills to impact lives and communities, we’d love to connect with you! We have full-time and part-time positions available where you can live out your purpose alongside others who are passionate about Jesus.

</p>
<p>Whether you have a background or an interest in administration, creative services, live production, or ministry leadership, there’s a place for you at Gateway.</p>
        </div>
       </div>
           {testimonies.map((testimony, index)=>(
             index === printedSection ? <div key={index} className={`career_testimony`}>
       
       
       
           <div className="text">
               <div className="ps">
                 {testimony.testimony} 
               </div>
               <h1>{testimony.name}</h1>
               <span>{testimony.company}</span>
             </div> 
             <div className="career_image"> 
              <img src={testimony.imageUrl} alt={`Testimony from ${testimony.name}`} /> 
              <div className="tracker">
                {[...Array(4)].map((spot,sptidx)=>(<div className={`${printedSection == sptidx?"active":""}`}></div>))}
              </div>
              {printedSection >= 1?<div onClick={()=>{setPrintedSection(prev=>prev-1)}} className="moveleft iconactive"><i className="fa-solid fa-arrow-left-long"></i></div>:null}
              {printedSection <= 2?<div onClick={()=>{setPrintedSection(prev=>prev+1)}} className="moveright iconactive"><i className="fa-solid fa-arrow-right-long"></i></div>:null}
         
              </div>         
           </div>:null 
           ))}
       
       <div className="career_testimony_image_container">
       {move>-205?<i onClick={()=>{if(move>-205)setMove((prev)=>prev+-65.3); console.log(move)}} className="moveright iconactive fa-solid fa-arrow-right"></i>:null}
         {move<=-10?<i onClick={()=>{if(move<=-10)setMove((prev)=>prev+65.3); console.log(move)}} className="moveleft iconactive fa-solid fa-arrow-left"></i>:null}
        
  
  <div className="career_testimony_image" style={{transform: `translateX(${move}%)` }}>
    {testimonyImages.map((item, index) => (
      <img key={index} src={item.imageUrl} alt={`Testimony ${index + 1}`} />
    ))}
  </div>
        </div>
       <div className="career_benefit_holder ">
       <h2>Benefits of Working at Gateway</h2>
        <div className="career_benefit_container container">
      
        {benefits.map((benefit, index) => (
        <div className="benefit_card" key={index}>
          <i className={benefit.icon}></i>
          <h3>{benefit.title}</h3>
          <p>{benefit.description}</p>
        </div>
      ))}
        </div>
    
       </div>
     <TxtImgBac img={benefit} p={txtImaBacP} h2={txtImaBach2} textClass={"text"} link={""} linktext={""}/>
       <div className="university">
        <h2>The Convenant University</h2>
        <p>The King’s University (TKU) is an accredited, Spirit-empowered, evangelical university founded in partnership with Gateway Church. TKU combines higher education with practical ministry experience, preparing students to serve in the local church, the marketplace, and around the world. We’re constantly seeking dynamic individuals to join our team. Browse all open faculty and staff positions to find a place for you!</p>
        <a className="btn" href="https://run.edu.ng/">
          <p>
            see opening <i className="fa-solid fa-arrow-right-long"></i>
          </p>
        </a>
       </div>
           {stillNeeded.toLowerCase() === "yes" ? (
        <>
          <div className="signuppage">
            <span></span>
            <img src="https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-6/487809254_1077807161039898_3562322017601138802_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeEJ-Hl3TueI62uYUks1khVgQH0Hr9hY6nVAfQev2FjqddOblFGoV8qpFFvkNFcgzvLyEmoiiLN_ApRSxqO1EpqE&_nc_ohc=ZVwGfFXEUbkQ7kNvwHQG4Ys&_nc_oc=AdkFFd87S2TthDnWflKWiDlmKUSRc-LiKtG0UjNvhwfBsadpQcIbvJQvngtEmG2jhaE&_nc_zt=23&_nc_ht=scontent-los2-1.xx&_nc_gid=3U49bYYBTZtXxC8JgFtGoA&oh=00_AfGuLWMuunkmCSKVI-drqHHT1l-20l6ymJX0W879PJOaEQ&oe=6811D08B" alt="Church welcome" />
          </div>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name</label>
            <input id="fullName" name="fullName" type="text" placeholder="Your full name"  />
            <label htmlFor="email">Email Address</label>
            <input id="email" name="email" type="email" placeholder="your@example.com"  />
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" name="phone" type="tel" placeholder="+234 80 1234 5678"  />
            <label htmlFor="dob">Date of Birth</label>
            <input id="dob" name="dob" type="date"  />
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" >
              <option value=""> Select </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <label htmlFor="bornAgain">Are you born again?</label>
            <select id="bornAgain" name="bornAgain" >
              <option value=""> Select </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <button type="submit">Register Now</button>
          </form>
        </>
      ) : (
        <p style={{ color: 'red', textAlign: 'center' }}>Registration is currently closed.</p>
      )}
    </div>
    </>
  )
}

export default Career
