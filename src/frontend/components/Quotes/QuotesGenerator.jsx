import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import QuoteGallery from "./QuoteGallery";
import EditorPanel from "./EditorPanel";
import PosterCanvas from "./PosterCanvas";

const sampleQuotes = [
  { content: "Believe in yourself!", author: "John Doe", fontSize: 40, textColor: "#000000" },
  { content: "Stay positive, work hard.", author: "Jane Doe", fontSize: 35, textColor: "#FF5733" },
];

const QuotesGenerator = () => {
  const [selectedQuote, setSelectedQuote] = useState(null);

  const handleSelectQuote = (quote) => {
    setSelectedQuote(quote);
  };

  const handleQuoteChange = (e) => {
    setSelectedQuote({ ...selectedQuote, [e.target.name]: e.target.value });
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Quote Generator</h2>
      <Row>
        <Col md={4}>
          <QuoteGallery quotes={sampleQuotes} onSelectQuote={handleSelectQuote} />
        </Col>
        <Col md={4}>
          <EditorPanel selectedQuote={selectedQuote} onChange={handleQuoteChange} />
        </Col>
        <Col md={4}>
          <PosterCanvas selectedQuote={selectedQuote} />
        </Col>
      </Row>
    </Container>
  );
};

export default QuotesGenerator;


