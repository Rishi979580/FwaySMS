import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form, InputGroup, Alert } from "react-bootstrap";
import { FaSearch, FaRedo, FaDownload } from "react-icons/fa";
import { getDatabase, ref, onValue } from "firebase/database";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";

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
                        if (report.file) {
                            try {
                                const fileRef = storageRef(storage, `uploads/${report.file}`);
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
            setError("Please enter both Phone Number and Email ID.");
            return;
        }
        setError("");

        const filtered = reports.filter(
            (report) => report.userDetails.phone === phone && report.userDetails.email === email
        );
        setFilteredReports(filtered);
    };

    const handleReset = () => {
        setPhone("");
        setEmail("");
        setFilteredReports([]);
        setError("");
    };

    return (
        <Container className="py-5" style={{ maxWidth: "800px" }}>
            <h2 className="text-center mb-4 fw-bold text-dark">🔍 Check Report</h2>

            {/* Error Message */}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Search Input */}
            <InputGroup className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Enter Phone Number..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="shadow-sm"
                />
                <Form.Control
                    type="text"
                    placeholder="Enter Email ID..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow-sm"
                />
                <Button variant="success" onClick={handleSearch}>
                    <FaSearch /> Search
                </Button>
                <Button variant="danger" onClick={handleReset}>
                    <FaRedo /> Reset
                </Button>
            </InputGroup>

            {/* Report Table */}
            {filteredReports.length > 0 ? (
                <Table responsive bordered hover className="shadow-sm">
                  
                <thead className="table-dark text-center">
                    <tr>
                        <th>#</th>
                        <th>Company</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Status</th> {/* New column for Status */}
                        <th>Download</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {filteredReports.map((report, index) => (
                        <tr key={report.id}>
                            <td>{index + 1}</td>
                            <td>{report.userDetails.companyName}</td>
                            <td>{report.userDetails.phone}</td>
                            <td>{report.userDetails.email}</td>
                            <td>{report.messageType}</td>
                            <td>{report.reportStatus}</td> {/* Display report status */}
                            <td>
                                {report.reportStatus !== "Pending" && report.fileUrl ? (
                                    <a href={report.fileUrl} target="_blank" rel="noopener noreferrer">
                                        <Button variant="primary">
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
            ) : (
               <>
                <p className="text-center text-muted">No reports found. Please enter a valid phone number and email ID.</p>
                <br></br>


                <p className="text-primary">📍 Bulk messages for prepaid customers are approved within 1-2 hours.</p>
                <p className="text-primary">📍 Bulk messages for non-prepaid customers may take up to 24 working hours.</p>
               </>
            )}
        </Container>
    );
};

export default CheckReport;

