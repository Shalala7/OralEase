import "./style.css";
import teethLogo from "../../assets/images/teethLogo.png";
import { NavLink } from "react-router-dom";
import letterIcon from "../../assets/images/letterIcon.webp";
import telIcon from "../../assets/images/telIcon.png";
import location from "../../assets/images/location.webp";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-container row">
          <div className="col-md-6 col-sm-12 d-flex">
            <div className="oral">
              <NavLink
                to="/"
                className="navbar-brand d-flex align-items-center"
              >
                <img
                  src={teethLogo}
                  alt="logo"
                  className="ms-2"
                  
                />
                <h2 className="m-0 fs-4">OralEase</h2>
              </NavLink>
              <h5>Subscribe to our Newsletter</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex
                quae asperiores cupiditate vel vero voluptatibus.
              </p>
              <div className="input-group mt-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  aria-label="Email"
                />
                <button className="btn subscribe">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 d-flex px-5">
            <div className="menu">
              <h5 className="fw-bold">Menu</h5>
              <ul className="list-unstyled">
                {[
                  "Home",
                  "About",
                  "Services",
                  "Contact"
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href={`${item.toLowerCase().replace(" ", "-")}`}
                      className="text-decoration-none text-dark"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="contact-footer">
              <h5 className="fw-bold">Contact</h5>
              <ul className="list-unstyled">
                <div>
                  {" "}
                  <li>
                    <img src={letterIcon} alt="letter" />
                    <a className="bi bi-envelope">contact@dentalic.com</a> 
                  </li>
                </div>
                <div>
                  <li>
                    <img src={telIcon} alt="tel" />
                    <a className="bi bi-telephone">+994 55 943 05 15</a> 
                  </li>
                </div>
                <div>
                  <li>
                    <img src={location} alt="location" />
                    <a className="bi bi-geo-alt">5678 Seltice Way Coeur D Alene, ID 12345, US.</a> 
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
