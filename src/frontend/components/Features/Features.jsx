import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import websiteData from "../../../assets/data"; // Import dynamic data
import "./Features.css";

const Features = () => {
  // Extract the description dynamically from the features array
  const descriptionFeature = websiteData.Features.find(
    (feature) => feature.Feature === "Description"
  );
  const featuresList = websiteData.Features.filter(
    (feature) => feature.Feature !== "Description"
  );
  const companyName = websiteData.Footer.find((item) => item.Field === "Company Name")?.Details || "FutureWaySMS";

  return (
    <Container className="py-5">
      <h2 className="text-center fw-bold mb-4">Why Choose {companyName}?</h2>
      {descriptionFeature && (
        <p className="text-center text-muted">{descriptionFeature.Details}</p>
      )}
      <Row className="g-3 mt-3">
        {featuresList.map((feature, index) => (
          <Col md={6} key={index}>
            <div className="d-flex align-items-center">
              <FaCheckCircle size={22} className="text-success me-2" />
              <span className="feature-text">
                <strong>{feature.Feature}:</strong> {feature.Details}
              </span>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Features;
