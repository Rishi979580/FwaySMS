import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="custom-footer mt-5">
      <Container>
        <Row className="align-items-center">
          {/* Left Section - Company Info */}
          <Col md={6}>
            <h5 className="footer-title">FutureWaySMS</h5>
            <div className="footer-contact">
              <p><FaMapMarkerAlt className="footer-icon text-warning" /> Kaptanganj, UP, India (274301)</p>
              <p><FaPhoneAlt className="footer-icon text-success" /> <a href="tel:+919795298080" className="footer-link">+91 97952 98080</a></p>
              <p><FaEnvelope className="footer-icon text-danger" /> <a href="mailto:futureway.in@gmail.com" className="footer-link">futureway.in@gmail.com</a></p>
            </div>
          </Col>

          {/* Right Section - Links */}
          <Col md={6} className="text-md-end mt-3 mt-md-0">
            <a href="#" className="footer-link me-3">Privacy Policy</a>
            <a href="#" className="footer-link">Terms & Conditions</a>
          </Col>
        </Row>

        {/* Centered Copyright Text */}
        <Row className="mt-4">
          <hr />
          <Col className="text-center">
            <p className="footer-copyright">© 2025 FutureWaySMS. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
