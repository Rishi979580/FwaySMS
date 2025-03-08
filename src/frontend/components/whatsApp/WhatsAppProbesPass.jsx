import WhatsAppIcon from "./WhatsAppProbesAccept";
import "./WhatsAppCSS.css";
const WhatsAppComponent = () => {
  return (
    <div className="whatsapp-component">
      <WhatsAppIcon
        phoneNumber="+919795298080"
        message="Hi, I found your contact detail on your website. Can you help ?"
      />
      {/* Other components or content */}
    </div>
  );
};

export default WhatsAppComponent;
