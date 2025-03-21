import { useState, useEffect } from "react";
import "./style.css";
import Footer from "../footer/Footer";
// Şəkilləri import edirik
import images from "../../assets/images/images.png";
import cardTeeth2 from "../../assets/images/cardTeeth2.svg";
import cardTEETH from "../../assets/images/cardTEETH.svg";
import CARDTEETHh from "../../assets/images/CARDTEETHh.svg";
import cardteeth3 from "../../assets/images/cardteeth3.svg";
import cardddteeth from "../../assets/images/cardddteeth.svg";
import { Link } from "react-router-dom";

// Şəkil xəritəsi yaradılır
const imageMap = {
  "images.png": images,
  "cardTeeth2.svg": cardTeeth2,
  "cardTEETH.svg": cardTEETH,
  "CARDTEETHh.svg": CARDTEETHh,
  "cardteeth3.svg": cardteeth3,
  "cardddteeth.svg": cardddteeth
};

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [data, setData] = useState({ header: {}, services: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/services.data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("JSON yüklənmədi!");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
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
  if (!data.services.length) return <p>Data tapılmadı!</p>;

  return (
    <>
      <section className="services">
        <div className="services-container">
          <div className="text-services">
            <div>
              <h1>{data.header.title}</h1>
              <p>{data.header.description}</p>
            </div>
            <button className="btn book-btn-services"><Link to="/contact" className="text-light">Book an Appointment</Link></button>
          </div>
          <div className="services-grid">
            {data.services.map((service, index) => (
              <div
                key={index}
                className="service-card"
                onClick={() => {
                  console.log(service); // Dəyərlərin doğru olduğunu yoxlayın
                  setSelectedService(service);
                }}
              >
                {/* Şəkili göstəririk */}
                <div className="service-img">
                  <img
                    src={imageMap[service.img] || service.img || ""}
                    alt={service.title}
                  />
                </div>
                <h5>{service.title}</h5>
                <p>{service.description}</p>
                <a href="#">Learn More</a>
              </div>
            ))}
          </div>
        </div>
        {/* Açılan Panel */}
        {selectedService && (
          <div className={`side-panel ${selectedService ? "active" : ""}`}>
            <button
              className="close-btn"
              onClick={() => setSelectedService(null)}
            >
              ✖
            </button>
            <h2>{selectedService.title}</h2>
            <p>{selectedService.addInfo}</p>
            <button className="btn apply-btn"><Link to="/contact" className="text-light">Apply</Link></button>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Services;
