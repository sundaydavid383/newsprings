import React from "react";
import { Link, useParams } from "react-router";
import image1 from "../../assets/testifier1.jpg";
import image2 from "../../assets/testifier2.jpg";
import image3 from "../../assets/testifier3.jpg";
import image6 from "../../assets/testifier4.jpg";
import image4 from "../../assets/testifier5.jpg";
import image5 from "../../assets/testifier6.jpg";
import "./testimony.css";

const Testimony = ({}) => {
  const testimonies = [
    {
      image: image1,
      name: "John Doe",
      date: "2025-03-24",
      title: "Healing Through Faith",
      testimony:
        "For several months, I battled a severe illness that left me weak and hopeless. I had visited multiple hospitals, tried different medications, and even sought alternative treatments, but nothing seemed to work. My condition only worsened over time. Then, a friend invited me to RCCG New Springs. That day, the pastor preached on Isaiah 53:5, emphasizing that by His stripes, we are healed. I felt a strong conviction and went forward for prayers. As hands were laid on me, I felt a warm sensation run through my body. Instantly, I knew something had changed. My strength returned, and within days, I was completely healed. Medical tests confirmed what God had done. Today, I am healthier, stronger, and more committed to serving God. My faith has increased tremendously, and I now minister to others in need of healing.",
      scriptureReference: "Isaiah 53:5",
      testimonyCategory: "Healing",
      followUpAction: "Volunteering in the Healing & Deliverance team.",
      impact: "Inspiring others in my community to believe in divine healing.",
      lessonLearned: "Faith in God's Word brings undeniable transformation.",
      churchDetails: {
        name: "RCCG New Springs",
        location: "Lagos, Nigeria",
        pastor: "Pastor Jane Smith",
      },
      videoUrl: "https://www.youtube.com/embed/YkPyX3TCbJM",
    },
    {
      image: image2,
      name: "Mary Johnson",
      date: "2025-03-20",
      title: "Financial Breakthrough",
      testimony:
        "For years, I struggled financially despite working hard. I could never seem to get ahead, and unexpected expenses would always arise. However, after attending a teaching at RCCG New Springs about biblical financial principles, I applied what I learned—faithful tithing, saving wisely, and sowing into God's kingdom. Within weeks, things started shifting. I received an unexpected promotion at work with a salary increase beyond my expectations. Additionally, debts I thought would take years to pay off were miraculously cleared. Now, I have financial peace, and I am helping others understand godly financial principles.",
      scriptureReference: "Philippians 4:19",
      testimonyCategory: "Provision & Prosperity",
      followUpAction: "Teaching financial stewardship at church seminars.",
      impact: "Encouraging others to trust God in their finances.",
      lessonLearned:
        "Obedience to biblical financial principles brings supernatural results.",
      churchDetails: {
        name: "RCCG New Springs",
        location: "Lagos, Nigeria",
        pastor: "Pastor Jane Smith",
      },
      videoUrl: "https://www.youtube.com/embed/BBhAxGCZX6M",
    },
    {
      image: image3,
      name: "James Williams",
      date: "2025-03-15",
      title: "Family Restoration",
      testimony:
        "For years, my family was on the verge of collapse due to constant misunderstandings and arguments. My wife and I barely communicated, and my children were growing distant. One evening, I attended a Family Restoration Service at RCCG New Springs. The pastor spoke on Joel 2:25-26, and I realized how much I had neglected prayer in my home. I apologized to my wife and started leading daily family devotions. Slowly, peace returned to our home. Today, we are stronger than ever, and I now encourage others in marriage and family restoration.",
      scriptureReference: "Joel 2:25-26",
      testimonyCategory: "Family & Relationships",
      followUpAction: "Counseling couples in the church.",
      impact: "Helping restore broken families through prayer and mentorship.",
      lessonLearned:
        "God can heal any broken relationship when we put Him first.",
      churchDetails: {
        name: "RCCG New Springs",
        location: "Lagos, Nigeria",
        pastor: "Pastor Jane Smith",
      },
      videoUrl: "https://www.youtube.com/embed/M-PVxlxeU3k",
    },
    {
      image: image4,
      name: "Daniel Adebayo",
      date: "2025-03-05",
      title: "Miracle Job",
      testimony:
        "After over a year of unemployment, I was frustrated and discouraged. I had sent out numerous job applications but never got any responses. Then, I attended a special anointing service at RCCG New Springs. During the service, the pastor declared that doors of opportunity would open. I went home believing in that word. Within a week, I received multiple job offers! Today, I am employed in a role that surpasses my qualifications. My faith has grown, and I now support job seekers through church career workshops.",
      scriptureReference: "Deuteronomy 28:12",
      testimonyCategory: "Employment & Career",
      followUpAction: "Helping others through career counseling.",
      impact: "Encouraging those struggling with unemployment.",
      lessonLearned:
        "God’s timing is perfect, and He provides at the right moment.",
      churchDetails: {
        name: "RCCG New Springs",
        location: "Lagos, Nigeria",
        pastor: "Pastor Jane Smith",
      },
      videoUrl: "https://www.youtube.com/embed/Tip5LFBZZqE",
    },
    {
      image: image5,
      name: "Grace Ibeh",
      date: "2025-02-28",
      title: "Academic Excellence",
      testimony:
        "As a student, I struggled academically, failing courses despite my efforts. I was discouraged and doubted my abilities. Then, I committed to prayer and studying the Word at RCCG New Springs. I started declaring Daniel 1:17 over my studies, and gradually, my understanding improved. By God's grace, I graduated with first-class honors! I now mentor other students, teaching them how to balance faith and academics.",
      scriptureReference: "Daniel 1:17",
      testimonyCategory: "Education & Wisdom",
      followUpAction: "Mentoring students in spiritual and academic growth.",
      impact: "Motivating struggling students to trust God in their academics.",
      lessonLearned: "Diligence and prayer bring supernatural excellence.",
      churchDetails: {
        name: "RCCG New Springs",
        location: "Lagos, Nigeria",
        pastor: "Pastor Jane Smith",
      },
      videoUrl: "https://www.youtube.com/embed/UT0w_eAgfcA",
    },
    {
      image: image6,
      name: "Emmanuel Adeyemi",
      date: "2025-02-22",
      title: "Divine Protection",
      testimony:
        "I survived a fatal accident without a single scratch after attending an anointing service at RCCG New Springs. I had been driving home when another vehicle lost control and crashed into mine. My car was severely damaged, but I walked out unharmed. I truly believe it was God's hand protecting me. I now share my testimony at safety and deliverance services to encourage others to trust in God’s protection.",
      scriptureReference: "Psalm 91:7",
      testimonyCategory: "Divine Protection",
      followUpAction: "Sharing testimonies in church deliverance services.",
      impact: "Helping others recognize the power of divine protection.",
      lessonLearned:
        "When you dwell under God's covering, no harm can come near you.",
      churchDetails: {
        name: "RCCG New Springs",
        location: "Lagos, Nigeria",
        pastor: "Pastor Jane Smith",
      },
      videoUrl: "https://www.youtube.com/embed/8RfS3bl3uyU",
    },
  ];
  const { id } = useParams();

  let numid = id ? Number(id) : null;
  console.log("number",id);
  return (
  
      <div className="testimony_container ">
        {testimonies.map((testimony, index) =>(
            numid !== null && index === numid ? (
            
                <div key={index} className="testimony container">
                    <Link className="goback iconactive" to={"/stories"}>
                    <i class="fa-solid fa-arrow-left"></i>
                    </Link>
                    {console.log("index", index)}
                     
                  <div className="testimony_content">
                               <div className="image">
                               <img src={testimony.image} alt={testimony.name} />
                               </div>
                            
                             <div className="testimony_text">
                              
                               <h2 className="title">{testimony.title}</h2>
                               <div className="testimony_text_upper_details">
                                 <p className="name">{testimony.name}</p>
                                 <div className="testimonyCategory">{testimony.testimonyCategory}</div>
                                 <div className="date">{testimony.date}</div>
                           
                               </div>
                               <div className="testimonyP">{testimony.testimony}</div>
                                <div className="testimony_text_lower_details">
                                 <p className="lessonlearned"><span>{testimony.name} learnt    </span>:"{testimony.lessonLearned}"</p>
                                 <div className="scripture_ref">reference:<span>{testimony.scriptureReference}</span></div>
                               </div> 
                   
                             </div>
                           
                             <Link className="shareTestimony" to={`/stories`}>
            share your story of how God has help you <i className="fa-solid fa-caret-right"></i>
          </Link>
                  </div>
                 
                  <div className="iframe">
                  <div className="watch">
                    <p>we would have videos for people testimonies on a social media platfrom We passionately pursue serving our communities, demonstrating the love of Jesus, and activating Outreach at Gateway Church is Christ-centered, church-led  <a href="#">disciples</a></p>
                  </div>
                       <iframe
                    width="853"
                    height="480"
                    src={testimony.videoUrl}
                    title={`${testimony.name} ${testimony.title}`}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                  </div>
               
                </div>
              ) : null
        )
       
          
        )}
   
  
    </div>
  );
};

export default Testimony;
