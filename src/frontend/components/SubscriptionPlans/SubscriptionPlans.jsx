import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import websiteData from "../../../assets/data"; // Import dynamic data
import SmsServiceModal from "../../pages/sms/SmsServicePage"; // Import the SMS Modal Component
import "./SubscriptionPlans.css"; // Import styles

const SubscriptionPlans = () => {
  const [showSMSModal, setShowSMSModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleShowSMSModal = (plan) => {
    setSelectedPlan(plan);
    setShowSMSModal(true);
  };

  const handleCloseSMSModal = () => {
    setShowSMSModal(false);
    setSelectedPlan(null);
  };

  return (
    <Container className="subscription-container">
      <h2 className="text-center fw-bold mb-4">Choose Your Plan</h2>
      <Row className="g-4">
        {websiteData.Pricing.map((plan, index) => (
          <Col md={6} lg={3} key={index}>
            <Card className="subscription-card">
              <Card.Body>
                <Card.Title className="plan-title">{plan.Plan}</Card.Title>
                <h4 className="plan-price">{plan.Price}</h4>
                <p className="plan-messages">{plan.Messages} • {plan.Validity}</p>
                <ul className="plan-features">
                  <li>✅ Bulk SMS</li>
                  <li>{plan.WhatsApp_Messaging} WhatsApp Messaging</li>
                  <li>{plan.Email_Campaigns} Email Campaigns</li>
                  <li>{plan.Priority_Support} Priority Support</li>
                  <li>{plan.Automation} Automation</li>
                </ul>
                <Button 
                  variant="primary" 
                  className="subscribe-btn btn-lg w-100"
                  onClick={() => handleShowSMSModal(plan)}
                >
                  Buy Plan Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal should be outside the loop and receive the selected plan */}
      {selectedPlan && (
        <SmsServiceModal 
          show={showSMSModal} 
          handleClose={handleCloseSMSModal} 
          plan={selectedPlan} 
        />
      )}
    </Container>
  );
};

export default SubscriptionPlans;
