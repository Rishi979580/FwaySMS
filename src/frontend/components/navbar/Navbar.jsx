import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidMessageDetail } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";
import SmsServiceModal from "../../pages/sms/SmsServicePage"; // Import SMS Modal
import websiteData from "../../../assets/data"; // Adjust path if needed
import PosterGenerator from "../posterGenertor/PosterGenertor"


const NavbarComponent = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [showSMSModal, setShowSMSModal] = useState(false);

  const handleShowSMSModal = () => setShowSMSModal(true);
  const handleCloseSMSModal = () => setShowSMSModal(false);

  
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const closeNavMenu = () => setIsNavCollapsed(true);

  // ✅ Extract brand name
  const brandName = websiteData.Menu.find(item => item.Key === "Title")?.Value || "FutureWay";
  const slogan = websiteData.Menu.find(item => item.Key === "Slogan")?.Value || "";
  const logo = websiteData.Menu.find(item => item.Key === "Image")?.Value || "/default-logo.svg";

  // ✅ Extract menu items (filter out non-menu sections)
  const navItems = websiteData.Menu.filter(item => item.Section === "Menu");


  return (
    <div className="nav-bar sticky-top bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light p-3">
        {/* Logo and Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center" onClick={closeNavMenu}>
          <div className="logo-container">
            <img src={logo} alt={brandName} className="logo" />
            <div className="brand-text">
              <h1 className="logo-text">
                <span className="futureway">{brandName.split(" ")[0]}</span>{" "}
                <span className="sms">{brandName.split(" ").slice(1).join(" ")}</span>
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
                <Link to={item.Value !== "\"\"" ? item.Value : "/"} className="nav-link" onClick={closeNavMenu}>
                  {item.Key.replace(/_/g, " ")} {/* Replaces underscores with spaces */}
                </Link>
              </li>
                
            ))}
          </ul>


          {/* Buy SMS Button */}
          <button className="btn btn-secondary sms-button" onClick={handleShowSMSModal}>
            Buy Plan Now
          </button>
        </div>
      </nav>

      {/* SMS Modal Component */}
      <SmsServiceModal show={showSMSModal} handleClose={handleCloseSMSModal} />
    </div>
  );
};

export default NavbarComponent;
