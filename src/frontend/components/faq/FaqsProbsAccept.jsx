import PropTypes from "prop-types";
import "./Faq.css";

const FAQ = ({ faqs }) => {
  return (
    <section id="faqs" className="py-2">
      <div className="text-center">
        <h1 className="animated-section display-5 mb-0 text-center py-5">
          FAQ's
          <hr
            className="custom-hr mx-auto bg-primary"
            style={{ width: "12%" }}
          />
        </h1>
      </div>
      <br />
      <div className="container faqsContent">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <input
              type="checkbox"
              id={`question${index}`}
              name="q"
              className="questions"
            />
            <label
              htmlFor={`question${index}`}
              className="question border-bottom"
            >
              <i className="fas fa-plus mr-2"></i>
              <i className="fas fa-minus mr-2"></i>
              {faq.question}
            </label>
            <div
              className="answers"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
};

FAQ.propTypes = {
  faqs: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FAQ;
