import { useState } from "react";
import { getDatabase, ref, push, serverTimestamp } from "firebase/database";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { BiCheckCircle, BiLogoWhatsapp } from "react-icons/bi"; // Import WhatsApp icon
import firebaseApp from "../../../firebaseConfig/firebaseConfig";
import websiteData from "../../../assets/data"; // Import your centralized data object
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

  // Static fields for enquiry form (these remain hardcoded as websiteData doesn't have an enquiry form config)
  const formFields = [
    { name: "fullName", label: "Your Name", type: "text", required: true },
    { name: "companyName", label: "Company Name", type: "text" },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
  ];

  // Generate service options from websiteData's "Services" array (exclude the description object)
  const serviceOptions = websiteData["Services"]
    .filter((service) => service.Service_Type !== "Description")
    .map((service) => ({
      value: service.Service_Type,
      label: service.Service_Type,
    }));

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

  // Retrieve the label for the selected service to show in the modal
  const selectedServiceLabel =
    serviceOptions.find((option) => option.value === submittedData?.service)
      ?.label || submittedData?.service;


  // Find the WhatsApp group link based on the Enquiry Page
  const whatsappGroup = websiteData["Whatsapp Group"].find(
    (group) => group.Pages === "Enquiry Page"
  )?.WhatsApp_Link;

  return (
    <Container className="enquiry-container">
      <h2 className="form-title">Enquiry Form</h2>
      <Form className="enquiry-form" onSubmit={handleSubmit}>
        <Row>
          {formFields.map((field, index) => (
            <Col md={6} key={index}>
              <Form.Group controlId={field.name} className="mb-3">
                <Form.Label>
                  {field.label}{" "}
                  {field.required && <span className="text-danger">*</span>}
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
          <Form.Label>
            Service <span className="text-danger">*</span>
          </Form.Label>
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
        


        <Modal.Header closeButton className="d-flex align-items-center">
          <h3 className="text-success fw-bold me-2">Success</h3>
          <BiCheckCircle size={32} className="text-success" />
        </Modal.Header>



        <Modal.Body>
          <p>
            Thank you, <strong>{submittedData?.fullName}</strong>!
          </p>
          <p>
            Your enquiry for{" "}
            <strong>{selectedServiceLabel}</strong> has been submitted successfully.
          </p>
      

          {whatsappGroup && (
              <div className="whatsapp-container">
                <Button
                  href={whatsappGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-button"
                >
                  Join WhatsApp Group
                </Button>
              </div>
            )}


            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EnquiryFormComponent;
