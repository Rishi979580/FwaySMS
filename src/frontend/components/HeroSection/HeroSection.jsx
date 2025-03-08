import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import "./HeroSection.css";
const userCategories = [
  "Small and Medium Businesses (SMBs)",
  "E-commerce Platforms",
  "Coaching Centers & Educational Institutions",
  "Hospitals & Clinics",
  "Political Campaigns",
  "Local Businesses (Restaurants, Real Estate)"
];

const HeroSection = () => {
  return (
    <section className="hero-section text-center bg-primary text-white py-5">
      <Container>
        <h1 className="fw-bold">Cheapest Bulk SMS Provider in India ₹0.25/SMS</h1>
        <p className="lead">Send messages directly from your personal SIM card with ease.</p>
        <Button variant="light" size="lg" className="fw-bold mt-3">
          Get Started
        </Button>

        {/* Who Can Use It Section */}
        <div className="who-can-use mt-5">
          <h2 className="fw-bold text-warning">Who Can Use It?</h2>
          <Row className="justify-content-center">
            {userCategories.map((category, index) => (
              <Col md={4} sm={6} key={index} className="mt-3">
                <div className="category-box p-3 border rounded bg-white text-dark">
                  {category}
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
