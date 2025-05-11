import React, { useEffect, useState } from "react";
import "./stories.css";
import { Link } from "react-router";


const Stories = ({ setActivePage }) => {
  // let testimoniesvariable = [
  //   {
  //     image: image1,
  //     name: "John Doe",
  //     date: "2025-03-24",
  //     title: "Healing Through Faith",
  //     testimony:
  //       "For several months, I battled a severe illness that left me weak and hopeless. I had visited multiple hospitals, tried different medications, and even sought alternative treatments, but nothing seemed to work. My condition only worsened over time. Then, a friend invited me to RCCG New Springs. That day, the pastor preached on Isaiah 53:5, emphasizing that by His stripes, we are healed. I felt a strong conviction and went forward for prayers. As hands were laid on me, I felt a warm sensation run through my body. Instantly, I knew something had changed. My strength returned, and within days, I was completely healed. Medical tests confirmed what God had done. Today, I am healthier, stronger, and more committed to serving God. My faith has increased tremendously, and I now minister to others in need of healing.",
  //     scriptureReference: "Isaiah 53:5",
  //     testimonyCategory: "Healing",
  //     followUpAction: "Volunteering in the Healing & Deliverance team.",
  //     impact: "Inspiring others in my community to believe in divine healing.",
  //     lessonLearned: "Faith in God's Word brings undeniable transformation.",
  //     prayerRequest:
  //       "That my healing remains permanent and others may experience God's touch.",
  //     churchDetails: {
  //       name: "RCCG New Springs",
  //       location: "Lagos, Nigeria",
  //       pastor: "Pastor Jane Smith",
  //     },
  //   },
  //   {
  //     image: image2,
  //     name: "Mary Johnson",
  //     date: "2025-03-20",
  //     title: "Financial Breakthrough",
  //     testimony:
  //       "For years, I struggled financially despite working hard. I could never seem to get ahead, and unexpected expenses would always arise. However, after attending a teaching at RCCG New Springs about biblical financial principles, I applied what I learned—faithful tithing, saving wisely, and sowing into God's kingdom. Within weeks, things started shifting. I received an unexpected promotion at work with a salary increase beyond my expectations. Additionally, debts I thought would take years to pay off were miraculously cleared. Now, I have financial peace, and I am helping others understand godly financial principles.",
  //     scriptureReference: "Philippians 4:19",
  //     testimonyCategory: "Provision & Prosperity",
  //     followUpAction: "Teaching financial stewardship at church seminars.",
  //     impact: "Encouraging others to trust God in their finances.",
  //     lessonLearned:
  //       "Obedience to biblical financial principles brings supernatural results.",
  //     prayerRequest:
  //       "That I remain a faithful steward of the financial blessings God has given me.",
  //     churchDetails: {
  //       name: "RCCG New Springs",
  //       location: "Lagos, Nigeria",
  //       pastor: "Pastor Jane Smith",
  //     },
  //   },
  //   {
  //     image: image3,
  //     name: "James Williams",
  //     date: "2025-03-15",
  //     title: "Family Restoration",
  //     testimony:
  //       "For years, my family was on the verge of collapse due to constant misunderstandings and arguments. My wife and I barely communicated, and my children were growing distant. One evening, I attended a Family Restoration Service at RCCG New Springs. The pastor spoke on Joel 2:25-26, and I realized how much I had neglected prayer in my home. I apologized to my wife and started leading daily family devotions. Slowly, peace returned to our home. Today, we are stronger than ever, and I now encourage others in marriage and family restoration.",
  //     scriptureReference: "Joel 2:25-26",
  //     testimonyCategory: "Family & Relationships",
  //     followUpAction: "Counseling couples in the church.",
  //     impact: "Helping restore broken families through prayer and mentorship.",
  //     lessonLearned:
  //       "God can heal any broken relationship when we put Him first.",
  //     prayerRequest: "That my family continues to grow in love and unity.",
  //     churchDetails: {
  //       name: "RCCG New Springs",
  //       location: "Lagos, Nigeria",
  //       pastor: "Pastor Jane Smith",
  //     },
  //   },
  //   {
  //     image: image4,
  //     name: "Daniel Adebayo",
  //     date: "2025-03-05",
  //     title: "Miracle Job",
  //     testimony:
  //       "After over a year of unemployment, I was frustrated and discouraged. I had sent out numerous job applications but never got any responses. Then, I attended a special anointing service at RCCG New Springs. During the service, the pastor declared that doors of opportunity would open. I went home believing in that word. Within a week, I received multiple job offers! Today, I am employed in a role that surpasses my qualifications. My faith has grown, and I now support job seekers through church career workshops.",
  //     scriptureReference: "Deuteronomy 28:12",
  //     testimonyCategory: "Employment & Career",
  //     followUpAction: "Helping others through career counseling.",
  //     impact: "Encouraging those struggling with unemployment.",
  //     lessonLearned:
  //       "God’s timing is perfect, and He provides at the right moment.",
  //     prayerRequest:
  //       "That I excel in my new job and remain faithful in serving God.",
  //     churchDetails: {
  //       name: "RCCG New Springs",
  //       location: "Lagos, Nigeria",
  //       pastor: "Pastor Jane Smith",
  //     },
  //   },
  //   {
  //     image: image5,
  //     name: "Grace Ibeh",
  //     date: "2025-02-28",
  //     title: "Academic Excellence",
  //     testimony:
  //       "As a student, I struggled academically, failing courses despite my efforts. I was discouraged and doubted my abilities. Then, I committed to prayer and studying the Word at RCCG New Springs. I started declaring Daniel 1:17 over my studies, and gradually, my understanding improved. By God's grace, I graduated with first-class honors! I now mentor other students, teaching them how to balance faith and academics.",
  //     scriptureReference: "Daniel 1:17",
  //     testimonyCategory: "Education & Wisdom",
  //     followUpAction: "Mentoring students in spiritual and academic growth.",
  //     impact: "Motivating struggling students to trust God in their academics.",
  //     lessonLearned: "Diligence and prayer bring supernatural excellence.",
  //     prayerRequest:
  //       "That God continues to give me wisdom for greater academic achievements.",
  //     churchDetails: {
  //       name: "RCCG New Springs",
  //       location: "Lagos, Nigeria",
  //       pastor: "Pastor Jane Smith",
  //     },
  //   },
  //   {
  //     image: image6,
  //     name: "Emmanuel Adeyemi",
  //     date: "2025-02-22",
  //     title: "Divine Protection",
  //     testimony:
  //       "I survived a fatal accident without a single scratch after attending an anointing service at RCCG New Springs. I had been driving home when another vehicle lost control and crashed into mine. My car was severely damaged, but I walked out unharmed. I truly believe it was God's hand protecting me. I now share my testimony at safety and deliverance services to encourage others to trust in God’s protection.",
  //     scriptureReference: "Psalm 91:7",
  //     testimonyCategory: "Divine Protection",
  //     followUpAction: "Sharing testimonies in church deliverance services.",
  //     impact: "Helping others recognize the power of divine protection.",
  //     lessonLearned:
  //       "When you dwell under God's covering, no harm can come near you.",
  //     prayerRequest: "That my family remains under divine protection.",
  //     churchDetails: {
  //       name: "RCCG New Springs",
  //       location: "Lagos, Nigeria",
  //       pastor: "Pastor Jane Smith",
  //     },
  //   },
  //   {
  //     image: image7,
  //     name: "Esther Oladipo",
  //     date: "2025-02-15",
  //     title: "Supernatural Conception",
  //     testimony:
  //       "After five years of marriage without a child, I was on the verge of giving up hope. Doctors had diagnosed me with complications that made conception almost impossible. During a faith-building service at RCCG New Springs, I received a prophetic word that my barrenness would be turned to fruitfulness. I held onto that word and continued in prayer. Within three months, I conceived! Today, I am a joyful mother of twins, a testimony of God's faithfulness.",
  //     scriptureReference: "Genesis 21:2",
  //     testimonyCategory: "Fruitfulness",
  //     followUpAction:
  //       "Encouraging waiting couples through testimonies and prayers.",
  //     impact: "Restoring hope to other couples facing fertility challenges.",
  //     lessonLearned: "God makes the impossible possible in His perfect time.",
  //     prayerRequest: "That my children grow in the fear and wisdom of God.",
  //     churchDetails: {
  //       name: "RCCG New Springs",
  //       location: "Lagos, Nigeria",
  //       pastor: "Pastor Jane Smith",
  //     },
  //   },
  //   {
  //     image: image8,
  //     name: "Samuel Okechukwu",
  //     date: "2025-01-30",
  //     title: "Deliverance from Addiction",
  //     testimony:
  //       "For years, I struggled with substance addiction. It controlled my life, ruining my relationships and finances. My family had given up on me. One Sunday, I was invited to RCCG New Springs and reluctantly attended. During the worship session, I felt a heavy burden lift off me. After that day, I lost the desire for drugs and alcohol completely. I joined the deliverance team, and my life has never been the same.",
  //     scriptureReference: "2 Corinthians 5:17",
  //     testimonyCategory: "Deliverance",
  //     followUpAction: "Ministering to those battling addiction.",
  //     impact:
  //       "Helping others break free from destructive habits through faith.",
  //     lessonLearned: "True freedom is found in Jesus Christ.",
  //     prayerRequest:
  //       "That I continue to grow spiritually and help others find deliverance.",
  //     churchDetails: {
  //       name: "RCCG New Springs",
  //       location: "Lagos, Nigeria",
  //       pastor: "Pastor Jane Smith",
  //     },
  //   },
  //   {
  //     image: image9,
  //     name: "Sarah Akinwale",
  //     date: "2025-01-20",
  //     title: "Divine Favor in Immigration",
  //     testimony:
  //       "After years of trying to secure my residency abroad, I faced numerous rejections. Every attempt ended in disappointment. I decided to surrender my case to God, fasting and praying fervently. One Sunday, my pastor declared favor over pending applications, and I received it in faith. Miraculously, within weeks, my application was approved without any further hurdles! I now help others navigate their faith journey during immigration challenges.",
  //     scriptureReference: "Psalm 5:12",
  //     testimonyCategory: "Divine Favor",
  //     followUpAction: "Helping others trust God during immigration processes.",
  //     impact: "Encouraging people to put God first in major life decisions.",
  //     lessonLearned: "God’s favor opens doors no man can shut.",
  //     prayerRequest:
  //       "That I continue to walk in God's favor and be a blessing to others.",
  //     churchDetails: {
  //       name: "RCCG New Springs",
  //       location: "Lagos, Nigeria",
  //       pastor: "Pastor Jane Smith",
  //     },
  //   },
  // ];
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = 'http://localhost:4000/'

  useEffect(() => {
    setActivePage("testimonies");
    const fetchingStories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}getting-story`);
        const data = await response.json();
        console.log("testimonies:", data);
        if (data.error) {
          alert(data.error);
          setLoading(false);
        }
        setTestimonies(data?.data);
        setLoading(false);
      } catch (error) {
        console.error("An unexpected Error occured here");
        setLoading(false);
      }
    };

    fetchingStories();
  }, []);
  const [search, setSearch] = useState("");
  const [filteredTestimonies, setFilteredTestimonies] = useState([]);

  const onSearch = (e) => {
    e.preventDefault();
    const label = document.getElementById("formlb");

    if (search.trim() === "") {
      label.textContent = "You can't search with an empty search box";
      setFilteredTestimonies([]);
      return;
    } else {
      label.textContent = ""; // Clear error message
      const splitedSearch = search.split(" ").map((word) => word.toLowerCase()); // Normalize search input to lowercase and split into words

      setFilteredTestimonies(
        testimonies.filter((story) =>
          splitedSearch.every(
            (word) =>
              story.name.toLowerCase().includes(word) ||
              story.title.toLowerCase().includes(word) ||
              story.testimony.toLowerCase().includes(word) ||
              story.testimonyCategory.toLowerCase().includes(word)
          )
        )
      );

      setSearch(""); // Clear search input
    }
  };
  return (
    <div className="about aboutstory">
      <ul className="about_nav">
        <li>
          <Link to="/mission-and-vision">Mission and Vision</Link>
        </li>
        <li>
          <Link className={``} to="/core-values">
            Core Values
          </Link>
        </li>
        <li>
          <Link className={`liactive`} to="/stories">
            Stories
          </Link>
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
      <div className="about_stories">
        <h1>Stories</h1>
        <h3>Go through people testimonies</h3>
        <div className="formholder">
          <div className="formconatianer">
            <form className="story_form" onSubmit={onSearch}>
              {/* <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search for testimony by keyword, stories, etc..."
              />
            */}
              <input             value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search for testimony by keyword, stories, etc..."/>
                   <button type="submit">
                <i className="fa-solid fa-search"></i>
              </button>
            </form>
            <label htmlFor="" id="formlb"></label>
          </div>
        </div>

        <div className="">
          {loading ? (
            <div className="loader_holder">
              {Array.from({length:5}).map((_, index) => (
                <div key={index} className="loading_card">
                  <div className="loading_img"></div>
                  <div className="loading_title"></div>
                  <div className="loading_details"></div>
                  <div className="loading_text"></div>
                  <div className="loading_btn"></div>
                </div>
              ))}
            </div>
          ) : 
         testimonies ? 
         filteredTestimonies.length > 0 ? (
          <div className="about_stories_holder container">
            {filteredTestimonies.map((testifier, index) => (
              <div className="testifier" key={index}>
                <div className="image">
                  <img src={`${baseUrl}${testifier.image}`} alt={testifier.name} />
                </div>
      
                <div className="testifier_text">
                  <h2 className="title">{testifier.title} id_{testifier._id}</h2>
                  <div className="testifier_text_upper_details">
                    <p className="name">{testifier.name}</p>
                    <p>{testifier._id}</p>
                    <div className="testimonyCategory">{testifier.testimonyCategory}</div>
                    <div className="date">{testifier.date}</div>
                  </div>
                  <div className="testimony">
                    {testifier.testimony.slice(0, 200)}......
                  </div>
                </div>
                <Link className="btn" to={`/testimony/${testifier._id}`}>
                  <p>
                    Read more <i className="fa-solid fa-arrow-right-long"></i>
                  </p>
                  <div></div>
                </Link>
              </div>
            ))}
          </div>
        ) : 
        (
          <div className="about_stories_holder container">
            {testimonies.map((testifier, index) => (
              <div className="testifier" key={index}>
                <div className="image">
                  <img src={`${baseUrl}${testifier.image}`} alt={testifier.name} />
                </div>
      
                <div className="testifier_text">
                  <h2 className="title">{testifier.title}  </h2>
                  <div className="testifier_text_upper_details">
                    <p className="name">{testifier.name}</p>
                    <div className="testimonyCategory">{testifier.testimonyCategory}</div>
                    <div className="date">{testifier.date}</div>
                  </div>
                  <div className="testimony">
                    {testifier.testimony.slice(0, 200)}......
                  </div>
                </div>
                <Link className="btn" to={`/testimony/${testifier._id}`}>
                  <p>
                    Read more <i className="fa-solid fa-arrow-right-long"></i>
                  </p>
                  <div></div>
                </Link>
              </div>
            ))}
          </div>
        ): 
        <p className="nodata">No testimonies online yet</p>
          }
        </div>
      </div>
      <div className="about_links">
        <Link to={"/core-values"}>
          Core values <i class="fa-solid fa-caret-left"></i>
        </Link>
        <Link to={"/general"}>
          General Overseer <i class="fa-solid fa-caret-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default Stories;
