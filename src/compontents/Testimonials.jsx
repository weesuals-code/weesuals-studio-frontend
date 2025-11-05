import React from "react";

function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <div className="how-tag">
            <div className="how-dot"></div>
              <p>Testimonials and results</p>
          </div>
          <div className="testimonials-title">
            <h2>Edits that speaks</h2>
          </div>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="testimonial-avatar-wrapper">
                <div className="testimonial-avatar">
                  <img
                    src="https://framerusercontent.com/images/sZAuHNJdOtCki4xvwObsRGgjy6c.webp?width=160&height=160"
                    alt=""
                    className="testimonial-avatar-img"
                  />
                </div>
              </div>
              <div className="testimonial-info">
                <div className="testimonial-name">
                  <h4>Alicia R.</h4>
                </div>
                <div className="testimonial-role">
                  <p>Content Manager</p>
                </div>
              </div>
            </div>
            <div className="testimonial-content">
              <div className="testimonial-text">
                <p>
                  I needed a fast turnaround on a tight deadline—and not only
                  was it delivered early, the quality blew me away. This is the
                  editor you want in your corner.
                </p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="testimonial-avatar-wrapper">
                <div className="testimonial-avatar">
                  <img
                    srcSet="
                      https://framerusercontent.com/images/L4tBLeCRIfP3ldbCiydL2JHD9E.jpg?scale-down-to=512&width=1208&height=1091 512w,
                      https://framerusercontent.com/images/L4tBLeCRIfP3ldbCiydL2JHD9E.jpg?scale-down-to=1024&width=1208&height=1091 1024w,
                      https://framerusercontent.com/images/L4tBLeCRIfP3ldbCiydL2JHD9E.jpg?width=1208&height=1091 1208w
                    "
                    src="https://framerusercontent.com/images/L4tBLeCRIfP3ldbCiydL2JHD9E.jpg?scale-down-to=1024&width=1208&height=1091"
                    alt=""
                    className="testimonial-avatar-img"
                  />
                </div>
              </div>
              <div className="testimonial-info">
                <div className="testimonial-name">
                  <h4>Jordan K.</h4>
                </div>
                <div className="testimonial-role">
                  <p>Personal Brand Strategist</p>
                </div>
              </div>
            </div>
            <div className="testimonial-content">
              <div className="testimonial-text">
                <p>
                  They took raw footage and turned it into a masterpiece. I felt
                  heard every step of the way, and the creative direction
                  exceeded what I had in mind.
                </p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="testimonial-avatar-wrapper">
                <div className="testimonial-avatar">
                  <img
                    src="https://framerusercontent.com/images/WKpve62YziTjK4ZpuFVWy5qXbw.webp?width=160&height=160"
                    alt=""
                    className="testimonial-avatar-img"
                  />
                </div>
              </div>
              <div className="testimonial-info">
                <div className="testimonial-name">
                  <h4>Emily T.</h4>
                </div>
                <div className="testimonial-role">
                  <p>Youtuber</p>
                </div>
              </div>
            </div>
            <div className="testimonial-content">
              <div className="testimonial-text">
                <p>
                  I had hours of interview footage and no idea where to start.
                  What came back was a tight, emotionally engaging story that my
                  audience loved. It even boosted my YouTube retention rate by
                  30%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
