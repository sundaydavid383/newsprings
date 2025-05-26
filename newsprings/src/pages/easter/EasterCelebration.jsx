import React, { useState } from "react";
import "./easter.css";
import image1 from "../../assets/rccg8.jpg"
import { useEffect } from "react";

// const easterSections = [
//   {
//     image: image1,
//     title: "Welcome to Easter at Newspring",
//   },
//   {
//     className: "hero",
//     title: "He Is Risen!",
//     subtitle: "Experience New Life This Easter",
//     text: "Easter at RCCG Newspring Church is a time of joy, reflection, and victory as we celebrate the resurrection of our Lord and Savior Jesus Christ. Join us for a powerful weekend experience filled with inspiring worship, heartfelt messages, and vibrant community.",
//     description: "From the sorrow of Good Friday to the triumphant celebration of Resurrection Sunday, our Easter weekend invites you into a story of hope and redemption. Whether you're coming alone, with friends, or family, you'll find a place to belong and a reason to rejoice.",
//     cta: {
//       href: "#plan-your-visit",
//       text: "Plan Your Visit"
//     }
//   },
//   {
//     className: "intro",
//     title: "Come and worship the resucrected king",
//     paragraphs: [
//       "This Easter, we joyfully celebrate the resurrection of our Lord and Savior Jesus Christ. Join us for a weekend of worship, reflection, fellowship, and spiritual renewal.",
//       "Whether you're new to the faith or a long-time believer, our Easter programs are designed to uplift your soul, reconnect you with God, and reignite the joy of salvation."
//     ],
//   },
//   {
//     className: "event-highlights",
//     title: "Event Highlights",
//     list: [
//       "Good Friday Service: April 18, 2025 at 6:00 PM – A solemn evening of reflection on the sacrifice of Christ.",
//       "Easter Prayer Walk: April 19, 2025 at 7:00 AM – Community prayer and worship through the neighborhood.",
//       "Youth Drama Night: April 19, 2025 at 5:00 PM – A powerful drama presentation by the youth ministry.",
//       "Sunrise Worship: April 20, 2025 at 6:30 AM – A peaceful worship gathering to start Easter morning.",
//       "Resurrection Celebration Service: April 20, 2025 at 9:00 AM – A joyful Easter service filled with worship, word, and celebration."
//     ]
//   },
//   {
//     className: "children-youth",
//     title: "Children & Youth",
//     paragraphs: [
//       "We have special programs for kids and teens during all major services. Our Easter Egg Hunt for kids will happen on Easter Sunday right after the main service. Teens will also enjoy relevant teachings, games, and connection time.",
//       "Our dedicated children and youth volunteers ensure a safe, engaging, and fun environment where young hearts can grow in faith and experience the joy of Easter in their own way."
//     ]
//   },
//   {
//     className: "testimonies",
//     title: "Testimonies & Baptisms",
//     paragraphs: [
//       "Be inspired by powerful testimonies of transformation, healing, and restoration shared throughout the Easter weekend. We will also be conducting water baptisms on Easter Sunday afternoon for new believers and rededications.",
//       "This is a beautiful moment of outward expression for those who have decided to follow Christ. If you’d like to be baptized, please contact us ahead of time to register."
//     ]
//   },
//   {
//     className: "plan-your-visit",
//     title: "Plan Your Visit",
//     paragraphs: [
//       "RCCG Newspring Church is located at 332 Ikorodu Road, Lagos. We have adequate parking and a warm welcome team ready to assist you. Come dressed comfortably and bring a heart ready to encounter God.",
//       "You’ll find directional signage and friendly faces to guide you. Whether it's your first time or you’ve been here before, you’ll feel right at home with us."
//     ],
//     link: {
//       href: "https://www.google.com/maps/place/332+Ikorodu+Rd,+Lagos/",
//       text: "Get Directions"
//     }
//   },
//   {
//     className: "contact",
//     title: "Contact & Inquiries",
//     paragraphs: [
//       "Need help planning your visit or have questions about the Easter events? Reach out to us at ",
//     ],
//     contact: {
//       email: "info@rccgnewspring.org",
//       phone: "09032197266"
//     }
//   }
// ];

const EasterCelebration = () => {
      const baseUrl = 'https://newsprings.onrender.com/'
        const [alertText, setAlertText] = useState("");
        const [alert, setAlert] = useState(false);
        const [loading, setLoading] = useState(true);
    const [easterSections, setEasterSections] = useState(null)
    useEffect(() => {
      const fetchEasterDetails = async ()=>{
        setLoading(true)
        try {
        const response = await fetch('http://localhost:4000/api/easter');
        const data = await response.json()
        setEasterSections(data)
        console.log("this is the easter details response:", data)
        } catch (error) {
          setAlert(true)
          setAlertText("error loading the data try refreshing")
          console.error("there is an error fetching easter dat:", error)
        }
        finally{
          setLoading(false)
        }

      }

      fetchEasterDetails()
    }, [])
    if(loading) return (
   <div className="EasterLoader">
  <div className="visualizer">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>
    )
    if(alert) return <div className="alert_holder">
              <div className="alert">
                <p>{alertText}</p>
                <div onClick={() => setAlert(false)} className="btn">
                  <p>OK</p>
                </div>
              </div>
            </div>
     
  return (
    <div className="easter-wrapper">
      {easterSections && (easterSections.map((section, index) => (
        <section key={index} className={section.className}>
        {section.image && <img src={section.image} className="easter-image"  alt="easter celebration image"/>}
          <h2>{section.title}</h2>


          {section.subtitle && <h3 className="subtitle">{section.subtitle}</h3>}
          {section.text && <p className="text">{section.text}</p>}
          {section.description && <p className="description">{section.description}</p>}

          {section.paragraphs &&
            section.paragraphs.map((p, i) => <p key={i}>{p}</p>)}

          {section.list && (
            <ul>
              {section.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}

          {section.link && (
            <a
              href={section.link.href}
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>{section.link.text}<i className="fa-solid fa-arrow-right-long"></i></p>
            </a>
          )}

          {/* {section.cta && (
            <a href={section.cta.href} className="btn">
              <p>{section.cta.text}<i className="fa-solid fa-arrow-right-long"></i></p>
            </a>
          )} */}

          {section.contact && (
            <p>
              Reach out to us at <a href={`mailto:${section.contact.email}`}>{section.contact.email}</a> or call us at {section.contact.phone}.
            </p>
          )}
        </section>
      )))}
    </div>
  );
};

export default EasterCelebration;
