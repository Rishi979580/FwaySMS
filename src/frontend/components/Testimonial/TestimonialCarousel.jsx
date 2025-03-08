import { useEffect } from "react";
import PropTypes from "prop-types";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import $ from "jquery";
import "owl.carousel";

const TestimonialCarouselComponent = ({ testimonials }) => {
  useEffect(() => {
    const initializeCarousel = () => {
      if ($(".testimonial-carousel").length) {
        $(".testimonial-carousel").owlCarousel({
          loop: true,
          margin: 30,
          nav: true,
          dots: true,
          responsive: {
            0: {
              items: 1,
            },
            600: {
              items: 2,
            },
            1000: {
              items: 3,
            },
          },
        });
      }
    };

    $(document).ready(() => {
      initializeCarousel();
    });
  }, []);

  return (
    <div className="testimonial-carousel owl-carousel">
      {testimonials.map((testimonial, index) => (
        <div className="testimonial-item" key={index}>
          <img src={testimonial.imageSrc} alt={testimonial.clientName} />
          <p>{testimonial.text}</p>
          <h4>{testimonial.clientName}</h4>
          <h5>{testimonial.profession}</h5>
        </div>
      ))}
    </div>
  );
};

TestimonialCarouselComponent.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      imageSrc: PropTypes.string.isRequired,
      clientName: PropTypes.string.isRequired,
      profession: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TestimonialCarouselComponent;
