import React, { useRef } from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function Home() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="section" id="home">
      <div className="left">
        <span className="spots">
          <div className="spot"></div>3 Spots Available
        </span>
        <h1 className="title">
          Marketing Some <br />
          thing yes
        </h1>
        <p className="desc">Bette than u marketing yes</p>
        <div className="button-wrapper">
          <button className="button main">
            <a href="/#sad">
              CTA <FaRegArrowAltCircleRight />
            </a>
          </button>
        </div>
        <div className="socials">
          <img src={require("../assets/img/instagram.webp")} alt="" />
          <img src={require("../assets/img/yt.png")} alt="" />
          <img src={require("../assets/img/tt.png")} alt="" />
        </div>
        <div className="over">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 6.369 9.906 L 9.724 11.924 C 9.899 12.032 10.123 12.025 10.29 11.905 C 10.458 11.785 10.537 11.576 10.492 11.375 L 9.579 7.607 L 12.564 5.087 C 12.721 4.955 12.782 4.74 12.719 4.545 C 12.656 4.35 12.48 4.213 12.276 4.198 L 8.358 3.888 L 6.848 0.312 C 6.767 0.123 6.58 0 6.374 0 C 6.168 0 5.981 0.123 5.9 0.312 L 4.39 3.888 L 0.472 4.198 C 0.267 4.211 0.09 4.348 0.025 4.543 C -0.039 4.739 0.022 4.954 0.179 5.087 L 3.164 7.607 L 2.244 11.375 C 2.199 11.576 2.278 11.785 2.446 11.905 C 2.613 12.025 2.837 12.032 3.012 11.924 Z"
              fill-opacity="0.3"
              fill="#317ff5"
              height="12.000188038477893px"
              id="h2RVElj7m"
              transform="translate(9.006 2.25)"
              width="12.743701791581444px"
            ></path>
            <path
              d="M 6.369 9.906 L 9.724 11.924 C 9.899 12.032 10.123 12.025 10.29 11.905 C 10.458 11.785 10.537 11.576 10.492 11.375 L 9.579 7.607 L 12.564 5.087 C 12.721 4.955 12.782 4.74 12.719 4.545 C 12.656 4.35 12.48 4.213 12.276 4.198 L 8.358 3.888 L 6.848 0.312 C 6.767 0.123 6.58 0 6.374 0 C 6.168 0 5.981 0.123 5.9 0.312 L 4.39 3.888 L 0.472 4.198 C 0.267 4.211 0.09 4.348 0.025 4.543 C -0.039 4.739 0.022 4.954 0.179 5.087 L 3.164 7.607 L 2.244 11.375 C 2.199 11.576 2.278 11.785 2.446 11.905 C 2.613 12.025 2.837 12.032 3.012 11.924 Z"
              fill="transparent"
              height="12.000188038477893px"
              id="Omd1xueOI"
              stroke-dasharray=""
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              stroke="#317ff5"
              transform="translate(9.006 2.25)"
              width="12.743701791581444px"
            ></path>
            <path
              d="M 5.48 0 L 0 5.48"
              fill="transparent"
              height="5.479687499999997px"
              id="zIKXnFQZL"
              stroke-dasharray=""
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              stroke="#317ff5"
              transform="translate(2.25 11.02)"
              width="5.479687499999997px"
            ></path>
            <path
              d="M 4.993 0 L 0 4.993"
              fill="transparent"
              height="4.993124999999992px"
              id="lv4E4uZ0o"
              stroke-dasharray=""
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              stroke="#317ff5"
              transform="translate(3.75 16.757)"
              width="4.993124999999999px"
            ></path>
            <path
              d="M 5.089 0 L 0 5.089"
              fill="transparent"
              height="5.0887500000000045px"
              id="pTxkkoSCS"
              stroke-dasharray=""
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              stroke="#317ff5"
              transform="translate(10.5 16.661)"
              width="5.0887500000000045px"
            ></path>
          </svg>
          <p>Over 200+ Five Star Reviews</p>
        </div>
      </div>
      <div className="right">
        <div className="carousel">
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            centeredSlides
            slidesPerView={1.25}
            spaceBetween={24}
            speed={1200}
            navigation
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (!prevRef.current || !nextRef.current) return;
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            className="mySwiper"
          >
            {Array.from({ length: 9 }, (_, i) => i + 1).map((i) => (
              <SwiperSlide key={i}>
                <div className="slide">
                  <video
                    src={require(`../assets/videos/${i}.mp4`)}
                    controls={false}
                    autoPlay
                    loop
                    muted
                    playsInline
                  ></video>
                </div>
              </SwiperSlide>
            ))}
            {/* <SwiperSlide>
              <div className="slide">
                <video
                  src={require("../assets/videos/bg-video.mp4")}
                  controls={false}
                  autoPlay
                  loop
                  muted
                  playsInline
                ></video>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide">
                <video
                  src={require("../assets/videos/bg-video.mp4")}
                  controls={false}
                  autoPlay
                  loop
                  muted
                  playsInline
                ></video>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide">
                <video
                  src={require("../assets/videos/bg-video.mp4")}
                  controls={false}
                  autoPlay
                  loop
                  muted
                  playsInline
                ></video>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide">
                <video
                  src={require("../assets/videos/bg-video.mp4")}
                  controls={false}
                  autoPlay
                  loop
                  muted
                  playsInline
                ></video>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide">
                <video
                  src={require("../assets/videos/bg-video.mp4")}
                  controls={false}
                  autoPlay
                  loop
                  muted
                  playsInline
                ></video>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide">
                <video
                  src={require("../assets/videos/bg-video.mp4")}
                  controls={false}
                  autoPlay
                  loop
                  muted
                  playsInline
                ></video>
              </div>
            </SwiperSlide> */}
          </Swiper>
          <div className="gradient gradient-left"></div>
          <div className="gradient gradient-right"></div>
        </div>
        <div className="overlay">
          <button
            type="button"
            className="overlay-control hero-carousel-prev"
            aria-label="Previous video"
            ref={prevRef}
          >
            <span>&#8249;</span>
          </button>
          <button
            type="button"
            className="overlay-control hero-carousel-next"
            aria-label="Next video"
            ref={nextRef}
          >
            <span>&#8250;</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
