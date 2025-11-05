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
  const thumbnailSrc =
    "https://framerusercontent.com/images/3W8VcleAdJoA8i0BTj7JInHKuE.png?width=2880&height=1620";
  const thumbnailImages = Array.from({ length: 6 }, () => thumbnailSrc);

  const aboutStats = [
    { value: "20+", label: "Active clients" },
    { value: "30M+", label: "Views generated" },
    { value: "200+", label: "Monthly videos posted" },
    { value: "000", label: "Something cool" },
  ];
  const aboutImages = {
    primary:
      "https://framerusercontent.com/images/m8kUVzjDoFIfJGof9UQLop8bX8.png?width=1200&height=1200",
    secondary:
      "https://framerusercontent.com/images/5T3js1ouRyIKgpPoNrHSvh0aE.png?width=1200&height=1200",
  };
  const aboutTools = [
    {
      src: "https://framerusercontent.com/images/NNQGmaj3ZIC78sIAPo2iLipwQ.png?width=2101&height=2049",
      alt: "Adobe Premiere Pro logo",
    },
    {
      src: "https://framerusercontent.com/images/qktZqlilMGc0kxLxe4rGqvdwE.png?width=512&height=500",
      alt: "Adobe After Effects logo",
    },
    {
      src: "https://framerusercontent.com/images/o1hqKckXTzMM6YQzhXA5v20lUU.png?width=1200&height=1200",
      alt: "DaVinci Resolve logo",
    },
    {
      src: "https://framerusercontent.com/images/XYhwhxXuEi3N5tgsUyxCU8Rmd6g.png?width=320&height=320",
      alt: "Notion logo",
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
          <img
            src={aboutImages.secondary}
            className="bot"
            alt="Creator working at desk"
          />
          <div className="about-header">
            <div className="about-tag">
              <div className="about-dot"></div>
              <p>Hey, just an intro</p>
            </div>
            <h2 className="about-title">Marketing good yes yes results</h2>
            <p className="desc">Marketing good yes yes results</p>
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
                <span>Hire me</span>
                <FaRegArrowAltCircleRight />
              </a>
            </div>
          </div>
          <div className="about-tools">
            <h3 className="about-tools-title">Tools I use</h3>
            <div className="about-tools-grid">
              {aboutTools.map((tool) => (
                <div className="about-tool-card" key={tool.src}>
                  <img src={tool.src} alt={tool.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <span className="spots">
          <div className="spot"></div>Work
        </span>
        <h1 className="title">ShortForm showcase</h1>
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
        <span className="spots">
          <div className="spot"></div>Work
        </span>
        <h1 className="title">Thumbnail designs</h1>
        <div className="thumbnails-marquee">
          <div className="thumbnails-gradient thumbnails-gradient-left"></div>
          <div className="thumbnails-gradient thumbnails-gradient-right"></div>
          <div className="thumbnails-marquee-inner">
            {thumbnailImages.concat(thumbnailImages).map((src, index) => (
              <div className="thumbnail-card" key={`thumb-${index}`}>
                <img src={src} alt="youtube thumbnail" />
              </div>
            ))}
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
            <a href="/#sad">
              See all my works <FaRegArrowAltCircleRight />
            </a>
          </button>
        </div>
      </section> */}
    </>
  );
}

export default Work;
