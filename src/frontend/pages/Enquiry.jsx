import EnquiryFormComponent from "../components/Enquiry/EnquiryForm"; // Adjust path as per your project structure

const EnquiryPage = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="container">
          <h3 className="display-3 text-white mb-3 animated slideInDown">
            Enquiry
          </h3>
        </div>
      </div>
      <div className="container">
        <EnquiryFormComponent />
      </div>
    </div>
  );
};

export default EnquiryPage;
