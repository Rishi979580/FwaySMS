const smsData = {

  subscriptionPlans: [
    { label: "Free Plan - 20 Messages - ₹0", value: "Free Plan - 20 Messages - ₹0", qrCode: "img/qr-code/Free-subscription.png" },
    { label: "7 days - 250 Messages - ₹199", value: "7 days - 250 Messages - ₹199", qrCode: "img/qr-code/1-week-subscription.png" },
    { label: "1 Month - 650 Messages - ₹499", value: "1 Month - 650 Messages - ₹499", qrCode: "img/qr-code/2-week-subscription.png" },
    { label: "3 Month - 1500 Messages - ₹999", value: "3 Month - 1500 Messages - ₹999", qrCode: "img/qr-code/1-month-subscription.png" }
  ],
  messageTypes: [
    { label: "Text Message", value: "Text Message" },
    { label: "WhatsApp Message", value: "WhatsApp Message" },
    { label: "Email", value: "Email" }
  ],
  dltOptions: [
    { label: "No", value: "No" },
    { label: "Yes", value: "Yes" }
  ],
  paymentDetails: {
    note: "Scan & Pay or UPI ID: futurway.in@okhdfcbank",
    additionalNote: "Bulk Messages are instantly approved within 1-2 hours for prepaid customers, while for non-prepaid customers, it takes up to 24 working hours."
  },
  note: "Note: We will verify the message manually to check for spam/fraud, then it will be sent automatically. We will send a report on the same Email ID/Whatsapp Number."
};

export default smsData;
