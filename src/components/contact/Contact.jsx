import { useEffect, useState } from "react";
import "./style.css";

// Şəkilləri import edirik
import telephoneIcon from "../../assets/images/telephonee.png";
import letterIcon from "../../assets/images/letterIcon.webp";
import locationIcon from "../../assets/images/location.webp";
import facebookIcon from "../../assets/images/facebook.jpg";
import twitterIcon from "../../assets/images/twitter.webp";
import instaIcon from "../../assets/images/instagram.png";

// İconları obyektə əlavə edirik
const icons = {
  address: locationIcon,
  email: letterIcon,
  phone: telephoneIcon,
  facebook: facebookIcon,
  twitter: twitterIcon,
  instagram: instaIcon
};

const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch("/contact.json")
      .then((response) => response.json())
      .then((data) => setContactData(data))
      .catch((error) => console.error("Error fetching contact data:", error));
  }, []);

  if (!contactData) {
    return <p>Loading...</p>;
  }

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
      <div className="contact">
        <div className="contact-container row">
          <div className="text-contact col-md-6 col-sm-12">
            <h1>{contactData.appointment.title}</h1>
            <p>{contactData.appointment.description}</p>
            <h4>{contactData.appointment.information}</h4>
            {Object.entries(contactData.moreInformation).map(([key, info]) => (
              <div className="d-flex p-0" key={key}>
                <div className="img">
                  <img src={icons[key]} alt={info.label} />
                </div>
                <div className="text-contact-container">
                  <h6>{info.label}</h6>
                  {info.label === "Address" ? (
                    <a
                      href={`https://www.google.com/maps/search/?q=${encodeURIComponent(
                        info.value
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p>{info.value}</p>
                    </a>
                  ) : info.label === "Email" ? (
                    <a href={`mailto:${info.value}`}>
                      <p>{info.value}</p>
                    </a>
                  ) : info.label === "Phone" ? (
                    <a href={`tel:${info.value}`}>
                      <p>{info.value}</p>
                    </a>
                  ) : (
                    <p>{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="form col-md-6 col-sm-12">
            <form className="row" onSubmit={handleSubmit}>
              <div className="form-group col-md-6 col-sm-12 col-12">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Full name"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="form-group col-md-6 col-sm-12 col-12">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-group col-md-6 col-sm-12 col-12">
                <label>Phone number</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>
              <div className="form-group col-md-6 col-sm-12 col-12">
                <label>Service</label>
                <input
                  type="text"
                  name="service"
                  className="form-control"
                  placeholder="Ex. Dental implant"
                  value={form.service}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-md-12">
                <label>Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows={5}
                  placeholder="Enter your message"
                  value={form.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && (
                  <span className="error">{errors.message}</span>
                )}
              </div>
              <button type="submit" className="btn submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="media">
        <div className="media-container">
          <h2>Contact us through our social media</h2>
          <div className="grid-container">
            {Object.entries(contactData.socialLinks).map(([key, item]) => (
              <div key={key} className="grid-item">
                
                <h5>{item.label}</h5>
                <p>{item.p}</p>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  Follow us
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
