import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../../firebaseConfig/firebaseConfig";
import { Table } from "react-bootstrap";
import CustomPagination from "../../../frontend/components/pagination/PaginationComponents";

// import CustomPagination from "../../../components/pagination/PaginationComponents";
// import formatDate from "../../components/DateFormat"; // Adjust the path based on your project structure

import formatDate from "../../admin/components/DateFormat"; // Adjust the path based on your project structure
import { useOutletContext } from "react-router-dom"; // Import useOutletContext

const AdminPageEnquiries = () => {
  const [originalEnquiries, setOriginalEnquiries] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  const { filterValue } = useOutletContext(); // Get filterValue from context

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const enquiriesRef = ref(db, "EnquiriesData");
        const snapshot = await get(enquiriesRef);
        if (snapshot.exists()) {
          const enquiriesData = [];
          snapshot.forEach((childSnapshot) => {
            const enquiry = childSnapshot.val();
            enquiriesData.push({ id: childSnapshot.key, ...enquiry });
          });
          enquiriesData.sort((a, b) => b.timestamp - a.timestamp);
          setOriginalEnquiries(enquiriesData);
          setEnquiries(enquiriesData);
          setTotalPages(Math.ceil(enquiriesData.length / itemsPerPage));
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching enquiries data: ", error);
      }
    };

    fetchEnquiries();
  }, []);

  useEffect(() => {
    const filteredEnquiries = originalEnquiries.filter((enquiry) =>
      enquiry.phone.includes(filterValue)
    );
    setEnquiries(filteredEnquiries);
    setTotalPages(Math.ceil(filteredEnquiries.length / itemsPerPage));
    setCurrentPage(1);
  }, [filterValue, originalEnquiries]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedEnquiries = enquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4 bg-dark p-3 text-center text-white">
        Enquiries Data:
      </h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Service</th>
            <th>Message</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEnquiries.map((enquiry) => (
            <tr key={enquiry.id}>
              <td>{enquiry.fullName}</td>
              <td>{enquiry.email}</td>
              <td>{enquiry.phone}</td>
              <td>{enquiry.service}</td>
              <td>{enquiry.message}</td>
              <td>{formatDate(enquiry.timestamp)}</td>
            </tr>
          ))}
          {paginatedEnquiries.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminPageEnquiries;
