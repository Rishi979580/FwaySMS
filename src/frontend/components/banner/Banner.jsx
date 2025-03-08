import React from "react";
import { Container, Button } from "react-bootstrap";
import  "./Banner.css";
const Banner = () => {
  return (
    <section className="banner-section">
      <Container className="text-center">
        <h2 className="banner-title">
          🚀 Test Bulk SMS Service <span className="text-highlight">For FREE!!</span>
        </h2>
        <p className="banner-subtitle">
          Get <strong>50 Free SMS</strong> instantly. No hidden charges, no setup fees!  
          Try it now and experience seamless messaging.
        </p>
        <Button variant="warning" size="lg" className="banner-btn">
          Claim Your Free SMS
        </Button>
      </Container>
    </section>
  );
};

export default Banner;
