import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import "./Features.css";
const features = [
  "No SMS Cutting",
  "100% SMS Delivery Report",
  "SMS Delivery within Seconds",
  "Affordable Pricing Plans",
  "We send SMS via the US route and multiple Indian operator routes.",
  "No DLT Registration Required",
  "Zero Extra Charges – No Hidden Fees",
  "Save ₹5999/year on DLT Registration",
  "Other Operators charge ₹5-7 per SMS without DLT",
  "With FutureWaySMS, send messages at a fraction of the cost!"
];

const Features = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center fw-bold mb-4">Why Choose FutureWaySMS?</h2>
      <p className="text-center text-muted">
        Other operators charge ₹5-7 per SMS with mandatory DLT registration, which costs ₹5999 per year.  
        With <strong>FutureWaySMS</strong>, you can send SMS instantly at a **much lower cost** without any hidden fees!
      </p>
      <Row className="g-3 mt-3">
        {features.map((feature, index) => (
          <Col md={6} key={index}>
            <div className="d-flex align-items-center">
              <FaCheckCircle size={22} className="text-success me-2" />
              <span className="feature-text">{feature}</span>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Features;
