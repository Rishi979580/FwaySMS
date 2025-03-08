import { useState } from "react";
import { Container } from "react-bootstrap";
import DatabaseActions from "../components/DatabaseActions";

const AdminPageSettings = () => {
  const [activeSection, setActiveSection] = useState("EnquiriesData");

  const databaseConfigs = [
    {
      node: "EnquiriesData",
      headers: [
        "fullName",
        "email",
        "phone",
        "companyName",
        "service",
        "timestamp",
      ],
    },
  ];

  const handleSetActiveSection = (node) => {
    setActiveSection(node);
  };

  return (
    <section
      id="settings"
      style={{ padding: "20px", backgroundColor: "#f8f9fa" }}
    >
      <Container>
        <div className="row mb-4">
          {databaseConfigs.map((config, index) => (
            <div className="col-md-6 mb-3 mb-md-0" key={index}>
              <button
                className={`btn btn-${
                  activeSection === config.node ? "primary" : "secondary"
                } btn-block p-3 mb-2`}
                onClick={() => handleSetActiveSection(config.node)}
                style={{ width: "100%" }}
              >
                Show {config.node}
              </button>
            </div>
          ))}
        </div>
        <div>
          <h4 className="text-left text-dark mb-4">{activeSection} Data</h4>
          <DatabaseActions
            databaseRef={activeSection}
            headers={
              databaseConfigs.find((config) => config.node === activeSection)
                ?.headers || []
            }
          />
        </div>
      </Container>
    </section>
  );
};

export default AdminPageSettings;
