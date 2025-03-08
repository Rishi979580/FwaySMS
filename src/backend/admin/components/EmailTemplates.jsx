// src/admin/components/EmailTemplate.js
import { useEffect, useState } from "react";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { db } from "../../firebaseConfig/firebaseConfig";

// eslint-disable-next-line react/prop-types
const EmailTemplateComponent = ({ email }) => {
  const [enquiry, setEnquiry] = useState(null);

  useEffect(() => {
    const fetchEnquiryData = async () => {
      try {
        const enquiriesRef = ref(db, "EnquiriesData");
        const enquiryQuery = query(
          enquiriesRef,
          orderByChild("email"),
          equalTo(email)
        );
        const snapshot = await get(enquiryQuery);

        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            setEnquiry(childSnapshot.val());
          });
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching enquiry data:", error);
      }
    };

    fetchEnquiryData();
  }, [email]);

  if (!enquiry) {
    return <div>Loading...</div>;
  }

  return (
    <div id="email-template">
      <p>Hello {enquiry.fullName},</p>
      <p>
        Thank you for your enquiry regarding {enquiry.service}. We will get back
        to you soon.
      </p>
      <p>Details:</p>
      <ul>
        <li>
          Email: <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
        </li>
        <li>Phone: {enquiry.phone}</li>
        <li>Service: {enquiry.service}</li>
        <li>Company Name: {enquiry.companyName}</li>
        <li>Message: {enquiry.message}</li>
        {/* Add other fields as needed */}
      </ul>
      <p>We look forward to assisting you!</p>
    </div>
  );
};

export default EmailTemplateComponent;
