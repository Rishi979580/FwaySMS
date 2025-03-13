import React from "react";
import websiteData from "../../assets/data";
import "./LegalPages.css";

const LegalSection = ({ title, data }) => {
  return (
    <div className="legal-page container">
      <h1 className="legal-title">{title}</h1>
      <div className="legal-content">
        {data.map((item, index) => (
          <div key={index} className="legal-item">
            <h3 className="legal-heading">{item.Field}</h3>
            <p className="legal-text">{item.Details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PrivacyPolicy = () => (
  <LegalSection title="Privacy Policy" data={websiteData["privacy policy"]} />
);

export const TermsConditions = () => (
  <LegalSection title="Terms & Conditions" data={websiteData["terms condtions"]} />
);