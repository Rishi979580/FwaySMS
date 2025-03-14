import React, { useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import "./HeroSection.css";
import websiteData from "../../../assets/data"; // Adjust the path as per your structure
import SmsServiceModal from "../../pages/sms/SmsServicePage"; // Import SMS Modal

// Extract Hero Section Data
const heroData = websiteData.Hero;

// Find values by keys
const heading = heroData.find(item => item.Key === "Heading")?.Value || "Default Heading";
const subheading = heroData.find(item => item.Key === "Subheading")?.Value || "Default Subheading";
const whoCanUseIt = heroData.find(item => item.Key === "Who_Can_Use_It")?.Value.split(";\n") || [];
const ctaText = heroData.find(item => item.Key === "CTA")?.Value.split(";\n")[0] || "Get Started";

const HeroSection = () => {
const [showSMSModal, setShowSMSModal] = useState(false);
const handleShowSMSModal = () => setShowSMSModal(true);
const handleCloseSMSModal = () => setShowSMSModal(false);

  return (
    <section className="hero-section text-center bg-primary text-white py-5">
      <Container>
        <h1 className="fw-bold">{heading}</h1>
        <p className="lead">{subheading}</p>
        <Button variant="light" size="lg" className="fw-bold mt-3"  onClick={handleShowSMSModal}>
          {ctaText.replace("🔥 ", "")} {/* Remove emoji if needed */}
         
        </Button>

        {/* Who Can Use It Section */}
        <div className="who-can-use mt-5">
          <h2 className="fw-bold text-warning">Who Can Use It?</h2>
          <Row className="justify-content-center">
            {whoCanUseIt.map((category, index) => (
              <Col md={4} sm={6} key={index} className="mt-3">
                <div className="category-box p-3 border rounded bg-white text-dark">
                  {category.replace("✅ ", "")} {/* Remove emoji if needed */}
                </div>
              </Col>
            ))}
          </Row>
           {/* SMS Modal Component */}
      <SmsServiceModal show={showSMSModal} handleClose={handleCloseSMSModal} />
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
