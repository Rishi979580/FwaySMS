import WhatsAppIcon from "./WhatsAppProbesAccept";
import "./WhatsAppCSS.css";
import websiteData from "../../../assets/data"; // Import dynamic data

console.log("Website Data:", websiteData); // Debugging

const WhatsAppComponent = () => {
  if (!Array.isArray(websiteData)) {
    console.error("Expected websiteData to be an array but got:", typeof websiteData);
    return null;
  }

  const whatsappData = websiteData.find(
    (item) => item.Platform === "Whatsapp" && item.Status === "Active"
  );

  if (!whatsappData) {
    return null; // Don't render if no WhatsApp data is found
  }

  return (
    <div className="whatsapp-component">
      <WhatsAppIcon phoneNumber={whatsappData.URL} message="Hi, I found your contact detail on your website. Can you help?" />
    </div>
  );
};

export default WhatsAppComponent;
