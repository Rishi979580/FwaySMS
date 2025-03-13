import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import "./HeroSection.css";
const userCategories = [
  "Small and Medium Businesses (SMBs)",
  "E-commerce Platforms",
  "Coaching Centers & School ",
  "Hospitals & Clinics",
  "Political Campaigns",
  "Restaurants, PG , Real Estate",

];

const feeCharge={
highlight: "₹0.80/SMS",
}

const HeroSection = () => {
  return (
    <section className="hero-section text-center bg-primary text-white py-5">
      <Container>
        <h1 className="fw-bold">Cheapest Bulk SMS Provider in India {feeCharge.highlight}</h1>
        <p className="lead">We send SMS via the US route and multiple Indian operator routes.</p>
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
