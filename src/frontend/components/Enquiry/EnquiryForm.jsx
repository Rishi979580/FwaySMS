import { useState } from "react";
import { getDatabase, ref, push, serverTimestamp } from "firebase/database";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { BiCheckCircle } from "react-icons/bi";
import firebaseApp from "../../../firebaseConfig/firebaseConfig";
import "./EnquiryFormComponent.css"; // Custom CSS file

const EnquiryFormComponent = () => {
  const initialFormData = {
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const formFields = [
    { name: "fullName", label: "Your Name", type: "text", required: true },
    { name: "companyName", label: "Company Name", type: "text" },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
  ];

  const serviceOptions = [
    { value: "textSmsMarketing", label: "Text SMS Marketing" },
    { value: "whatsappSmsMarketing", label: "WhatsApp SMS Marketing" },
    { value: "emailMarketing", label: "Email Marketing" },
    { value: "digitalMarketingSocialMediaPost", label: "Digital Marketing - Social Media Post" },
    { value: "digitalMarketingSocialMediaShortVideo", label: "Digital Marketing - Social Media Short Video" },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const db = getDatabase(firebaseApp);
    const enquiriesRef = ref(db, "EnquiriesData");

    push(enquiriesRef, { ...formData, timestamp: serverTimestamp() })
      .then(() => {
        setShowModal(true);
        setSubmittedData({ ...formData });
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error("Error adding enquiry: ", error);
        alert("Failed to submit enquiry. Please try again.");
      });
  };

  return (
    <Container className="enquiry-container">
      <h2 className="form-title">Enquiry Form</h2>
      <Form className="enquiry-form" onSubmit={handleSubmit}>
        <Row>
          {formFields.map((field, index) => (
            <Col md={6} key={index}>
              <Form.Group controlId={field.name} className="mb-3">
                <Form.Label>
                  {field.label} {field.required && <span className="text-danger">*</span>}
                </Form.Label>
                <Form.Control
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  required={field.required}
                  className="rounded-input"
                />
              </Form.Group>
            </Col>
          ))}
        </Row>

 

<Form.Group controlId="service" className="mb-3">
  <Form.Label>Service <span className="text-danger">*</span></Form.Label>
  <Form.Select
    name="service"
    value={formData.service}
    onChange={handleInputChange}
    required
    className="rounded-input"
  >
    <option value="">Select a Service</option>
    {serviceOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </Form.Select>
</Form.Group>




        {/* Message Field */}
        <Form.Group controlId="message" className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="rounded-input"
          />
        </Form.Group>

        <Button type="submit" className="submit-btn">
          Submit Enquiry
        </Button>
      </Form>

      {/* Success Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Success <BiCheckCircle className="success-icon" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Thank you, <strong>{submittedData?.fullName}</strong>!</p>
          <p>Your enquiry for <strong>{submittedData?.service}</strong> has been submitted successfully.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EnquiryFormComponent;
