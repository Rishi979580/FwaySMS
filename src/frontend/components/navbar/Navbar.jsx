import { useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidMessageDetail } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";

import SmsServiceModal from "../../pages/sms/SmsServicePage"; // Import the SMS Modal Component

const NavbarComponent = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [showSMSModal, setShowSMSModal] = useState(false);

  const handleShowSMSModal = () => setShowSMSModal(true);
  const handleCloseSMSModal = () => setShowSMSModal(false);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const closeNavMenu = () => setIsNavCollapsed(true);

  return (
    <div className="nav-bar sticky-top bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light p-3">

        <Link to="/" className="navbar-brand d-flex align-items-center" onClick={closeNavMenu}>
          <div className="logo-container">
            <img src="/img/favicon.svg" alt="FutureWay InfoTech" className="logo" />
            <div className="brand-text">
              <h1 className="logo-text">
                <span className="futureway">FutureWay</span> <span className="sms">SMS</span>
              </h1>
              <p className="slogan">Text SMS | Whatsapp | Email</p>
            </div>
          </div>
        </Link>



        <button className="navbar-toggler" type="button" onClick={handleNavCollapse}>
          <span className="fa fa-bars"></span>
        </button>

        <div className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`} id="navbarCollapse">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={closeNavMenu}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/pricing" className="nav-link" onClick={closeNavMenu}>Pricing</Link>
            </li>
            <li className="nav-item">
              <Link to="/check-report" className="nav-link" onClick={closeNavMenu}>Check Report</Link>
            </li>

            


            <li className="nav-item">
              <Link to="/enquiry" className="nav-link" onClick={closeNavMenu}>Enquiry</Link>
            </li>
          </ul>

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
