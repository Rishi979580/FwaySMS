import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminPageFrontEnd = () => {
  return (
    <Container>
      <h2 className="text-black mt-4">Update Front-End Pages</h2>
      <Row className="mt-4">
        <Col md={4}>
          <div className="mb-4 border p-4 rounded">
            <h4 className="mb-3">Today Staff</h4>
            <Button
              as={Link}
              to="/admin/update/add-available-staff"
              variant="primary"
              className="w-100"
            >
              Add Today Avaiable Staff
            </Button>
          </div>
        </Col>
        <Col md={4}>
          <div className="mb-4 border p-4 rounded">
            <h4 className="mb-3">Latest Update</h4>
            <Button
              as={Link}
              to="/admin/update/latest-update"
              variant="primary"
              className="w-100"
            >
              Edit Latest Update
            </Button>
          </div>
        </Col>
        <Col md={4}>
          <div className="mb-4 border p-4 rounded">
            <h4 className="mb-3">AutoPopUp Page</h4>
            <Button
              as={Link}
              to="/admin/update/autopopup"
              variant="primary"
              className="w-100"
            >
              Edit AutoPopUp Page
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPageFrontEnd;
