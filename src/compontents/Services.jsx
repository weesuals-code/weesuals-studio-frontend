import React from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

function Services() {
  return (
    <section className="section services" id="services">
      <span className="how-tag">
        <div className="how-dot"></div>Serviciile noastre
      </span>
      <h1 className="title">Ce putem face pentru brandul tău?</h1>
      <div className="bests">
        <div className="best">
          <p>01</p>
          <img
            src={require("../assets/img/pexels-judit-peter-281675-1766604.webp")}
            alt=""
          />
          <div className="content">
            <h2 className="subtitle">Creare de Conținut</h2>
            <p>
              Clipuri rapide, trend-based, pentru TikTok, Reels și Shorts. Storytelling natural și hook-uri care țin oamenii până la final.
            </p>
            <div className="tags">
              <div className="tag">
                <div className="spot"></div>
                Editare short-form
              </div>
              <div className="tag">
                <div className="spot"></div>
                Titluri & subtitrări
              </div>
              <div className="tag">
                <div className="spot"></div>
                Design audio pentru impact
              </div>
            </div>
          </div>
        </div>
        <div className="best">
          <p>02</p>
          <img
            src={require("../assets/img/pexels-pixabay-267350.webp")}
            alt=""
          />
          <div className="content">
            <h2 className="subtitle">Campanii plătite pe Meta & TikTok</h2>
            <p>
              Ne ocupăm de tot: setare, targetare și optimizare. Pui bugetul, iar noi îl transformăm în rezultate reale.
            </p>
            <div className="tags">
              <div className="tag">
                <div className="spot"></div>
                Creare și lansare reclame
              </div>
              <div className="tag">
                <div className="spot"></div>
                Targetare și testare A/B
              </div>
              <div className="tag">
                <div className="spot"></div>
                Rapoarte lunare
              </div>
            </div>
          </div>
        </div>
        <div className="best c">
          <p>03</p>
          <img
                       src={require("../assets/img/pexels-cottonbro-6986455.webp")}
 alt=""
          />
          <div className="content">
            <h2 className="subtitle">Google Ads</h2>
            <p>
              Setăm și optimizăm reclame pe Google astfel încât oamenii care caută exact ce vinzi tu… să dea de tine și nu de competiție.

            </p>
            <div className="tags">
              <div className="tag">
                <div className="spot"></div>
                Căutări relevante
              </div>
              <div className="tag">
                <div className="spot"></div>
                Optimizare constantă
              </div>
              <div className="tag">
                <div className="spot"></div>
                Rapoarte lunare
              </div>
            </div>
          </div>
        </div>
        <div className="best">
          <p>04</p>
          <img
                       src={require("../assets/img/pexels-kevin-ku-92347-577585 (1).webp")}
 alt=""
          />
          <div className="content">
            <h2 className="subtitle">Website de prezentare</h2>
            <p>
              Construim site-uri care arată bine și vând. Ușor de folosit, clare pentru client, optimizate ca să nu pierzi oameni pe drum.

            </p>
            <div className="tags">
              <div className="tag">
                <div className="spot"></div>
                Design modern și rapid
              </div>
              <div className="tag">
                <div className="spot"></div>
                UX simplu și logic
              </div>
              <div className="tag">
                <div className="spot"></div>
                Pagini gândite
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="button-wrapper">
        <button className="button main">
          <a href="/#contact">
            Hai să lucrăm împreună <FaRegArrowAltCircleRight />
          </a>
        </button>
      </div>
    </section>
  );
}

export default Services;
