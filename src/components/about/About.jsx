import { useState, useEffect } from "react";
import "./style.css";
import Footer from "../footer/Footer";

// Şəkilləri import edirik
import about1 from "../../assets/images/about1.avif";
import about2 from "../../assets/images/about2.jpg";
import about3 from "../../assets/images/about3.avif";
import abouticon from "../../assets/images/abouticon.png";
import medalicon from "../../assets/images/medalicon.png";
import heart from "../../assets/images/heart.png";
import handicon from "../../assets/images/handicon.png";
import { Link, Links } from "react-router-dom";

// İkonları obyekt şəklində saxlayırıq
const iconMap = {
  "abouticon.png": abouticon,
  "medalicon.png": medalicon,
  "heart.png": heart,
  "handicon.png": handicon
};

const imageMap = {
  "about1.avif": about1,
  "about2.jpg": about2,
  "about3.avif": about3
};

const About = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/About.data.json") // JSON faylının düzgün yolu
      .then((response) => {
        if (!response.ok) {
          throw new Error("JSON yüklənmədi!");
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Xəta baş verdi:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Xəta: {error}</p>;
  if (!data) return <p style={{ color: "red" }}>Data tapılmadı!</p>;

  return (
    <>
      {/* Birinci hissə */}
      <section className="first">
        {data.about.slice(0, 1).map((item, index) => (
          <div key={index} className="first-container">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <img src={imageMap[item.image] || item.image} alt="About" />
          </div>
        ))}
      </section>

      {/* İkinci hissə */}
      <section className="second">
        {data.about.slice(1, 2).map((item, index) => (
          <div key={index} className="second-container">
            <button className="btn">Our story</button>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <div className="gallery">
              {item.images.map((img, i) => (
                <div key={i} className={`image-container rotated${i + 1}`}>
                  <img src={imageMap[img] || img} alt={`Gallery ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Üçüncü hissə - Dəyərlər */}
      <section className="third">
        <div className="container my-5">
          <div className="text text-center">
            <button className="btn values">Values</button>
            <h2>
              The core values that drive everything what we do
            </h2>
          </div>
          <div className="row mt-4">
            {data.values.map((value, index) => (
              <div key={index} className="col-md-6 mt-3 col-12">
                <div className="card-about p-4 shadow-sm">
                  <div className="d-flex align-items-center">
                    <div className="icon-box me-3">
                      <img
                        src={iconMap[value.icon] || value.icon}
                        alt={value.title}
                        width="50"
                      />
                    </div>
                    <div>
                      <h5 className="fw-bold">{value.title}</h5>
                      <p>{value.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Aşağıdakı düymələr */}
          <div className="buttons mt-4">
            {data.buttons.map((btn, index) => (
              <Link
                key={index}
                to={btn.link}
                className={`btn ${btn.class}`}
              >
                {btn.text}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
