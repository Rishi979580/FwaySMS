import React, { useState, useEffect } from "react";
import { Table, Button, Form, Card, Container, Alert, Row, Col } from "react-bootstrap";
import useSmsOrders from "../hooks/useSmsOrders";
import filterOrders from "../utils/filterOrders";
import "./SmsOrders.css";
import CustomPagination from "../../../frontend/components/pagination/PaginationComponents";
import { getDatabase, ref as dbRef, update, get } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const SmsOrdersAdmin = () => {
    const { orders, setOrders } = useSmsOrders();
    const [searchTerm, setSearchTerm] = useState("");
    const [editOrderId, setEditOrderId] = useState(null);
    const [editData, setEditData] = useState({});
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [filePaths, setFilePaths] = useState({});

    useEffect(() => {
        setCurrentPage(1); // Reset to first page when search changes
    }, [searchTerm]);

    // Filtered Orders
    const filteredOrders = filterOrders(orders, searchTerm);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    // Paginate Data
    const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleDownloadFile = async (orderId) => {
        if (!orderId) {
            setMessage("Invalid order details.");
            return;
        }

        try {
            const db = getDatabase();
            const orderRef = dbRef(db, `sms_orders/${orderId}`);

            // Fetch order details from Firebase Realtime Database
            const snapshot = await get(orderRef);
            if (!snapshot.exists()) {
                setMessage("Order not found.");
                return;
            }

            const orderData = snapshot.val();
            if (!orderData.filePath) {
                setMessage("File path not found in database.");
                return;
            }

            const storage = getStorage();
            const fileRef = storageRef(storage, orderData.filePath);

            // Get the actual file URL
            const url = await getDownloadURL(fileRef);
            setFilePaths((prev) => ({ ...prev, [orderId]: url }));

            // Open file in new tab
            window.open(url, "_blank");

        } catch (error) {
            console.error("Error fetching file:", error);
            if (error.code === "storage/unauthorized") {
                setMessage("Unauthorized access to the file.");
            } else if (error.code === "storage/object-not-found") {
                setMessage("File not found. Please check if it was uploaded.");
            } else {
                setMessage("An error occurred while fetching the file.");
            }
        }
    };

    const handleEdit = (order) => {
        setEditOrderId(order.id);
        setEditData({
            subscriptionPlan: order.subscriptionPlan || "",
            messageType: order.messageType || "",
            paymentStatus: order.paymentStatus || "",
            reportStatus: order.reportStatus || "Pending", // Add reportStatus
        });
    };

    const handleEditChange = (e, field) => {
        setEditData({ ...editData, [field]: e.target.value });
    };

    const handleSaveEdit = () => {
        const db = getDatabase();
        update(dbRef(db, `sms_orders/${editOrderId}`), editData)
            .then(() => {
                setEditOrderId(null);
                setMessage("Order updated successfully");
            })
            .catch((error) => console.error("Error updating order:", error));
    };

    const handleDelete = (orderId) => {
        const db = getDatabase();
        remove(dbRef(db, `sms_orders/${orderId}`))
            .then(() => {
                setMessage("Order deleted successfully");
            })
            .catch((error) => console.error("Error deleting order:", error));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUploadFile = async (orderId) => {
        if (!file) return;

        try {
            const db = getDatabase();
            const orderRef = dbRef(db, `sms_orders/${orderId}`);

            // Fetch order details from Firebase Realtime Database
            const snapshot = await get(orderRef);
            if (!snapshot.exists()) {
                setMessage("❌ Order not found.");
                return;
            }

            const orderData = snapshot.val();
            const storage = getStorage();

            // ✅ Step 1: Get existing file path
            const existingFilePath = orderData.filePath || "";
            if (!existingFilePath) {
                setMessage("❌ No existing file path found.");
                return;
            }

            // ✅ Step 2: Upload the new file to the same path (overwrite)
            const fileRef = storageRef(storage, existingFilePath);
            await uploadBytes(fileRef, file);
            console.log("✅ File overwritten successfully:", existingFilePath);

            setFile(null);
            setMessage("✅ File successfully replaced.");
        } catch (error) {
            console.error("❌ Error uploading file:", error);
            setMessage("❌ An error occurred while uploading the file.");
        }
    };

    const handleDismissMessage = () => {
        setMessage(null);
    };

    return (
        <Container className="sms-orders-container mt-4">
            <Card className="shadow-sm p-3">
                <Card.Body>
                    <h3 className="mb-3 text-center">📨 SMS Orders Management</h3>

                    {message && (
                        <Alert variant="success" onClose={handleDismissMessage} dismissible>
                            {message}
                        </Alert>
                    )}

                    <Row className="mb-3">
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                placeholder="🔍 Search by company, phone, or email..."
                                className="sms-orders-search"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Col>
                        <Col md={4} className="text-end">
                            <Button variant="primary">Add New Order</Button>
                        </Col>
                    </Row>

                    <Table responsive bordered hover className="sms-orders-table text-center">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Company</th>
                                <th>Date</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Message Type</th>
                                <th>Subscription</th>
                                <th>UserPayment</th>
                                <th>PaymentStatus</th>
                                <th>UploadedFile</th>
                                <th>ReportStatus</th> {/* New column header */}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedOrders.map((order, index) => (
                                <tr key={order.id}>
                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td>{order.userDetails?.companyName || "N/A"}</td>
                                    <td style={{ minWidth: "200px" }}>{order.timestamp || "N/A"}</td>
                                    <td>{order.userDetails?.phone || "N/A"}</td>
                                    <td>{order.userDetails?.email || "N/A"}</td>

                                    {/* Editable Message Type */}
                                    <td style={{ minWidth: "200px" }}>
                                        {editOrderId === order.id ? (
                                            <Form.Control
                                                as="textarea"
                                                value={editData.messageType || ""}
                                                onChange={(e) => handleEditChange(e, "messageType")}
                                            />
                                        ) : (
                                            order.messageType
                                        )}
                                    </td>

                                    <td style={{ minWidth: "300px" }}>{order.subscriptionPlan}</td>
                                    <td>{order.userDetails?.paymentConfirmed || "N/A"}</td> {/* Add null check */}

                                    {/* Editable Payment Status */}
                                    <td>
                                        {editOrderId === order.id ? (
                                            <Form.Select
                                                value={editData.paymentStatus || ""}
                                                onChange={(e) => handleEditChange(e, "paymentStatus")}
                                            >
                                                <option value="No">No</option>
                                                <option value="Yes">Yes</option>
                                            </Form.Select>
                                        ) : (
                                            order.paymentStatus
                                        )}
                                    </td>

                                    {/* File Download Column */}
                                    <td>
                                        {order.filePath ? (
                                            <>
                                                <Button
                                                    variant="info"
                                                    size="sm"
                                                    onClick={() => handleDownloadFile(order.id)}
                                                >
                                                    📂 Download
                                                </Button>
                                            </>
                                        ) : (
                                            "No File"
                                        )}
                                    </td>

                                    {/* Editable Report Status */}
                                    <td>
                                        {editOrderId === order.id ? (
                                            <Form.Select
                                                value={editData.reportStatus || ""}
                                                onChange={(e) => handleEditChange(e, "reportStatus")}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Completed">Completed</option>
                                            </Form.Select>
                                        ) : (
                                            order.reportStatus || "Pending" // Default to "Pending" if not set
                                        )}
                                    </td>

                                    {/* Action Buttons */}
                                    <td>
                                        <div className="d-flex align-items-center">
                                            {editOrderId === order.id ? (
                                                <>
                                                    <Button variant="success" size="sm" className="me-2" onClick={handleSaveEdit}>
                                                        ✅ Save
                                                    </Button>
                                                    <Button variant="secondary" size="sm" onClick={() => setEditOrderId(null)}>
                                                        ❌ Cancel
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(order)}>
                                                        ✏
                                                    </Button>
                                                    <Button variant="danger" size="sm" className="me-2" onClick={() => handleDelete(order.id)}>
                                                        🗑
                                                    </Button>
                                                    <Form.Control type="file" onChange={handleFileChange} style={{ minWidth: "100px" }} />
                                                    <Button variant="primary" size="sm" style={{minWidth:"200px"}} onClick={() => handleUploadFile(order.id)}>
                                                        Upload Report
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Pagination Component */}
                    <CustomPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SmsOrdersAdmin;