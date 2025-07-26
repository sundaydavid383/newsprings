import React, { useState } from 'react';
import './visitFAQ.css'; // Link to your CSS file

const faqs = [
  {
    question: "What should I wear to church?",
    answer: "Come as you are! Most people dress modestly and comfortably. Some wear traditional attire, while others go casual. God looks at the heart, and so do we.",
  },
  {
    question: "Do I need to bring anything?",
    answer: (
      <ul className="visit-list">
        <li><i className="fas fa-check"></i> A heart ready to receive from God</li>
        <li><i className="fas fa-check"></i> Your Bible or Bible app</li>
        <li><i className="fas fa-check"></i> A notebook and pen (if you like taking notes)</li>
      </ul>
    ),
  },
  {
    question: "Can I come if I’ve never been to church before?",
    answer: "Absolutely! Whether it’s your first time or you're returning after a while, you are welcome here. No pressure—just love, fellowship, and God’s Word.",
  },
  {
    question: "Is there a place to park?",
    answer: "Yes! We have free parking available for all visitors. Our welcome team will help guide you as you arrive.",
  },
  {
    question: "What time should I arrive?",
    answer: "We recommend arriving 10–15 minutes early, especially if it's your first time. That way, you can get familiar with the space and meet some friendly faces.",
  },
  {
    question: "Is there a place for my children?",
    answer: "Yes! We have a safe and fun environment for children where they learn about God in an age-appropriate way.",
  },
];

const VisitFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="visit-section alt-bg">
      <h2>Plan Your Visit – Questions & Answers</h2>
      <div className="faq-wrapper">
        {faqs.map((faq, index) => (
          <div key={index} className={`qa-item ${openIndex === index ? 'open' : ''}`}>
            <h3 className="question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="toggle-icon">{openIndex === index ? '−' : '+'}</span>
            </h3>
            <div className="answer">{openIndex === index && <div>{faq.answer}</div>}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisitFAQ;