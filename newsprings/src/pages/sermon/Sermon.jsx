import React, { useEffect } from 'react'
import ShadowTextHero from '../../component/shadowtextHero/ShadowTextHero'
import FeatureBottom from '../../component/feature/FeatureBottom'

const Sermon = ({setActivePage}) => {
  useEffect(() => {
    setActivePage("sermons")
  }, [])
  
  const featureType = "sermon"
  const sermons = [
    {
      id: 1,
      title: "The Secret Power in Prayer!",
      preacher: "Unknown",
      date: "Published recently",
      youtubeLink: "https://www.youtube.com/embed/4-JARCqQdBE",
      imgSrc: "https://img.youtube.com/vi/4-JARCqQdBE/maxresdefault.jpg",
      description:
        "Prayer is more than just a ritual—it is a divine channel that connects us to the heart of God. In this sermon, you will discover how consistent and heartfelt prayers can unlock supernatural breakthroughs, bring peace in the midst of trials, and open doors that no man can shut. Learn the true power of prayer and how it can transform your life in ways beyond imagination.",
    },
    {
      id: 2,
      title: "The Personality of the Holy Spirit - Charles Spurgeon Sermons",
      preacher: "Charles Spurgeon",
      date: "Published recently",
      youtubeLink: "https://www.youtube.com/embed/aa39ZYdwEBc",
      imgSrc: "https://img.youtube.com/vi/aa39ZYdwEBc/maxresdefault.jpg",
      description:
        "In this enlightening sermon, Charles Spurgeon unpacks the unique characteristics and role of the Holy Spirit in the life of a believer. He delves into the Spirit’s personality, guiding presence, and transformational power, revealing how He leads, convicts, comforts, and empowers us to live a victorious Christian life. If you've ever struggled to understand who the Holy Spirit is and how He works, this message will provide deep insights.",
    },
    {
      id: 3,
      title: "True Prayer, True Power!",
      preacher: "Unknown",
      date: "Published recently",
      youtubeLink: "https://www.youtube.com/embed/i2QqTGsVqLM",
      imgSrc: "https://img.youtube.com/vi/i2QqTGsVqLM/maxresdefault.jpg",
      description:
        "This powerful sermon sheds light on the connection between genuine prayer and spiritual power. Many believers pray but do not see results because they lack an understanding of what true prayer entails. In this message, you will learn how to align your prayers with God's will, develop faith-filled prayers, and experience the full power of divine intervention in your life.",
    },
    {
      id: 4,
      title: "The Secret of the Lord",
      preacher: "Unknown",
      date: "Published recently",
      youtubeLink: "https://www.youtube.com/embed/lIXn4fN3irw",
      imgSrc: "https://img.youtube.com/vi/lIXn4fN3irw/maxresdefault.jpg",
      description:
        "God reveals His secrets to those who walk closely with Him. In this message, you will explore the depth of intimacy with the Lord and how cultivating a deep relationship with Him allows you to access divine wisdom, direction, and protection. This sermon is an invitation to go beyond surface-level Christianity and experience the mysteries of God's presence.",
    },
    {
      id: 5,
      title: "The Most Powerful Word Ever Spoken",
      preacher: "Granger Smith",
      date: "Published recently",
      youtubeLink: "https://www.youtube.com/embed/aa39ZYdwEBc",
      imgSrc: "https://img.youtube.com/vi/aa39ZYdwEBc/maxresdefault.jpg",
      description:
        "Words have the power to build or destroy, to heal or hurt, to give life or bring death. In this thought-provoking sermon, Granger Smith explores the most powerful word ever spoken and its impact on humanity. Discover how a single word from God can change everything in your life and how speaking His truth can shift circumstances in your favor.",
    },
    {
      id: 6,
      title: "The Best of Everything - Receiving The Best of God",
      preacher: "Unknown",
      date: "Published recently",
      youtubeLink: "https://www.youtube.com/embed/lIXn4fN3irw",
      imgSrc: "https://img.youtube.com/vi/lIXn4fN3irw/maxresdefault.jpg",
      description:
        "God reveals His secrets to those who walk closely with Him. In this message, you will explore the depth of intimacy with the Lord and how cultivating a deep relationship with Him allows you to access divine wisdom, direction, and protection. This sermon is an invitation to go beyond surface-level Christianity and experience the mysteries of God's presence.",
    },
    {
      id: 7,
      title: "The Power of Choosing Joy - Bill Johnson",
      preacher: "Bill Johnson",
      date: "Published recently",
      youtubeLink: "https://www.youtube.com/embed/u22XtGOHbRw",
      imgSrc: "https://img.youtube.com/vi/u22XtGOHbRw/maxresdefault.jpg",
      description:
        "God reveals His secrets to those who walk closely with Him. In this message, you will explore the depth of intimacy with the Lord and how cultivating a deep relationship with Him allows you to access divine wisdom, direction, and protection.",
    },
    {
      id: 8,
      title: "A Very Unpopular Sermon",
      preacher: "Pastor Travis Greene",
      date: "Published 3 weeks ago",
      youtubeLink: "https://www.youtube.com/embed/Qfoh8lyGJ0A",
      imgSrc: "https://img.youtube.com/vi/Qfoh8lyGJ0A/maxresdefault.jpg",
      description:
        "God reveals His secrets to those who walk closely with Him. In this message, you will explore the depth of intimacy with the Lord and how cultivating a deep relationship with Him allows you to access divine wisdom, direction, and protection.",
    },
    {
      id: 9,
      title: "Let Me Show You The Door",
      preacher: "Pastor Steven Furtick",
      date: "Published 6 months ago",
      youtubeLink: "https://www.youtube.com/embed/qfaPgrJMIJM",
      imgSrc: "https://img.youtube.com/vi/qfaPgrJMIJM/maxresdefault.jpg",
      description:
        "God reveals His secrets to those who walk closely with Him. In this message, you will explore the depth of intimacy with the Lord and how cultivating a deep relationship with Him allows you to access divine wisdom, direction, and protection.",
    },
    {
      id: 10,
      title: "How the First Christmas Changed Everything",
      preacher: "Dr. Tony Evans",
      date: "Published 3 months ago",
      youtubeLink: "https://www.youtube.com/embed/2mcajJ0QaMo",
      imgSrc: "https://img.youtube.com/vi/2mcajJ0QaMo/maxresdefault.jpg",
      description:
        "God reveals His secrets to those who walk closely with Him. In this message, you will explore the depth of intimacy with the Lord and how cultivating a deep relationship with Him allows you to access divine wisdom, direction, and protection.",
    }
,   {

      id: 11,
       title: "How the First Christmas Changed Everything",
      preacher: "Dr. Tony Evans",
      date: "Published 3 months ago",
      youtubeLink: "https://www.youtube.com/embed/2mcajJ0QaMo",
      imgSrc: "https://img.youtube.com/vi/2mcajJ0QaMo/maxresdefault.jpg",
      description: "God reveals His secrets to those who walk closely with Him. In this message, you will explore the depth of intimacy with the Lord and how cultivating a deep relationship with Him allows you to access divine wisdom, direction, and protection. This sermon is an invitation to go beyond surface-level Christianity and experience the mysteries of God's presence."},
    {
      id: 12,
       title: "Living in the Abiding Presence of God",
      preacher: "Pastor Bill Johnson",
      date: "Published 3 months ago",
      youtubeLink: "https://www.youtube.com/embed/CjdnOBKdSao",
      imgSrc: "https://img.youtube.com/vi/CjdnOBKdSao/maxresdefault.jpg",
      description: "God reveals His secrets to those who walk closely with Him. In this message, you will explore the depth of intimacy with the Lord and how cultivating a deep relationship with Him allows you to access divine wisdom, direction, and protection. This sermon is an invitation to go beyond surface-level Christianity and experience the mysteries of God's presence."},
    {
      id: 13,
       title: "Why Do You Exist? I Know The Answer.",
      preacher: "Granger Smith",
      date: "Published 1.4 years ago",
      youtubeLink: "https://www.youtube.com/embed/3ICzPL-Wr3c",
      imgSrc: "https://img.youtube.com/vi/3ICzPL-Wr3c/maxresdefault.jpg",
      description: "God reveals His secrets to those who walk closely with Him. In this message, you will explore the depth of intimacy with the Lord and how cultivating a deep relationship with Him allows you to access divine wisdom, direction, and protection. This sermon is an invitation to go beyond surface-level Christianity and experience the mysteries of God's presence."},
    {
      id: 14,
       title: "Set FREE From Guilt and Stress by the POWER of Grace",
      preacher: "Pastor Joseph Prince",
      date: "Published 2 months ago",
      youtubeLink: "https://www.youtube.com/embed/UnUFLRTEBko",
      imgSrc: "https://img.youtube.com/vi/UnUFLRTEBko/maxresdefault.jpg",
      description: "God reveals His secrets to those who walk closely with Him. In this message, you will explore the depth of intimacy with the Lord and how cultivating a deep relationship with Him allows you to access divine wisdom, direction, and protection. This sermon is an invitation to go beyond surface-level Christianity and experience the mysteries of God's presence."},
    {
      id: 16,
       title: "Something New",
      preacher: "Pastor Larry Loewen",
      date: "Published 2 weeks ago",
      youtubeLink: "https://www.youtube.com/embed/2uX6unr_o-c",
      imgSrc: "https://img.youtube.com/vi/2uX6unr_o-c/maxresdefault.jpg",
      description: "God reveals His secrets to those who walk closely with Him. In this message, you will explore the depth of intimacy with the Lord and how cultivating a deep relationship with Him allows you to access divine wisdom, direction, and protection. This sermon is an invitation to go beyond surface-level Christianity and experience the mysteries of God's presence."},
    {
      id: 17,
       title: "Life is Better When You Put God First!",
      preacher: "Unknown",
      date: "Published recently",
      youtubeLink: "https://www.youtube.com/embed/aN-WOw1RrZU",
      imgSrc: "https://img.youtube.com/vi/aN-WOw1RrZU/maxresdefault.jpg",
      description: "God reveals His secrets to those who walk closely with Him. In this message, you will explore the depth of intimacy with the Lord and how cultivating a deep relationship with Him allows you to access divine wisdom, direction, and protection. This sermon is an invitation to go beyond surface-level Christianity and experience the mysteries of God's presence."},
    {
      id: 18,
       title: "The Secret Power in Prayer!",
      preacher: "Unknown",
      date: "Published recently",
      youtubeLink: "https://www.youtube.com/embed/4-JARCqQdBE",
      imgSrc: "https://img.youtube.com/vi/4-JARCqQdBE/maxresdefault.jpg",
      description: "God reveals His secrets to those who walk closely with Him. In this message, you will explore the depth of intimacy with the Lord and how cultivating a deep relationship with Him allows you to access divine wisdom, direction, and protection. This sermon is an invitation to go beyond surface-level Christianity and experience the mysteries of God's presence." }
  ];
  return (
    <div className='sermon'>
       <ShadowTextHero/>
       <FeatureBottom cards={sermons} featureType={featureType}/>
    </div>
  )
}

export default Sermon

