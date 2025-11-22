import React, { useEffect, useState } from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const TikTokVideo = ({ videoId }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);

      try {
        // Verificăm cache local (evită apeluri repetate)
        const cached = localStorage.getItem(`tiktok_${videoId}`);
        if (cached) {
          setVideoUrl(cached);
          setLoading(false);
          return;
        }

        // Construim URL-ul TikTok complet (username nu e necesar)
        const tiktokUrl = `https://www.tiktok.com/@placeholder/video/${videoId}`;

        // Facem cererea către API
        const res = await fetch(
          `https://www.tikwm.com/api/?url=${encodeURIComponent(tiktokUrl)}`
        );
        const data = await res.json();

        if (data?.data?.play) {
          setVideoUrl(data.data.play);
          localStorage.setItem(`tiktok_${videoId}`, data.data.play);
        } else {
          console.error("Răspuns invalid:", data);
        }
      } catch (err) {
        console.error("Eroare TikTok:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  if (loading) return <p>Se încarcă video...</p>;
  if (!videoUrl)
    return (
      <p style={{ color: "red" }}>
        Nu s-a putut încărca clipul TikTok (posibil temporar). Reîncearcă.
      </p>
    );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "20px 0",
      }}
    >
      <video
        src={videoUrl}
        controls
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "12px",
          background: "black",
        }}
      />
    </div>
  );
};

