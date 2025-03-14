import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form, Alert, Row, Col } from "react-bootstrap";
import { FaSearch, FaRedo, FaDownload } from "react-icons/fa";
import { getDatabase, ref, onValue } from "firebase/database";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";
import websiteData from "../../assets/data"; // Import dynamic text data

const CheckReport = () => {
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [filteredReports, setFilteredReports] = useState([]);
    const [reports, setReports] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const db = getDatabase();
        const reportsRef = ref(db, "sms_orders");

        onValue(reportsRef, async (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const reportsArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));

                // Fetch download URLs for files
                const storage = getStorage();
                const updatedReports = await Promise.all(
                    reportsArray.map(async (report) => {
                        if (report.filePath) {
                            try {
                                const fileRef = storageRef(storage, report.filePath);
                                const downloadURL = await getDownloadURL(fileRef);
                                return { ...report, fileUrl: downloadURL };
                            } catch (error) {
                                console.error("Error fetching file URL:", error);
                                return { ...report, fileUrl: null };
                            }
                        }
                        return { ...report, fileUrl: null };
                    })
                );

                setReports(updatedReports);
            }
        });
    }, []);

    const handleSearch = () => {
        if (!phone || !email) {
            setError(websiteData["Check Report"].find(item => item.Key === "ValidationMessage").Value);
            return;
        }
        setError("");

        const filtered = reports.filter(
            (report) => report.userDetails.phone === phone && report.userDetails.email === email
        );

        if (filtered.length === 0) {
            setError("Incorrect Phone Number or Email. Please try again.");
            setFilteredReports([]);
        } else {
            setFilteredReports(filtered);
            setError("");
        }
    };

    const handleReset = () => {
        setPhone("");
        setEmail("");
        setFilteredReports([]);
        setError("");
    };

    return (
        <Container className="py-4">
            <h2 className="text-center mb-4 fw-bold text-dark">
                {websiteData["Check Report"].find(item => item.Key === "Heading").Value}
            </h2>

            {error && (
                <Alert variant="danger" onClose={() => setError("")} dismissible>
                    {error}
                </Alert>
            )}

            {/* Search Form */}
            <Row className="mb-4 g-2">
                <Col xs={12} md={5}>
                    <Form.Control
                        type="text"
                        placeholder={websiteData["Check Report"].find(item => item.Key === "Phone").Value}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="shadow-sm"
                    />
                </Col>
                <Col xs={12} md={5}>
                    <Form.Control
                        type="text"
                        placeholder={websiteData["Check Report"].find(item => item.Key === "Email").Value}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow-sm"
                    />
                </Col>
                <Col xs={6} md={1} className="d-grid">
                    <Button variant="success" onClick={handleSearch}>
                        <FaSearch />
                    </Button>
                </Col>
                <Col xs={6} md={1} className="d-grid">
                    <Button variant="danger" onClick={handleReset}>
                        <FaRedo />
                    </Button>
                </Col>
            </Row>

            {/* Report Table */}
            {filteredReports.length > 0 ? (
                <div className="table-responsive">
                    <Table bordered hover className="shadow-sm text-center">
                        <thead className="table-dark">
                            <tr>
                                {websiteData["Check Report"].slice(4, 12).map((header, index) => (
                                    <th key={index}>{header.Value}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReports.map((report, index) => (
                                <tr key={report.id}>
                                    <td>{index + 1}</td>
                                    <td>{report.userDetails.companyName}</td>
                                    <td>{report.userDetails.phone}</td>
                                    <td>{report.userDetails.email}</td>
                                    <td>{report.messageType}</td>
                                    <td>{report.reportStatus}</td>
                                    <td>{report.timestamp || "N/A"}</td>
                                    
                                    <td>
                                        {report.reportStatus === "Completed" && report.fileUrl ? (
                                            <a href={report.fileUrl} target="_blank" rel="noopener noreferrer">
                                                <Button variant="primary" size="sm">
                                                    <FaDownload /> Download
                                                </Button>
                                            </a>
                                        ) : (
                                            <span className="text-danger">No File</span>
                                        )}
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-muted">
                        {websiteData["Check Report"].find(item => item.Key === "ValidationMessage").Value}
                    </p>
                    <p className="text-primary">
                        {websiteData["Check Report"].find(item => item.Key === "Prepaid").Value}
                    </p>
                    <p className="text-primary">
                        {websiteData["Check Report"].find(item => item.Key === "NonPrepaid").Value}
                    </p>
                </div>
            )}
        </Container>
    );
};

export default CheckReport;
