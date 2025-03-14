import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { BiMessageSquareDetail, BiLogoWhatsapp, BiMailSend, BiImage, BiVideo, BiTimeFive } from "react-icons/bi";
import websiteData from "../../../assets/data"; // Import dynamic data
import "./MessageTypes.css"; // Import custom styles

// Icon mapping based on service type
const iconMapping = {
  "Text SMS": <BiMessageSquareDetail size={50} className="text-primary" />,
  "WhatsApp Messaging": <BiLogoWhatsapp size={50} className="text-success" />,
  "Email Campaigns": <BiMailSend size={50} className="text-danger" />,
  "Brand Promotion – Social Media Posts": <BiImage size={50} className="text-primary" />,  
  "Brand Promotion – Short Videos": <BiVideo size={50} className="text-success" />,  
  "Automated – Social Media Posting": <BiTimeFive size={50} className="text-warning" />,  


};

const MessageTypes = () => {
  // Extract the general description dynamically
  const generalDescription = websiteData.Services.find(
    (service) => service.Service_Type === "Description"
  )?.Description || "Communicate effectively with your audience using multiple channels.";

  return (
    <Container className="py-5 message-types-container">
      <h2 className="text-center fw-bold mb-3 section-title">Our Services</h2>
      <p className="text-center text-muted section-description">
        {generalDescription}
      </p>
      <Row className="g-4 mt-4">
        {websiteData.Services.filter(service => service.Service_Type !== "Description").map((service, index) => (
          <Col md={4} key={index}>
            <Card className="text-center message-card">
              <Card.Body>
                <div className="icon-wrapper">
                  {iconMapping[service.Service_Type] || <BiMessageSquareDetail size={50} className="text-secondary" />}
                </div>
                <Card.Title className="mt-3 card-title">{service.Service_Type}</Card.Title>
                <Card.Text className="text-muted card-description">{service.Description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MessageTypes;
