import PropTypes from "prop-types";

const WhatsAppIcon = ({ phoneNumber, message }) => {
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
    phoneNumber
  )}&text=${encodeURIComponent(message)}`;

  return (
    <div className="whatsapp-icon mb-4">
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <img src="img/wa.png" alt="WhatsApp Icon" />
      </a>
    </div>
  );
};

WhatsAppIcon.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default WhatsAppIcon;
