import React, { useEffect, useRef, useState } from "react";

const processSteps = [
  {
    number: "1",
    title: "Înțelegem brandul tău",
    description: "Stabilim obiectivele, publicul și stilul potrivit pentru tine.",
  },
  {
    number: "2",
    title: "Plan și idei de conținut",
    description: "Propunem concepte, scenarii și direcția pentru fiecare clip.",
  },
  {
    number: "3",
    title: "Filmăm conținutul",
    description: "Venim la locație, organizăm totul și tragem cadrele de care avem nevoie.",
  },
  {
    number: "4",
    review: true,
    title: "Edităm și optimizăm",
    description: "Montaj, subtitrări, sunet, adaptări pentru fiecare platformă.",
  },
  {
    number: "5",
    title: "Programăm și postăm",
    description:
      "Ne ocupăm să apară constant, la orele corecte, unde trebuie.",
  },
  {
    number: "6",
    title: "Promovăm și scalăm",
    description:
      "Rulăm reclame plătite, analizăm și creștem rezultatele clip cu clip.",
  },
];

const How = () => {
  const sectionRef = useRef(null);
  const stepsRef = useRef(null);
  const trackRef = useRef(null);
  const sizesRef = useRef({ maxX: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const steps = stepsRef.current;
    if (!section || !track || !steps) return;

    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    const computeSizes = () => {
      // Only compute horizontal scroll on desktop
      if (!isMobile) {
        const trackW = track.scrollWidth;
        const visibleW = steps.clientWidth;
        sizesRef.current.maxX = Math.max(0, trackW - visibleW);
      }
    };

    const clamp01 = (v) => Math.max(0, Math.min(1, v));

    const onScroll = () => {
      // Only apply horizontal scroll animation on desktop
      if (isMobile) {
        // On mobile, just ensure no transform is applied
        track.style.transform = `translate3d(0px, 0, 0)`;
        return;
      }

      // Desktop horizontal scroll animation
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Calculate scroll progress more accurately
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = vh;

      // When section enters viewport from top
      if (sectionTop > 0) {
        track.style.transform = `translate3d(0px, 0, 0)`;
        return;
      }

      // When section is fully in viewport or scrolled past
      if (sectionTop + sectionHeight < windowHeight) {
        const maxScroll = sizesRef.current.maxX;
        const x = -maxScroll * 1.5; // Move past the end
        track.style.transform = `translate3d(${x}px, 0, 0)`;
        return;
      }

      // Calculate progress when section is partially visible
      const scrolledDistance = Math.abs(sectionTop);
      const totalScrollableDistance = sectionHeight - windowHeight;

      if (totalScrollableDistance > 0) {
        const progress = Math.max(
          0,
          Math.min(1, scrolledDistance / totalScrollableDistance)
        );
        const maxScroll = sizesRef.current.maxX;
        const x = -maxScroll * progress * 1.5;
        track.style.transform = `translate3d(${x}px, 0, 0)`;
      }
    };

    // Debounced resize handler for better performance
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        checkMobile();
        computeSizes();
      }, 150);
    };

    computeSizes();
    onScroll();

    // Only add scroll listener on desktop
    if (!isMobile) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (!isMobile) {
        window.removeEventListener("scroll", onScroll);
      }
      clearTimeout(resizeTimeout);
    };
  }, [isMobile]);

  return (
    <section
      className={`section how ${isMobile ? "mobile-how" : ""}`}
      id="process"
      ref={sectionRef}
    >
      <div className="how-container">
        <div className="how-header">
          <div className="how-tag">
            <div className="how-dot"></div>
            <p>Procesul</p>
          </div>
          <h2 className="title">Cum vom lucra împreună?</h2>
        </div>

        <div
          className={`process-steps ${isMobile ? "mobile-steps" : ""}`}
          ref={stepsRef}
        >
          <div className="ll"></div>
          <div className="rr"></div>
          <div
            className={`process-track ${isMobile ? "mobile-track" : ""}`}
            ref={trackRef}
          >
            {processSteps.map((step, index) => (
              <div
                className={`process-card ${step.review ? "review-step" : ""}`}
                key={`step-${index}`}
              >
                <div className="process-number">
                  <span>{step.number}</span>
                </div>
                <div className="process-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default How;
