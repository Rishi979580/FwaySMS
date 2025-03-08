import React from "react";
import { Container, Button } from "react-bootstrap";
import "./Banner2.css";

// Data Object
const bannerData = {
  title: "📢 Cheapest Bulk SMS Provider in India",
  highlight: "₹0.25/SMS",
  features: [
    "Providing quality service",
    "100% SMS delivery guarantee",
    "Affordable & reliable bulk messaging",
    "Without DLT Regitration bulk messaging",

  ],
  buttonText: "Get Started Now",
};

const Banner2 = () => {
  return (
    <section className="banner-section-2 my-5">
      <Container className="text-center">
        <h2 className="banner-title-2">
          {bannerData.title} <span className="text-highlight">{bannerData.highlight}</span>
        </h2>
        <div className="banner-features">
          {bannerData.features.map((feature, index) => (
            <p key={index} className="banner-subtitle-2">{feature}</p>
          ))}
        </div>
        <Button variant="primary" size="lg" className="banner-btn-2">
          {bannerData.buttonText}
        </Button>
      </Container>
    </section>
  );
};

export default Banner2;
