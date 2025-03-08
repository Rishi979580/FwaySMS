import FAQ from "./FaqsProbsAccept";

function FAQComponent() {
  const faqs = [
    {
      question: "What is the cost of Website Development?",
      answer: "The cost of website development is ₹4999 per year.",
    },
    {
      question: "What is Pathology CRM?",
      answer:
        "Pathology CRM is a customer relationship management system designed specifically for pathology labs to manage patient data and streamline operations.",
    },
    {
      question: "What is the cost of Pathology CRM?",
      answer: "The cost of Pathology CRM is ₹2000 per month.",
    },
    {
      question: "What is School CRM?",
      answer:
        "School CRM is a customer relationship management system designed for schools to manage student data, communication, and administrative tasks.",
    },
    {
      question: "What is the cost of School CRM?",
      answer: "The cost of School CRM is ₹2000 per month.",
    },
    {
      question: "What is WhatsApp/SMS/Email Marketing?",
      answer:
        "WhatsApp/SMS/Email Marketing involves using these channels to send promotional messages and engage with customers.",
    },
    {
      question: "What is the pricing for WhatsApp/SMS/Email Marketing?",
      answer:
        "Please contact us for pricing details for WhatsApp/SMS/Email Marketing.",
    },
    {
      question: "What is Business Listing Expert?",
      answer:
        "Business Listing Expert involves managing and optimizing your business listings on various online directories to improve visibility and attract more customers.",
    },
    {
      question: "What is the cost of Business Listing Expert?",
      answer:
        "The cost of Business Listing Expert services ranges from ₹1000 to ₹2000 per month.",
    },
    {
      question: "What is Social Media Page Manager?",
      answer:
        "Social Media Page Manager involves managing and optimizing your social media pages to increase engagement and grow your online presence.",
    },
    {
      question: "What is the cost of Social Media Page Manager?",
      answer:
        "The cost of Social Media Page Manager services ranges from ₹1000 to ₹2000 per month.",
    },
  ];

  return (
    <div>
      <FAQ faqs={faqs} />
    </div>
  );
}

export default FAQComponent;