function Work() {
 
  const thumbnailImages = [
    require("../assets/img/UncleVic feed.webp"),
    require("../assets/img/UncleVic feed (1).webp"),
    require("../assets/img/Postari Feed Gavas (1).webp"),
    require("../assets/img/Post 2.webp"),
    require("../assets/img/GAVAS - FEED.webp"),
    require("../assets/img/bere a la cluj.webp"),
  ];

  const aboutStats = [
    { value: "20+", label: "Clienți" },
    { value: "30M+", label: "Vizualizări generate" },
    { value: "200+", label: "Videoclipuri produse lunar" },
    { value: "300%+", label: "Creștere medie în engagement" },
  ];
  const aboutImages = {
    primary:
      "https://framerusercontent.com/images/m8kUVzjDoFIfJGof9UQLop8bX8.png?width=1200&height=1200",
    secondary:
      "https://framerusercontent.com/images/5T3js1ouRyIKgpPoNrHSvh0aE.png?width=1200&height=1200",
  };
const aboutTools = [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg",
      alt: "Adobe Premiere Pro logo",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg",
      alt: "Adobe After Effects logo",
    },
  {
      // Folosim un PNG transparent direct, SVG-ul DaVinci face probleme des
      src: "https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png",
      alt: "DaVinci Resolve logo",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg",
      alt: "Notion logo",
    },
   



    {
      src: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
      alt: "Adobe Photoshop logo"
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/5/56/Adobe_Photoshop_Lightroom_Classic_CC_icon.svg",
      alt: "Adobe Lightroom logo"
    },
    {
      src: "https://cdn.simpleicons.org/mailchimp",
      alt: "Mailchimp logo"
    },
    
{
  src: "https://cdn.brandfetch.io/idlz8Uc70L/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1756467802185",
  alt: "Metricool logo"
},
{
  src: "https://studio-culture.com.au/wp-content/uploads/2020/10/klaviyo-logo.png",
  alt: "Klaviyo logo"
},
{
  src: "https://cdn.brandfetch.io/idUmqKFgE3/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1743997736787",
  alt: "CapCut logo"
},

   
];

  return (
    <>
      <section className="section about" id="about">
        <div className="about-container">
          <img
            src={aboutImages.primary}
            className="top"
            alt="Freelancer in a conference call"
          />
          {/* <img
            src={aboutImages.secondary}
            className="bot"
            alt="Creator working at desk"
          /> */}
          <div className="about-header">
            <div className="how-tag">
              <div className="how-dot"></div>
              <p>Pe scurt despre noi</p>
            </div>
            <h2 className="about-title">Creăm conținut care livrează</h2>
            <p className="desc">Strategie, producție și rezultate reale pentru branduri care vor să crească.</p>
          </div>
          <div className="about-content">
            <div className="about-left">
              <div className="about-stats">
                <div className="about-divider"></div>
                {aboutStats.map((stat) => (
                  <div className="about-stat" key={stat.label}>
                    <h3>{stat.value}</h3>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
              <a className="about-cta" href="/#contact">
                <span>Hai să lucrăm împreună </span>
                <FaRegArrowAltCircleRight />
              </a>
            </div>
          </div>
          <div className="about-tools">
            <h3 className="about-tools-title">Instrumentele pe care le folosim</h3>
            <div className="about-tools-grid">
              {aboutTools.map((tool) => (
                <div className="about-tool-card" key={tool.src}>
                  <img src={tool.src} alt={tool.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <span className="how-tag">
          <div className="how-dot"></div>Portofoliu
        </span>
        <h1 className="title">Videouri pentru Social Media</h1>
        <div className="videos">
          {Array.from({ length: 5 }, (_, i) => i + 10).map((i) => (
            <video
              className="vid"
              src={require(`../assets/videos/${i}.mp4`)}
              controls={false}
              autoPlay
              loop
              muted
              playsInline
            ></video>
          ))}
        </div>
        <span className="how-tag" id="work">
          <div className="how-dot"></div>Portofoliu
        </span>
        <h1 className="title">Designuri pentru Social Media</h1>
        <div className="thumbnails-marquee">
          <div className="thumbnails-gradient thumbnails-gradient-left"></div>
          <div className="thumbnails-gradient thumbnails-gradient-right"></div>
          <div className="thumbnails-marquee-inner">
            {thumbnailImages.map((src, index) => (
              <div className="thumbnail-card" key={`thumb-${index}`}>
                <img src={src} alt="youtube thumbnail" />
              </div>
            ))}
            {/* <img src={
    require("../assets/img/UncleVic feed.png")
            } alt="" /> */}
          </div>
        </div>
      </section>
      {/* <section className="section work">
        <span className="spots">
          <div className="spot"></div>Work
        </span>
        <h1 className="title">Selected edits</h1>
        <div className="edits">
          <a href="" className="edit">
            <article role="presentation">
              <span className="tag">Talking Head</span>
              <img
                src="https://i.ytimg.com/vi_webp/G5DriM5YlC4/maxresdefault.webp"
                alt=""
              />
              <h2 className="subtitle">The hustle diaries</h2>
            </article>
          </a>{" "}
          <a href="" className="edit">
            <article role="presentation">
              <span className="tag">Talking Head</span>
              <img
                src="https://i.ytimg.com/vi_webp/G5DriM5YlC4/maxresdefault.webp"
                alt=""
              />
              <h2 className="subtitle">The hustle diaries</h2>
            </article>
          </a>{" "}
          <a href="" className="edit">
            <article role="presentation">
              <span className="tag">Talking Head</span>
              <img
                src="https://i.ytimg.com/vi_webp/G5DriM5YlC4/maxresdefault.webp"
                alt=""
              />
              <h2 className="subtitle">The hustle diaries</h2>
            </article>
          </a>{" "}
          <a href="" className="edit">
            <article role="presentation">
              <span className="tag">Talking Head</span>
              <img
                src="https://i.ytimg.com/vi_webp/G5DriM5YlC4/maxresdefault.webp"
                alt=""
              />
              <h2 className="subtitle">The hustle diaries</h2>
            </article>
          </a>
        </div>
        <div className="button-wrapper">
          <button className="button main">
            <a href="/#contact">
              See all my works <FaRegArrowAltCircleRight />
            </a>
          </button>
        </div>
      </section> */}
    </>
  );
}

export default Work;
