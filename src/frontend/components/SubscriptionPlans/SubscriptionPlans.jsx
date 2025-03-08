import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./SubscriptionPlans.css"; // Import styles
import SmsServiceModal from "../../pages/sms/SmsServicePage"; // Import the SMS Modal Component 

const plans = [

  {
    name: "Free Plan",
    price: "₹0",
    messages: "50 Messages",
    features: [
      "✅ Bulk SMS",
      "✅ WhatsApp Messaging",
      "❌ Email Campaigns",
      "❌ Priority Support",
      "❌ Automation"
    ],
    duration: "3 Days"
  },


  {
    name: "Starter Pack",
    price: "₹199",
    messages: "500 Messages",
    features: [
      "✅ Bulk SMS",
      "✅ WhatsApp Messaging",
      "✅ Email Campaigns",
      "❌ Priority Support",
      "❌ Automation"
    ],
    duration: "7 Days"
  },
  {
    name: "Growth Pack",
    price: "₹499",
    messages: "2,000 Messages",
    features: [
      "✅ Bulk SMS",
      "✅ WhatsApp Messaging",
      "✅ Email Campaigns",
      "Priority Support",
      "❌ Automation"
    ],
    duration: "1 Month"
  },
  {
    name: "Business Pack",
    price: "₹999",
    messages: "5,000 Messages",
    features: [
      "✅ Bulk SMS",
      "✅ WhatsApp Messaging",
      "✅ Email Campaigns",
      "✅ Priority Support",
      "✅ Automation"
    ],
    duration: "3 Months"
  },
];

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
        {plans.map((plan, index) => (
          <Col md={6} lg={3} key={index}>
            <Card className="subscription-card">
              <Card.Body>
                <Card.Title className="plan-title">{plan.name}</Card.Title>
                <h4 className="plan-price">{plan.price}</h4>
                <p className="plan-messages">{plan.messages} • {plan.duration}</p>
                <ul className="plan-features">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="feature-item">{feature}</li>
                  ))}
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
