import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { BiMessageSquareDetail, BiLogoWhatsapp, BiMailSend } from "react-icons/bi";
import "./MessageTypes.css"; // Import custom styles

const messageTypes = [
  {
    label: "Text Message",
    icon: <BiMessageSquareDetail size={50} className="text-primary" />,
    description: "Reach your audience instantly with SMS. Perfect for promotions, alerts, and reminders."
  },
  {
    label: "WhatsApp Message",
    icon: <BiLogoWhatsapp size={50} className="text-success" />,
    description: "Engage users with interactive WhatsApp messages, including multimedia and chat automation."
  },
  {
    label: "Email",
    icon: <BiMailSend size={50} className="text-danger" />,
    description: "Send professional emails for marketing campaigns, newsletters, and customer engagement."
  }
];

const MessageTypes = () => {
  return (
    <Container className="py-5 message-types-container">
      <h2 className="text-center fw-bold mb-3 section-title">Message Types</h2>
      <p className="text-center text-muted section-description">
        Choose from multiple communication channels to effectively connect with your audience. 
        Whether it’s quick SMS alerts, engaging WhatsApp messages, or detailed email campaigns, we've got you covered!
      </p>
      <Row className="g-4 mt-4">
        {messageTypes.map((type, index) => (
          <Col md={4} key={index}>
            <Card className="text-center message-card">
              <Card.Body>
                <div className="icon-wrapper">{type.icon}</div>
                <Card.Title className="mt-3 card-title">{type.label}</Card.Title>
                <Card.Text className="text-muted card-description">{type.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MessageTypes;
