import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Row, Col, Image } from "react-bootstrap";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDatabase, ref as dbRef, push } from "firebase/database";
import { BiCheckCircle, BiLogoWhatsapp } from "react-icons/bi"; // Import WhatsApp icon

import websiteData from "../../../assets/data"; // Import centralized data from data.js

const SmsServiceModal = ({ show, handleClose }) => {
  // Prepare dynamic labels from "Buy SMS Form"
  const formFields = websiteData["Buy SMS Form"].reduce((acc, item) => {
    acc[item.Label] = item;
    return acc;
  }, {});

  // For "Message Type", we use the Services array – skipping the first item if it's only a description.
  const messageTypes = websiteData.Services.filter(
    (s) => s.Service_Type !== "Description"
  );

  // For "Subscription Plan", we use the Pricing array
  const [csvFile, setCsvFile] = useState(null);
  const [messageType, setMessageType] = useState(messageTypes[0].Service_Type);
  const [subscriptionPlan, setSubscriptionPlan] = useState(websiteData.Pricing[0].Plan);
  // Parse DLT options from the form field string "[Yes, No]"
  const dltOptions = formFields["DLT Registration"].Fields.replace(/[\[\]]/g, "")
    .split(",")
    .map((s) => s.trim());
  const [dltRegistered, setDltRegistered] = useState(dltOptions[0]);
  const [customMessage, setCustomMessage] = useState("");
  const [hasPaid, setHasPaid] = useState("No");
  const [totalAmount, setTotalAmount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  const [userDetails, setUserDetails] = useState({
    companyName: "",
    phone: "",
    email: "",
    address: "",
    paymentConfirmed: "No",
  });

  // Update the total amount when the subscription plan changes.
  useEffect(() => {
    const selectedPlan = websiteData.Pricing.find(
      (plan) => plan.Plan === subscriptionPlan
    );
    const amount = selectedPlan ? parseInt(selectedPlan.Price.replace("₹", ""), 10) : 0;
    setTotalAmount(amount);
  }, [subscriptionPlan]);

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
  }, [show]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".csv")) {
      setCsvFile(file);
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!userDetails.email || !userDetails.phone) {
      alert("Please enter email and phone number!");
      return;
    }
    // Create a unique search key from the email username and last 5 digits of phone
    const emailUsername = userDetails.email.split("@")[0];
    const phoneLastFive = userDetails.phone.slice(-5);
    const searchKey = `${emailUsername}${phoneLastFive}`;

    const db = getDatabase();
    const smsOrderData = {
      file: csvFile ? csvFile.name : "No file uploaded",
      messageType,
      customMessage,
      subscriptionPlan,
      dltRegistered,
      userDetails,
      paymentStatus: hasPaid,
      totalAmount,
      searchKey,
      timestamp: currentTime,
      reportStatus: "Pending",
    };

    if (csvFile) {
      const storage = getStorage();
      const timestamp = Date.now();
      const filePath = `uploads/${userDetails.phone}/${userDetails.email}/${timestamp}_${csvFile.name}`;
      const storageRef = ref(storage, filePath);
      uploadBytes(storageRef, csvFile).then(() => {
        push(dbRef(db, "sms_orders"), { ...smsOrderData, filePath });
        setShowConfirmation(true);
        resetForm();
        handleClose();
      });
    } else {
      push(dbRef(db, "sms_orders"), smsOrderData);
      setShowConfirmation(true);
      resetForm();
      handleClose();
    }
  };

  const resetForm = () => {
    setCsvFile(null);
    setMessageType(messageTypes[0].Service_Type);
    setSubscriptionPlan(websiteData.Pricing[0].Plan);
    setDltRegistered(dltOptions[0]);
    setCustomMessage("");
    setHasPaid("No");
    setTotalAmount(0);
    setUserDetails({
      companyName: "",
      phone: "",
      email: "",
      address: "",
      paymentConfirmed: "No",
    });
  };




  // Adjust the QR code image based on the selected subscription plan using data from data.js.
  const getQrCodeImage = () => {
    let planKey = "Free Plan"; // default to Free image
    if (subscriptionPlan.includes("Starter Pack")) {
      planKey = "Starter Pack";
    } else if (subscriptionPlan.includes("Growth Pack")) {
      planKey = "Growth Pack";
    } else if (subscriptionPlan.includes("Business Pack")) {
      planKey = "Business Pack";
    }
    const qrEntry = websiteData["Buy SMS Form"].find(
      (entry) => entry.Label === planKey
    );
    return qrEntry ? qrEntry.Fields : "";
  };

  const downloadSampleCSV = () => {
    const sampleData =
      "Name,Phone Number\nJohn Doe,9876543210\nJane Doe,9123456789";
    const blob = new Blob([sampleData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Sample_Contacts.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Find the WhatsApp group link based on the Enquiry Page
  const whatsappGroup = websiteData["Whatsapp Group"].find(
    (group) => group.Pages === "Enquiry Page"
  )?.WhatsApp_Link;

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="shadow-sm border text-center">
          <Modal.Title>Business Request Form — FutureWay</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border shadow-sm">
          <Form>
            {/* User Details Section */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>
                  {formFields["Business Name"].Label}{" "}
                  <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  placeholder={formFields["Business Name"].Label}
                  onChange={handleInputChange}
                />
              </Col>
              <Col md={6}>
                <Form.Label>
                  {formFields["Phone Number"].Label}{" "}
                  <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder={formFields["Phone Number"].Label}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>
                  {formFields["Email Address"].Label}{" "}
                  <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder={formFields["Email Address"].Label}
                  onChange={handleInputChange}
                />
              </Col>
              <Col md={6}>
                <Form.Label>
                  {formFields["Full Address"].Label}{" "}
                  <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder={formFields["Full Address"].Label}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>

            {/* Subscription and Message Options */}
            <Form.Label>
              {formFields["Subscription Plan"].Label}{" "}
              <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              className="mb-3"
              value={subscriptionPlan}
              onChange={(e) => setSubscriptionPlan(e.target.value)}
            >
              {websiteData.Pricing.map((plan, index) => (
                <option key={index} value={plan.Plan}>
                  {`${plan.Plan} - ${plan.Messages} -${plan.Social_Media_Mgmt}- ${plan.Post_Scheduling} - ${plan.Price}`}
                </option>
              ))}
            </Form.Select>

           
           

            <Form.Label>
              {formFields["DLT Registration"].Label}{" "}
              <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              className="mb-3"
              value={dltRegistered}
              onChange={(e) => setDltRegistered(e.target.value)}
            >
              {dltOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>

            <Form.Label>
              {formFields["Message Details"].Label}{" "}
              <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Enter your custom message..."
              className="mb-3"
            />

            {/* CSV File Upload */}
            <Button variant="info" className="mb-2" onClick={downloadSampleCSV}>
              Download Sample CSV
            </Button>
            <Form.Control
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="mb-2"
            />
            {csvFile && (
              <p className="text-success fw-bold">Uploaded: {csvFile.name}</p>
            )}

            {/* Payment Method and QR Code Section */}
            <p className="text-center text-primary">
              {formFields["Payment Method"].Fields}
            </p>

            <Image
              src={getQrCodeImage()}
              alt="QR Code"
              width={200}
              className="d-block mx-auto my-3 border p-2"
            />
            <h5 className="text-center text-success text-bold">
              Total Amount: ₹{totalAmount}
            </h5>


            {/* Payment Confirmation */}
            <h5>Have you paid Subscription charge?</h5>
            <Form.Check
              type="radio"
              label="Yes"
              name="paymentConfirmed"
              value="Yes"
              checked={hasPaid === "Yes"}
              onChange={() => setHasPaid("Yes")}
            />
            <Form.Check
              type="radio"
              label="No"
              name="paymentConfirmed"
              value="No"
              checked={hasPaid === "No"}
              onChange={() => setHasPaid("No")}
            />

          </Form>
          <span className="text-left text-danger text-bold">
            {formFields["Verification Note"].Fields}
          </span>
        </Modal.Body>
        <Modal.Footer className="border shadow-sm">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Submit Request
          </Button>
        </Modal.Footer>
      </Modal>

      {showConfirmation && (
        <Modal
          show={showConfirmation}
          onHide={() => setShowConfirmation(false)}
          centered
        >
         <Modal.Header closeButton className="d-flex align-items-center">
          <h3 className="text-success fw-bold me-2">Success</h3>
          <BiCheckCircle size={32} className="text-success" />
        </Modal.Header>


          <Modal.Body className="text-center">
            <p className="fs-5">
              Thank you, <strong>{userDetails.companyName}</strong>!
            </p>
            <p className="fs-6">
              Your Subscription for <strong>{subscriptionPlan}</strong> has been submitted successfully.
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
            <Button variant="primary" onClick={() => setShowConfirmation(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default SmsServiceModal;
