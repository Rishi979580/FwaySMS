import { useState } from "react";
import {
  ref,
  query,
  orderByChild,
  startAt,
  endAt,
  get,
} from "firebase/database";
import { db } from "../../../firebaseConfig/firebaseConfig";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";

const ExportData = ({ databaseRef, filename, headers }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const exportToCsv = async (filename, headers, rows) => {
    try {
      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
      ].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert("Data exported successfully.");
    } catch (err) {
      console.error("Error exporting data:", err);
      alert("An error occurred while exporting data.");
    }
  };

  const handleExport = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const startTimestamp = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate).getTime();

    try {
      const dataRef = ref(db, databaseRef);
      const q = query(
        dataRef,
        orderByChild("timestamp"),
        startAt(startTimestamp),
        endAt(endTimestamp)
      );
      const snapshot = await get(q);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const rows = Object.keys(data).map((key) => {
          const item = data[key];
          return headers.map((header) => `"${item[header] || ""}"`);
        });
        exportToCsv(filename, headers, rows);
      } else {
        alert("No data found for the specified date range.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while fetching data.");
    }
  };

  return (
    <div className="card bg-white">
      <div className="card-header">
        <h5 className="mb-0">Export Data to CSV</h5>
      </div>
      <div className="card-body">
        <Form>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
          <Button className="btn-block" onClick={handleExport}>
            Export Data
          </Button>
        </Form>
      </div>
    </div>
  );
};

ExportData.propTypes = {
  databaseRef: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ExportData;
