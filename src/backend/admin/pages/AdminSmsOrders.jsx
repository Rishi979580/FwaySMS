import React, { useState, useEffect } from "react";
import { Table, Button, Form, Card, Container, Alert } from "react-bootstrap";
import { getDatabase, ref, update, remove } from "firebase/database";
import { getStorage, ref as storageRef, getDownloadURL, uploadBytes } from "firebase/storage";
import useSmsOrders from "../hooks/useSmsOrders";
import filterOrders from "../utils/filterOrders";
import "./SmsOrders.css";
import CustomPagination from "../../../frontend/components/pagination/PaginationComponents";

const SmsOrdersAdmin = () => {
    const { orders, setOrders } = useSmsOrders();
    const [searchTerm, setSearchTerm] = useState("");
    const [editOrderId, setEditOrderId] = useState(null);
    const [editData, setEditData] = useState({});
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        setCurrentPage(1); // Reset to first page when search changes
    }, [searchTerm]);

    // Filtered Orders
    const filteredOrders = filterOrders(orders, searchTerm);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    // Paginate Data
    const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleDownloadFile = (fileName) => {
        if (!fileName) return;
        const storage = getStorage();
        const fileRef = storageRef(storage, `uploads/${fileName}`);
        getDownloadURL(fileRef)
            .then((url) => window.open(url, "_blank"))
            .catch((error) => console.error("🚨 Error fetching file:", error));
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
        update(ref(db, `sms_orders/${editOrderId}`), editData)
            .then(() => {
                setEditOrderId(null);
                setMessage("Order updated successfully");
            })
            .catch((error) => console.error("Error updating order:", error));
    };

    const handleDelete = (orderId) => {
        const db = getDatabase();
        remove(ref(db, `sms_orders/${orderId}`))
            .then(() => {
                setMessage("Order deleted successfully");
            })
            .catch((error) => console.error("Error deleting order:", error));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUploadFile = (orderId) => {
        if (!file) return;
        const storage = getStorage();
        const fileRef = storageRef(storage, `uploads/${file.name}`);
        uploadBytes(fileRef, file)
            .then(() => {
                const db = getDatabase();
                update(ref(db, `sms_orders/${orderId}`), { file: file.name })
                    .then(() => {
                        setFile(null);
                        setMessage("File uploaded and order updated successfully");
                    })
                    .catch((error) => console.error("Error updating order with file:", error));
            })
            .catch((error) => console.error("Error uploading file:", error));
    };

    const handleDismissMessage = () => {
        setMessage(null);
    };

    
 // ...existing code...

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

                <Form.Control
                    type="text"
                    placeholder="🔍 Search by company, phone, or email..."
                    className="sms-orders-search mb-3"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <Table responsive bordered hover className="sms-orders-table text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Company</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Message Type</th>
                            <th>Subscription</th>
                            <th>UserPayment</th>
                            <th>PaymentStatus</th>
                            <th>UploadedFile</th>
                            <th>Report Status</th> {/* New column header */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedOrders.map((order, index) => (
                            <tr key={order.id}>
                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td>{order.userDetails?.companyName || "N/A"}</td>
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

                                {/* File Download */}
                                <td>
                                    {order.file ? (
                                        <Button variant="info" size="sm" onClick={() => handleDownloadFile(order.file)}>
                                            📂 Download
                                        </Button>
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
                                        order.reportStatus
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
                                                <Button variant="primary" size="sm" onClick={() => handleUploadFile(order.id)}>
                                                    Upload
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

// ...existing code...




};

export default SmsOrdersAdmin;