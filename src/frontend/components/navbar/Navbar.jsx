
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidMessageDetail } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";
import SmsServiceModal from "../../pages/sms/SmsServicePage"; // Import the SMS Modal Component
import websiteData from "../../../../public/data"; // Adjust the import path according to your project structure

const NavbarComponent = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [showSMSModal, setShowSMSModal] = useState(false);

  const handleShowSMSModal = () => setShowSMSModal(true);
  const handleCloseSMSModal = () => setShowSMSModal(false);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const closeNavMenu = () => setIsNavCollapsed(true);

  // Assume the first Menu item is the logo and the rest are navigation links.
  // Inside your component function, before the return:

  const logo = websiteData.Menu[0];
  const titleParts = logo.Title.split(" ");
  const firstPart = titleParts[0];
  const secondPart = titleParts.slice(1).join(" ");
  const slogan = websiteData.Menu[1].Route;  // Correctly accessing the slogan



  const navItems = websiteData.Menu.slice(2);

  return (
    <div className="nav-bar sticky-top bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light p-3">
        {/* Logo and Brand */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center"
          onClick={closeNavMenu}
        >
          <div className="logo-container">
            <img src={logo.Route} alt={logo.Title} className="logo" />
            <div className="brand-text">
              <h1 className="logo-text">
              <span className="futureway">{firstPart}</span> <span className="sms">{secondPart}</span>
              </h1>
              <p className="slogan">{slogan}</p>
            </div>
          </div>
        </Link>

        {/* Navbar Toggler */}
        <button className="navbar-toggler" type="button" onClick={handleNavCollapse}>
          <span className="fa fa-bars"></span>
        </button>

        {/* Navigation Links */}
        <div className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`} id="navbarCollapse">
          <ul className="navbar-nav mx-auto">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <Link to={item.Route} className="nav-link" onClick={closeNavMenu}>
                  {item.Title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Buy SMS Button */}
          <button className="btn btn-primary sms-button" onClick={handleShowSMSModal}>
            <BiSolidMessageDetail size={30} className="text-white me-2" />
            Buy SMS Now
          </button>
        </div>
      </nav>

      {/* SMS Modal Component */}
      <SmsServiceModal show={showSMSModal} handleClose={handleCloseSMSModal} />
    </div>
  );
};

export default NavbarComponent;
