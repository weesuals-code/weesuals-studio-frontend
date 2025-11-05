import React, { useState, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // First, send to your existing API
      const apiResponse = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Then send email via EmailJS
      const emailJsResponse = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          service: formData.service,
          budget: formData.budget,
          message: formData.description,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      const result = await apiResponse.json();
      console.log("API Response:", emailJsResponse);
      if (apiResponse.ok && emailJsResponse.status === 200) {
        setSubmitMessage(
          "Thank you! Your message has been sent successfully and we've received your submission."
        );
        setFormData({
          name: "",
          email: "",
          service: "",
          budget: "",
          description: "",
        });

        // Clear success message after 5 seconds
        setTimeout(() => setSubmitMessage(""), 5000);
      } else {
        // If API fails but EmailJS succeeds
        if (emailJsResponse.status === 200) {
          setSubmitMessage(
            "We've received your message via email, but there was an issue with our form submission. We'll still get back to you soon!"
          );
        } else {
          throw new Error("Both form submission methods failed");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage(
        "We encountered an issue. Please try again or contact us directly at weesuals@gmail.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <div className="section-tag">
            <div className="how-tag">
              <div className="dot" />
              <p>Contact</p>
            </div>
          </div>
          <h2 className="contact-title">One cut at a time</h2>
        </div>
        <div className="contact-grid">
          <div className="left-wrapper">
            <div className="heading-supporting-text">
              <h3 className="custom-quote-title">Need a custom quote?</h3>
              <p className="custom-quote-description">
                Don’t let your ideas sit idle—slide into our inbox and let’s
                make magic!
              </p>
            </div>
            <div className="email-link-wrapper">
              <a
                href="mailto:weesuals@gmail.com"
                target="_blank"
                rel="noopener"
                className="email-link dark"
              >
                <FaEnvelope />
                <p>weesuals@gmail.com</p>
              </a>
            </div>
          </div>
          <div className="form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <label className="form-label">
                  <p className="label-text">Name</p>
                  <div className="form-input">
                    <input
                      type="text"
                      required
                      name="name"
                      placeholder="Muzamal Hussain"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </label>
                <label className="form-label">
                  <p className="label-text">Email Address</p>
                  <div className="form-input">
                    <input
                      type="email"
                      required
                      name="email"
                      placeholder="Testing@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </label>
              </div>
              <label className="radio-group">
                <p className="label-text">What Service do you want</p>
                <div className="radio-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="service"
                      value="Short-Form Editing"
                      checked={formData.service === "Short-Form Editing"}
                      onChange={handleInputChange}
                    />
                    <p>Short-Form Editing</p>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="service"
                      value="Long-Form Editing"
                      checked={formData.service === "Long-Form Editing"}
                      onChange={handleInputChange}
                    />
                    <p>Long-Form Editing</p>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="service"
                      value="Motion Graphics"
                      checked={formData.service === "Motion Graphics"}
                      onChange={handleInputChange}
                    />
                    <p>Motion Graphics</p>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="service"
                      value="Thumbnail Design"
                      checked={formData.service === "Thumbnail Design"}
                      onChange={handleInputChange}
                    />
                    <p>Thumbnail Design</p>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="service"
                      value="Other"
                      checked={formData.service === "Other"}
                      onChange={handleInputChange}
                    />
                    <p>Other</p>
                  </label>
                </div>
              </label>
              <label className="radio-group">
                <p className="label-text">What's your budget</p>
                <div className="radio-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="budget"
                      value="Under $500"
                      checked={formData.budget === "Under $500"}
                      onChange={handleInputChange}
                    />
                    <p>Under $500</p>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="budget"
                      value="$500 - $1k"
                      checked={formData.budget === "$500 - $1k"}
                      onChange={handleInputChange}
                    />
                    <p>$500 - $1k</p>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="budget"
                      value="$1k - $5k"
                      checked={formData.budget === "$1k - $5k"}
                      onChange={handleInputChange}
                    />
                    <p>$1k - $5k</p>
                  </label>
                </div>
              </label>
              <label className="form-label long">
                <p className="label-text">Share Exactly what you want</p>
                <div className="form-input">
                  <textarea
                    required
                    name="description"
                    placeholder="Please provide a detailed description of your needs"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </label>
              <div className="form-button-wrapper">
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  <p>{isSubmitting ? "Sending..." : "Submit your request"}</p>
                </button>
              </div>
            </form>
            {submitMessage && (
              <p
                className={`response-note ${
                  submitMessage.includes("successfully") ? "success" : "error"
                }`}
              >
                {submitMessage}
              </p>
            )}
            <p className="response-note">
              Drop me a message, I typically respond within 24 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Form;
/**
 * nu am fct un filet 
 * sa fac desenul mai mare
 * cand tolerez trb H7 
 * trb realtiva ca sa moara mama
 * planitate e ok dar unde e ca eu nush de ce zice el:))
 * la tabel 2.2.2 la cilindrica ("nu inteleg ce e")
 * la rugozitate cica nu e ok ca "m am uitat la Rz", la Ra
 * nu e ok nimic ok la 2.2.2
 * la 3.1 grosime nu lungime
 * la desen de semifabricat nu e ok
 * 
 * 
 * 
 * 
 */