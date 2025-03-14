import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import "./Banner.css";
import websiteData from "../../../assets/data"; // Adjust path if needed
import SmsServiceModal from "../../pages/sms/SmsServicePage"; // Import SMS Modal

// Extract Banner Data
const bannerData = websiteData.Banner;

// Find values by keys
const title = bannerData.find(item => item.Key === "Title")?.Value || "Default Title";
const highlight = bannerData.find(item => item.Key === "Highlight")?.Value || "Default Highlight";
const features = bannerData.find(item => item.Key === "Features")?.Value.split(";") || [];
const buttonText = bannerData.find(item => item.Key === "Buttontext")?.Value || "Get Started";

const firstBanner = () => {
  const [showSMSModal, setShowSMSModal] = useState(false);
  const handleShowSMSModal = () => setShowSMSModal(true);
  const handleCloseSMSModal = () => setShowSMSModal(false);
  return (
    <section className="banner-section my-5">
      <Container className="text-center">
        <h2 className="banner-title">
          {title} <span className="text-highlight">{highlight}</span>
        </h2>
        <div className="banner-features">
          {features.map((feature, index) => (
            <p key={index} className="banner-subtitle">{feature}</p>
          ))}
        </div>
        <Button variant="primary" size="lg" className="banner-btn" onClick={handleShowSMSModal}>
          {buttonText}
        </Button>
           {/* SMS Modal Component */}
      <SmsServiceModal show={showSMSModal} handleClose={handleCloseSMSModal} />
      </Container>
    </section>
  );
};

export default firstBanner;
