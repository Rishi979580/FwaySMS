import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa";
import websiteData from "../../../assets/data"; // Import dynamic data
import "./Footer.css";

const socialIcons = {
  Facebook: <FaFacebook className="social-icon text-primary" size={25} />, 
  Instagram: <FaInstagram className="social-icon text-danger" size={25} />, 
  LinkedIn: <FaLinkedin className="social-icon text-info"  size={25}/>, 
  Twitter: <FaTwitter className="social-icon text-primary"  size={25}/>, 
  YouTube: <FaYoutube className="social-icon text-danger" size={25} />, 
  Whatsapp: <FaWhatsapp className="social-icon text-success"  size={25}/>,
};

const Footer = () => {
  // Extract relevant footer data dynamically
  const companyName = websiteData.Footer.find((item) => item.Field === "Company Name")?.Details || "FutureWaySMS";
  const location = websiteData.Footer.find((item) => item.Field === "Location")?.Details || "Location not available";
  const phone = websiteData.Footer.find((item) => item.Field === "Phone")?.Details || "#";
  const email = websiteData.Footer.find((item) => item.Field === "Email")?.Details || "#";
  const privacyPolicy = websiteData.Footer.find((item) => item.Field === "Privacy Policy")?.Details || "#";
  const termsConditions = websiteData.Footer.find((item) => item.Field === "Terms & Conditions")?.Details || "#";

  // Extract and filter active social links
  const socialLinks = websiteData["Social Pages"].filter((item) => item.Status === "Active");

  return (
    <footer className="custom-footer mt-5">
      <Container>
        <Row className="align-items-center">
          {/* Left Section - Company Info */}
          <Col md={6}>
            <h5 className="footer-title">{companyName}</h5>
            <div className="footer-contact">
              <p><FaMapMarkerAlt className="footer-icon text-warning" /> {location}</p>
              <p><FaPhoneAlt className="footer-icon text-success" /> <a href={`tel:${phone}`} className="footer-link">{phone}</a></p>
              <p><FaEnvelope className="footer-icon text-danger" /> <a href={`mailto:${email}`} className="footer-link">{email}</a></p>
            </div>
          </Col>

          {/* Right Section - Links & Social Media */}
          <Col md={6} className="text-md-end mt-3 mt-md-0">
            <div className="footer-social-links mb-3">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.URL} target="_blank" rel="noopener noreferrer" className="social-link me-3">
                  {socialIcons[social.Platform] || social.Platform}
                </a>
              ))}
            </div>
            <a href={privacyPolicy} className="footer-link me-3">Privacy Policy</a>
            <a href={termsConditions} className="footer-link">Terms & Conditions</a>
          </Col>
        </Row>

        {/* Centered Copyright Text */}
        <Row className="mt-4">
          <hr />
          <Col className="text-center">
            <p className="footer-copyright">© {new Date().getFullYear()} {companyName}. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;