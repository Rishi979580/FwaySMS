import TestimonialCarouselComponent from "./TestimonialCarousel"; // Adjust the import path as per your project structure
import "./TestimonialCSS.css";

const testimonialsData = [
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageSrc: "img/clients/landt.png",
    clientName: "John Doe",
    profession: "Web Developer",
  },
  {
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageSrc: "img/clients/knrc.jpg",
    clientName: "Jane Smith",
    profession: "Graphic Designer",
  },
  // Add more testimonials as needed
];

const TestimonialCarouselContent = () => {
  return (
    <div>
      <TestimonialCarouselComponent testimonials={testimonialsData} />
    </div>
  );
};

export default TestimonialCarouselContent;
