import React from "react";
import { Container, Button } from "react-bootstrap";
import websiteData from "../../../assets/data"; // Adjust the import path according to your project structure
import "./Banner.css";

// Extract Banner Data
const trialData = websiteData.Banner || [];

const bannerHeading = trialData.find(item => item.Key === "Trial_Heading")?.Value || "🚀 Default Heading";
const bannerFree = trialData.find(item => item.Key === "Trial_Free")?.Value || "🚀 Default Free";

const bannerDescription = trialData.find(item => item.Key === "Trial_Description")?.Value || "Default description.";
const bannerCTA = trialData.find(item => item.Key === "Trial_Button_Text")?.Value || "Claim Now";

const SecondBanner = () => {
  return (
    <section className="banner-section">
      <Container className="text-center">
        <h2 className="banner-title text-primary">
          {bannerHeading} <span className="text-highlight">{bannerFree}</span>
        </h2>
        <p className="banner-subtitle">
          {bannerDescription}
        </p>
        <Button variant="warning" size="lg" className="banner-btn">
          {bannerCTA}
        </Button>
      </Container>
    </section>
  );
};



export default SecondBanner;
