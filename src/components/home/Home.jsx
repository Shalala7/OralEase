import { useState, useEffect } from "react";

import Footer from "../footer/Footer";
import "./style.css";
// Şəkil xəritəsi
import doctor from "../../assets/images/doctor.jpeg";
import letter from "../../assets/images/letterIcon.webp";
import telephonee from "../../assets/images/telephonee.png";
import images from "../../assets/images/images.png";
import cardTeeth from "../../assets/images/cardTeeth.png";
import cardTeeth2 from "../../assets/images/cardTeeth2.svg";
import clock from "../../assets/images/clockIcon.jpg";
import cardTEETH from "../../assets/images/cardTEETH.svg";
import nurse from "../../assets/images/teeth.jpeg";
import dentist from "../../assets/images/dentistt.jpeg";

import sophie from "../../assets/images/sophie.jpg";
import morgan from "../../assets/images/morgan.jpg";
import lila from "../../assets/images/lila.jpg";
import braces from "../../assets/images/braces.webp";
import teethIcon from "../../assets/images/teethIcon.avif";
import toothbrush from "../../assets/images/toothbrush.jpg";
import tips from "../../assets/images/tips.avif";
import { Link, NavLink } from "react-router-dom";

const imageMap = {
  "doctor.jpeg": doctor,
  "letterIcon.webp": letter,
  "telephonee.png": telephonee,
  "images.png": images,
  "cardTeeth.png": cardTeeth,
  "cardTeeth2.svg": cardTeeth2,
  "cardTEETH.svg": cardTEETH,
  "teeth.jpeg": nurse,
  "dentistt.jpeg": dentist,
  "teethIcon.avif": teethIcon,
  "clockIcon.jpg": clock,
  "sophie.jpg": sophie,
  "morgan.jpg": morgan,
  "lila.jpg": lila,
  "braces.webp": braces,
  "toothbrush.jpg": toothbrush,
  "tips.avif": tips
};

const Home = () => {
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch("/Home.data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("JSON yüklənmədi!");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Gələn JSON:", data);
        setHome(data || {}); // JSON boş olsa belə, obyekt təyin edirik
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
  if (!home) return <p>Data tapılmadı!</p>;

  const validateForm = () => {
    let newErrors = {};

    if (!form.name.match(/^[A-Za-z\s]+$/)) {
      newErrors.name = "Only letters and spaces are allowed";
    }

    if (!form.email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.phone.match(/^\d{10}$/)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (form.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", form);
      alert("Form submitted successfully!");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
      setErrors({});
    }
  };

  return (
    <>
      <section className="first-home d-flex">
        <div className="home-page">
          <h1>{home?.heroSection?.title}</h1>
          <p>{home?.heroSection?.description}</p>
          {home?.heroSection?.buttons?.map((button, index) => (
            <button
              key={index}
              className={`btn ${
                index === 0
                  ? "first-book-btn"
                  : "services-btn"
              }`}
            >
              <Link
                to={button.link}
                className={index === 0 ? "text-light" : ""}
              >
                {button.text}
              </Link>
            </button>
          ))}
        </div>
        <div className="dctr-img">
          <img src={doctor} alt="Doctor" />
        </div>
        <div className="info-time">
          <div className="info-time-container">
            {home?.contactInfo?.map((item, index) => (
              <div key={index} className="info-time-cols">
                <div className="img-icons">
                  <img
                    src={imageMap[item.icon] || item.icon}
                    alt={item.title}
                  />
                </div>
                <div className="textT">
                  <h5>{item.title}</h5>
                  {item.phone && <p>{item.phone}</p>}
                  {item.email && <p>{item.email}</p>}
                  {item.linkText && item.link && (
                    <button className="btn btn-app">
                      <Link to={item.link}>{item.linkText}</Link>
                    </button>
                  )}
                  {item.hours &&
                    Object.entries(item.hours).map(([day, hours], i) => (
                      <p key={i}>
                        {day}: {hours}
                      </p>
                    ))}
                  {item.list &&
                    item.list.map((service, i) => <p key={i}>{service}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="second-home">
        <button className="btn service-btn"><Link to="/services">Our Services</Link></button>
        <div className="textAndBtn">
          <h3>{home?.servicesSection?.title}</h3>
          <button className="btn second-book-btn"><Link to="/contact" className="text-light">Book Appointment</Link></button>
        </div>
        <div className="cards-home gridCard">
          {home?.servicesSection?.services?.map((service, index) => (
            <div key={index} className="card flex-grow-1">
              <img
                src={imageMap[service.icon] || service.icon}
                className="card-img-top"
                alt={service.title}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
                <a href={service.link} className="btn mt-auto">
                  {service.linkText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="third-home">
        <div className="third-container-home">
          <div className="images">
            <img src={nurse} className="dentist" alt="" />
            <img src={dentist} className="nurse" alt="" />
          </div>
          <div className="third-text-home">
            <button className="btn services-btn-second"><NavLink to="/about">About us</NavLink></button>
            <h2>{home?.aboutSection?.title}</h2>
            <p>{home?.aboutSection?.description}</p>

            {/* Doctor Information */}
            <img src={doctor} alt="Doctor" />
            <h3>{home?.aboutSection?.doctor?.name}</h3>
            

            {/* About Clinic Button */}
            <a href={home?.aboutSection?.button?.link}>
              <button className="btn third-book-btn">
                {home?.aboutSection?.button?.text}
              </button>
            </a>
          </div>
        </div>
      </section>

      <section className="fourth-home text-center">
        <div className="text-container-home">
          {" "}
          <h2>{home?.teamSection?.title}</h2>
          <p>{home?.teamSection?.description}</p>
        </div>
        <div className="team">
          {home?.teamSection?.members?.map((member, index) => (
            <div key={index} className="team-card">
              <img
                src={imageMap[member.image] || member.image}
                alt={member.name}
                className="team-img"
              />
              <h4>{member.name}</h4>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
        <a href={home?.teamSection?.button?.link}>
          <button className="btn fourth-book-btn">
            {home?.teamSection?.button?.text}
          </button>
        </a>
      </section>

      <section className="last-home">
        <div className="last-container-home">
          <div className="contact-home">
            {" "}
            <button className="btn contact-btn">
              <Link to="/services">Contact Us</Link>
            </button>
            <h2>{home?.contactSection?.title}</h2>
            <p>{home?.contactSection?.description}</p>
            <div>
              <img src={telephonee} alt="Phone" />
              <a
                href={`tel:${home?.contactSection?.phone?.replace(
                  /[^0-9]/g,
                  ""
                )}`}
              >
                {home?.contactSection?.phone}
              </a>
            </div>
            <div>
              <img src={letter} alt="Email" />
              <a href={`mailto:${home?.contactSection?.email}`}>
                {home?.contactSection?.email}
              </a>
            </div>
          </div>
          <div className="form-home">
            <form className="row" onSubmit={handleSubmit}>
              <div className="form-group form-group-home">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full name"
                  onChange={handleChange}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="form-group form-group-home">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email address"
                  onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-group form-group-home ">
                <label>Phone number</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter phone number"
                  onChange={handleChange}
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>
              <div className="form-group form-group-home">
                <label>Service</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex.Dental implant"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group form-group-home col-12">
                <label>Message</label>
                <textarea
                  className="form-control"
                  rows={5}
                  placeholder="Enter your message"
                  onChange={handleChange}
                ></textarea>
                {errors.message && (
                  <span className="error">{errors.message}</span>
                )}
              </div>
              <button className="btn submit-btn">Submit</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
