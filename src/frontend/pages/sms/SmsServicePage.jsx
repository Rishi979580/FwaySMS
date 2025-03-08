import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Row, Col, Image } from "react-bootstrap";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDatabase, ref as dbRef, push } from "firebase/database";
import smsData from "./messageData"; // Import the JSON data

const SmsServiceModal = ({ show, handleClose }) => {
  const [csvFile, setCsvFile] = useState(null);
  const [messageType, setMessageType] = useState(smsData.messageTypes[0].value);
  const [subscriptionPlan, setSubscriptionPlan] = useState(smsData.subscriptionPlans[0].value);
  const [dltRegistered, setDltRegistered] = useState(smsData.dltOptions[0].value);
  const [customMessage, setCustomMessage] = useState("");
  const [hasPaid, setHasPaid] = useState("No");
  const [totalAmount, setTotalAmount] = useState(0); // New state for total amount
  const [showConfirmation, setShowConfirmation] = useState(false); // State for showing confirmation
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString()); // New state for current time

  const [userDetails, setUserDetails] = useState({
    companyName: "",
    phone: "",
    email: "",
    address: "",
    paymentConfirmed: "No",
  });

  useEffect(() => {
    // Find the selected plan
    const selectedPlan = smsData.subscriptionPlans.find((plan) => plan.value === subscriptionPlan);

    // Extract the price from the plan's value string
    const amount = selectedPlan ? parseInt(selectedPlan.value.match(/₹(\d+)/)?.[1] || "0", 10) : 0;

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

  const handleInputChange = (e) =>
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!userDetails.email || !userDetails.phone) {
      alert("Please enter email and phone number!");
      return;
    }

    // Extract username from email
    const emailUsername = userDetails.email.split("@")[0];

    // Extract last 5 digits of the phone number
    const phoneLastFive = userDetails.phone.slice(-5);

    // Create a unique search key
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
      totalAmount, // Store total amount in database
      searchKey,  // Store the generated search key
      timestamp: currentTime, // Store the current time in database
    };

    if (csvFile) {
      const storage = getStorage();
      const timestamp = Date.now();
      const filePath = `uploads/${userDetails.phone}/${userDetails.email}/${timestamp}_${csvFile.name}`;

      const storageRef = ref(storage, filePath);
      uploadBytes(storageRef, csvFile).then(() => {
        // Store the file path in Firebase Database
        push(dbRef(db, "sms_orders"), {
          ...smsOrderData,
          filePath // Save filePath in the database 
        });

        setShowConfirmation(true); // Show confirmation
        resetForm();
        handleClose();
      });


    }


    else {
      push(dbRef(db, "sms_orders"), smsOrderData);
      setShowConfirmation(true); // Show confirmation
      resetForm();
      handleClose();
    }
  };

  const resetForm = () => {
    setCsvFile(null);
    setMessageType(smsData.messageTypes[0].value);
    setSubscriptionPlan(smsData.subscriptionPlans[0].value);
    setDltRegistered(smsData.dltOptions[0].value);
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

  const getQrCodeImage = () => {
    switch (subscriptionPlan) {
      case "1 Week - 300 Messages - ₹300":
        return "img/qr-code/1-week-subscription.png";
      case "2 Weeks - 600 Messages - ₹600":
        return "img/qr-code/2-week-subscription.png";
      case "1 Month - 1200 Messages - ₹1200":
        return "img/qr-code/1-month-subscription.png";
      default:
        return "img/qr-code/Free-subscription.png";
    }
  };

  const downloadSampleCSV = () => {
    const sampleData = "Name,Phone Number\nJohn Doe,9876543210\nJane Doe,9123456789";
    const blob = new Blob([sampleData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Sample_Contacts.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="shadow-sm border text-center">
          <Modal.Title >Buy Messaging Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border shadow-sm">
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Company/Business Name <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="companyName" placeholder="Company/Business Name" onChange={handleInputChange} />
              </Col>
              <Col md={6}>
                <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="phone" placeholder="Phone Number" onChange={handleInputChange} />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                <Form.Control type="email" name="email" placeholder="Email Address" onChange={handleInputChange} />
              </Col>
              <Col md={6}>
                <Form.Label>Full Address <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="address" placeholder="Full Address" onChange={handleInputChange} />
              </Col>
            </Row>

            <Form.Label>Subscription Plan <span className="text-danger">*</span></Form.Label>
            <Form.Select className="mb-3" value={subscriptionPlan} onChange={(e) => setSubscriptionPlan(e.target.value)}>
              {smsData.subscriptionPlans.map((plan, index) => (
                <option key={index} value={plan.value}>
                  {plan.label}
                </option>
              ))}
            </Form.Select>

            <Form.Label>Message Type <span className="text-danger">*</span></Form.Label>
            <Form.Select className="mb-3" value={messageType} onChange={(e) => setMessageType(e.target.value)}>
              {smsData.messageTypes.map((type, index) => (
                <option key={index} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Form.Select>

            <Form.Label>DLT Registration <span className="text-danger">*</span></Form.Label>
            <Form.Select className="mb-3" value={dltRegistered} onChange={(e) => setDltRegistered(e.target.value)}>
              {smsData.dltOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>

            <Form.Label> Message Details <span className="text-danger">*</span></Form.Label>
            <Form.Control as="textarea" rows={2} value={customMessage} onChange={(e) => setCustomMessage(e.target.value)} placeholder="Enter your custom message..." className="mb-3" />

            <Button variant="info" className="mb-2" onClick={downloadSampleCSV}>
              Download Sample CSV
            </Button>
            <Form.Control type="file" accept=".csv" onChange={handleFileUpload} className="mb-2" />
            {csvFile && <p className="text-success fw-bold">Uploaded: {csvFile.name}</p>}

            <p className="text-center text-primary">{smsData.paymentDetails.additionalNote}</p>

            <Image src={getQrCodeImage()} alt="QR Code" width={200} className="d-block mx-auto my-3 border p-2" />
            <h5 className="text-center text-success text-bold" >Total Amount: ₹{totalAmount}</h5> {/* Display Total Amount */}

            <p className="text-center">{smsData.paymentDetails.note}</p>

            <h5>Have you paid Subscription charge?</h5>
            <Form.Check type="radio" label="Yes" name="paymentConfirmed" value="Yes" checked={hasPaid === "Yes"} onChange={() => setHasPaid("Yes")} />
            <Form.Check type="radio" label="No" name="paymentConfirmed" value="No" checked={hasPaid === "No"} onChange={() => setHasPaid("No")} />

            <p className="text-danger fw-bold">{smsData.note}</p>
          </Form>
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
        <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Your request has been submitted successfully!</p>
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