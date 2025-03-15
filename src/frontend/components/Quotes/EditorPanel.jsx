import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

const EditorPanel = ({ selectedQuote, onChange, onSave }) => {
  if (!selectedQuote) return <p className="text-center">Select a quote to edit.</p>;

  return (
    <Form className="p-3 border rounded bg-light">
      <h5>Edit Quote</h5>
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          type="text"
          name="content"
          value={selectedQuote.content}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Font Size</Form.Label>
        <Form.Control
          type="number"
          name="fontSize"
          value={selectedQuote.fontSize}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Text Color</Form.Label>
        <Form.Control
          type="color"
          name="textColor"
          value={selectedQuote.textColor}
          onChange={onChange}
        />
      </Form.Group>

      <Button variant="success" className="mt-2" onClick={onSave}>
        Save Changes
      </Button>
    </Form>
  );
};

export default EditorPanel;

