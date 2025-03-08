import { useState } from "react";
import {
  ref,
  query,
  orderByChild,
  startAt,
  endAt,
  get,
  remove,
} from "firebase/database";
import { db } from "../../../firebaseConfig/firebaseConfig";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";

const CleanDatabase = ({ databaseRef }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const cleanDatabase = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to clean the database?"
    );
    if (!confirmed) return;

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
        const updates = {};
        snapshot.forEach((childSnapshot) => {
          updates[childSnapshot.key] = null; // Mark each child for deletion
        });

        await remove(dataRef, updates);
        alert("Database cleaned successfully.");
      } else {
        alert("No records found in the specified time range.");
      }
    } catch (error) {
      console.error("Error cleaning database:", error);
      alert("An error occurred while cleaning the database.");
    }
  };

  return (
    <div className="card bg-white">
      <div className="card-header">
        <h5 className="mb-0">Clean Database</h5>
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
          <Button
            className="btn-block"
            variant="danger"
            onClick={cleanDatabase}
          >
            Clean Database
          </Button>
        </Form>
      </div>
    </div>
  );
};

CleanDatabase.propTypes = {
  databaseRef: PropTypes.string.isRequired,
};

export default CleanDatabase;
