import React from "react";
import { Card, Button } from "react-bootstrap";

const QuoteGallery = ({ quotes, onSelectQuote }) => {
  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center">
      {quotes.map((quote, index) => (
        <Card key={index} className="shadow-sm" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Text className="fw-bold">{quote.content}</Card.Text>
            <Card.Subtitle className="text-muted">- {quote.author}</Card.Subtitle>
            <Button
              variant="primary"
              size="sm"
              className="mt-2"
              onClick={() => onSelectQuote(quote)}
            >
              Edit Quote
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default QuoteGallery;
