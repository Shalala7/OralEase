import { Outlet, NavLink, Link } from "react-router-dom";
import { useState } from "react";
import teethLogo from "../../assets/images/teethLogo.png";
import telIcon from "../../assets/images/telIcon.png";
import "./style.css";

const Layout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="layout">
      <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top py-2">
        <div className="container-fluid px-3">
          {/* Logo */}
          <NavLink to="/" className="navbar-brand d-flex align-items-center">
            <img
              src={teethLogo}
              alt="logo"
              className="me-2"
              style={{ height: "60px" }}
            />
            <h2 className="m-0 fs-4">OralEase</h2>
          </NavLink>

          {/* Mobile menu toggle */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {/* Bootstrap ikonu yoxdursa, Font Awesome və ya Lucide React istifadə et */}
            <i className="fas fa-bars"></i>
          </button>

          {/* Navbar Links */}
          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav mx-auto text-center">
              {["Home", "About", "Services", "Contact"].map((item, index) => (
                <li className="nav-item px-2" key={index}>
                  <NavLink
                    className="nav-link fw-semibold"
                    to={item.toLowerCase()}
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Right Section: Phone + Book Now */}
            <div className="d-flex align-items-center">
              <button className="btn btn-light d-flex align-items-center me-2 rounded-pill telIcon">
                <a
                  href="tel:+994559430515"
                  className="d-flex align-items-center"
                >
                  <img
                    src={telIcon}
                    alt="phone"
                    className="me-2"
                    style={{ width: "18px" }}
                  />
                  +994 55 943 05 15
                </a>
              </button>

              <button className="btn nav-book-btn">
                <Link to="/contact" className="text-light">
                  Book Now
                </Link>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default Layout;
