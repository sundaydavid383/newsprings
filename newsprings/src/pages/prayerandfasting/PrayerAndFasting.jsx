import React from "react";
import "./prayerAndFasting.css";
import image1 from "../../assets/church10.jpg"

const PrayerAndFasting = () => {
  const texts = {
    header: {
      title: "100 Days of Prayer & Fasting",
      subtitle: "January 1 – April 10, 2025",
    },
    whyFast: [
      "Join us as we dedicate the first 100 days of the year to seek the Lord through prayer and fasting. This is a sacred time to draw closer to God, align with His purpose, and prepare our hearts for the year ahead. As we press in daily, we anticipate breakthroughs, revelations, and a refreshing outpouring of the Holy Spirit.",
      "But they that wait upon the LORD shall renew their strength... — Isaiah 40:31 (KJV)",
      "Deepen our relationship with God and build a more intimate walk with Him through consistent communion.",
      "Seek divine direction and clarity for decisions, goals, and the path ahead in this new year.",
      "Break spiritual strongholds and barriers that hinder progress in our lives and ministries.",
      "Intercede for our families, church, and nation, lifting up each burden to the One who hears and answers prayer.",
    ],
    howToParticipate: [
      "Start by committing to set aside time each day to pray and seek God’s face. It’s not about perfection, but consistency.",
      "Choose a fasting plan that works for you — whether it’s a full fast, partial fast, Daniel fast, or fasting from distractions like social media.",
      "Join our daily and weekly prayer sessions as listed in the schedule. We grow stronger when we pray together.",
      "Keep a journal to write down what God reveals to you during this period. Expect to hear from Him.",
      "Pray with intention. Bring your needs, your dreams, and your family before the Lord every day.",
      "Encourage others to join. Share the journey and build a community of faith and accountability.",
      "Let us not be weary in well doing: for in due season we shall reap, if we faint not. — Galatians 6:9 (KJV)",
    ],
    prayerFocus: [
      "Week 1: Personal Spiritual Growth",
      "Week 2: Family and Relationships",
      "Week 3: Church Unity and Revival",
      "Week 4: Community Outreach and Evangelism",
      "Week 5: National Peace and Leadership",
    ],
    schedule: [
      "Daily Morning Prayers: 6:00 AM – 7:00 AM",
      "Midweek Services: Wednesdays at 6:00 PM",
      "Weekly Virtual Prayer Meetings: Fridays at 9:00 PM",
    ],
    gallery: [
      { src: "https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/486418656_1072341268253154_6567267511588687863_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeEaqAYfeGTkuE2wup28bNlylbIVAcYWb12VshUBxhZvXUHaIa_p6a3YkxePknvKzGCIZjgOtIgtgvZXb89aQCwQ&_nc_ohc=7IrqlFakZngQ7kNvwHFdDUX&_nc_oc=Adm6wUNbE13S8Hn1awnj9FWMlHKDPzbag87uWFwg7M_vG1sgIi2FU12ENLvdmDN_s_Y&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=NrN5g31GEcQY58iT2rpJNQ&oh=00_AfHMrAjL67Z0SNBeCstu0zj7hIsGW9fZYarMW5si5poZmg&oe=680B027A", alt: "Prayer Session" },
      { src: "https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-6/485779922_1072341014919846_8863951847601621220_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeG9PD-Htsq-OlWhYfZJ9KQYq63H2-PSWaSrrcfb49JZpAq4eZc2i2y947dsz6hYxmQ9LWG92QGlhaCt1p5k8XDd&_nc_ohc=Yyq-dZRIF1AQ7kNvwGCvjK3&_nc_oc=AdkiK0ug-kE-aktNjZduGv-wBHEf0GrzfSImGISpf9ZnrhbwBEEb6k6x1jHJ8GrZtPs&_nc_zt=23&_nc_ht=scontent-los2-1.xx&_nc_gid=F5EV-Lv_w9KcigORPNUw6A&oh=00_AfFF0ApgW1Ul_5VrC1aW-8r9GvhI89SHepc9UKNn54z2Ig&oe=680C4B5B", alt: "Fasting Guide" },
      { src: "https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-6/486407734_1072343761586238_41615633686334511_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeEJq4_sR2Bt_NVysIA_sv1prJyxKNJLrzusnLEo0kuvO4pnqutC26jOvkBSOcINQmaE4PYnrzBF6bfM5Qk6CC3z&_nc_ohc=qaSuQQWOfJwQ7kNvwGsNTSz&_nc_oc=AdkuPSPa0W9dQDkC0QF7TTt6P7eKJsBqNC4Uh-8szGg6P24wam7AzBpZuiT8x420qP0&_nc_zt=23&_nc_ht=scontent-los2-1.xx&_nc_gid=1dBePn34ISIR4tleev4XLw&oh=00_AfEezZhpxTRpWw4t5J9nwBd133xTpCO68co_LO77faWygg&oe=680C4FAC", alt: "Community Worship" },
    ],
    join: [
      "Be part of this transformative journey. Whether you're new to fasting or have participated before, there's a place for you. Let us come together as a body of believers to seek God's face, pursue His will, and be transformed in His presence. Through this 100-day commitment, we believe lives will be changed, chains will be broken, and testimonies will abound."
    ],
  };

  return (
    <div className="prayerandfasting container">
    <img className="first_image" src={image1} alt="" />
      <header className="prayer-header">
        <h1>{texts.header.title}</h1>
        <p>{texts.header.subtitle}</p>
      </header>

      <main className="prayer-main">
        <section className="prayer-section">
          <h2>Why We Fast</h2>
          <p>{texts.whyFast[0]}</p>
          <blockquote>{texts.whyFast[1]}</blockquote>
          <ul>
            {texts.whyFast.slice(2).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>


        <section className="prayer-section">
          <h2>How to Participate</h2>
          <ul>
            {texts.howToParticipate.slice(0, 6).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <blockquote>{texts.howToParticipate[6]}</blockquote>
        </section>

        <section className="prayer-section">
          <h2>Weekly Prayer Focus</h2>
          <ul>
            {texts.prayerFocus.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="prayer-section">
          <h2>Schedule</h2>
          <ul>
            {texts.schedule.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="prayer-section">
          <h2>Gallery</h2>
          <div className="prayer-gallery">
            {texts.gallery.map((img, index) => (
              <img key={index} src={img.src} alt={img.alt} />
            ))}
          </div>
        </section>

        <section className="prayer-section join">
          <h2>Join Us</h2>
          {texts.join.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </section>
      </main>

   
    </div>
  );
};

export default PrayerAndFasting;
