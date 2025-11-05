import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

function FAQ() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: "What services do you offer?",
      answer: "We offer a wide range of video production services, including corporate videos, promotional videos, event coverage, animation, and more. Check out our services page for details."
    },
    {
      question: "How much does video production cost?",
      answer: "The cost of video production varies depending on the project's complexity, length, and specific requirements. We provide custom quotes based on your needs, so contact us for a personalized estimate."
    },
    {
      question: "How long does it take to produce a video?",
      answer: "The production timeline depends on the type and scope of the video. Simple projects may take a few weeks, while more complex ones may take several months. We'll provide you with a detailed production schedule during the planning phase."
    },
    {
      question: "Can you help with scriptwriting and storyboarding?",
      answer: "Yes, we offer scriptwriting and storyboarding services to help you develop a compelling narrative and visual concept for your video."
    },
    {
      question: "What is the production process like?",
      answer: "Our production process typically involves pre-production planning, filming or animation, post-production editing, and final delivery. We keep you involved at every stage to ensure your vision is realized."
    }
  ];

  return (
    <section className="section faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <div className="faq-tag">
            <div className="how-tag">
              <div className="how-dot"></div>
              <p>FAQ</p>
            </div>
          </div>
          <div className="faq-title-wrapper">
            <h2 className="faq-title">Frequently asked questions</h2>
          </div>
        </div>
        <div className="faq-list">
          <div className="faq-items">
            {faqData.map((item, index) => (
              <div key={index} className="faq-item">
                <div className="faq-item-wrapper">
                  <div
                    className={`faq-question ${openItems[index] ? 'expanded' : 'collapsed'}`}
                    onClick={() => toggleItem(index)}
                  >
                    <div className="faq-question-content">
                      <div className="faq-question-text">
                        <h4 className="faq-question-title">{item.question}</h4>
                      </div>
                      <div className="faq-icon-wrapper">
                        <MdKeyboardArrowDown className={`faq-icon ${openItems[index] ? 'rotated' : ''}`} />
                      </div>
                    </div>
                    <div className={`faq-answer ${openItems[index] ? 'visible' : 'hidden'}`}>
                      <div className="faq-answer-content">
                        <p className="faq-answer-text">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
