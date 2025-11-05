import React from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

function Services() {
  return (
    <section className="section services" id="services">
      <span className="spots">
        <div className="spot"></div>Services
      </span>
      <h1 className="title">What I do best</h1>
      <div className="bests">
        <div className="best">
          <p>01</p>
          <img
            src="https://framerusercontent.com/images/wjS0gBIEcgDgMg7kfh0BlkJWUI.jpg?scale-down-to=2048&width=5184&height=3456"
            alt=""
          />
          <div className="content">
            <h2 className="subtitle">Content Creating</h2>
            <p>
              Fast, trendy, and built for TikTok, Reels, and Shorts. Quick cuts
              that hook and keep viewers watching.
            </p>
            <div className="tags">
              <div className="tag">
                <div className="spot"></div>
                Clean Cuts
              </div>
              <div className="tag">
                <div className="spot"></div>
                Captions & Subtitles
              </div>
              <div className="tag">
                <div className="spot"></div>
                Sound Design
              </div>
            </div>
          </div>
        </div>
        <div className="best">
          <p>02</p>
          <img
            src="https://framerusercontent.com/images/FeANZZDwFn5J3I7mtnEtxNQ9fM.png"
            alt=""
          />
          <div className="content">
            <h2 className="subtitle">Meta/Tiktok ads</h2>
            <p>
              Professional YouTube videos and documentaries. Cinematic storytelling
              that engages audiences for the long haul.
            </p>
            <div className="tags">
              <div className="tag">
                <div className="spot"></div>
                Color Grading
              </div>
              <div className="tag">
                <div className="spot"></div>
                Motion Graphics
              </div>
              <div className="tag">
                <div className="spot"></div>
                Story Structure
              </div>
            </div>
          </div>
        </div>
        <div className="best c">
          <p>03</p>
          <img
            src="https://framerusercontent.com/images/wjS0gBIEcgDgMg7kfh0BlkJWUI.jpg?scale-down-to=2048&width=5184&height=3456"
            alt=""
          />
          <div className="content">
            <h2 className="subtitle">Google Ads</h2>
            <p>
              Compelling brand stories and promotional content. From concept to
              delivery, creating videos that convert.
            </p>
            <div className="tags">
              <div className="tag">
                <div className="spot"></div>
                Brand Strategy
              </div>
              <div className="tag">
                <div className="spot"></div>
                Script Writing
              </div>
              <div className="tag">
                <div className="spot"></div>
                Visual Effects
              </div>
            </div>
          </div>
        </div>
        <div className="best">
          <p>04</p>
          <img
            src="https://framerusercontent.com/images/FeANZZDwFn5J3I7mtnEtxNQ9fM.png"
            alt=""
          />
          <div className="content">
            <h2 className="subtitle">Websites</h2>
            <p>
              High-converting ad creatives for Facebook, Instagram, and TikTok.
              Optimized for maximum ROI and engagement.
            </p>
            <div className="tags">
              <div className="tag">
                <div className="spot"></div>
                A/B Testing
              </div>
              <div className="tag">
                <div className="spot"></div>
                Performance Analytics
              </div>
              <div className="tag">
                <div className="spot"></div>
                Conversion Optimization
              </div>
            </div>
          </div>
        </div>
       
      </div>
      <div className="button-wrapper">
        <button className="button main">
          <a href="/#sad">
            Hire me <FaRegArrowAltCircleRight />
          </a>
        </button>
      </div>
    </section>
  );
}

export default Services;
