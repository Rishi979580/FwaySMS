
import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import PosterCanvas from "./PosterCanvas";
import websiteData from "../../../assets/data"; // Example external data
import "./PosterGenerator.css";

const PosterGenerator = () => {
  // ======================
  // States
  // ======================
  const [platform, setPlatform] = useState("Facebook");
  const [backgroundType, setBackgroundType] = useState("solid");
  const [bgColor, setBgColor] = useState("#ff9900");
  const [gradientStart, setGradientStart] = useState("#ff9900");
  const [gradientEnd, setGradientEnd] = useState("#ffffff");


  const [textBlocks, setTextBlocks] = useState(
    websiteData?.Quotes?.filter(quote => quote.Status === "Active").map(quote => ({
      content: quote.Content,
      fontSize: 40,
      textColor: "#ffffff",
      fontWeight: "bold",
      author: quote.Author || "",
      category: quote.Category || ""
    })) || []
  );


  const [brandName, setBrandName] = useState("FutureWay");
  const [logo, setLogo] = useState(null);

  const [designStyle, setDesignStyle] = useState("classic");
  const [showFooter, setShowFooter] = useState(true);
  const [showLogo, setShowLogo] = useState(true);

  // For quote editing
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(null);

  // Canvas ref for download
  const posterCanvasRef = useRef(null);

  // ======================
  // Handlers
  // ======================
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Quote selection
  const handleQuoteSelect = (index) => {
    setSelectedQuoteIndex(index);
  };

  // Create new quote
  const handleCreateNewQuote = () => {
    const newBlock = {
      content: "",
      fontSize: 40,
      textColor: "#ffffff",
      fontWeight: "bold",
      author: "",
      category: ""
    };
    setTextBlocks(prev => [...prev, newBlock]);
    setSelectedQuoteIndex(textBlocks.length); // Ensure selection moves to new quote
  };


  // Update fields of the currently selected quote
  const handleQuoteFieldChange = (e) => {
    if (selectedQuoteIndex === null) return;
    const { name, value } = e.target;
    const updated = [...textBlocks];
    updated[selectedQuoteIndex][name] = value;
    setTextBlocks(updated);
  };

  // Download poster
  const handleDownload = () => {
    if (posterCanvasRef.current?.downloadPoster) {
      posterCanvasRef.current.downloadPoster();
    } else {
      console.warn("Download function is missing in PosterCanvas");
    }
  };




  // The selected quote block
  const selectedQuote =
    selectedQuoteIndex !== null ? textBlocks[selectedQuoteIndex] : null;

  // Group quotes by category
  const groupedQuotes = textBlocks.reduce((acc, block, idx) => {
    const cat = block.category || "Uncategorized";
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push({ ...block, index: idx });
    return acc;
  }, {});


  // Display Warning Messge For Long Quote

  const [quoteText, setQuoteText] = useState("");
  const [warning, setWarning] = useState("");

  const handleQuoteChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length > 100) {
      setWarning("⚠️ Maximum 100 characters allowed!");
    } else {
      setWarning("");
    }
    setQuoteText(inputText);
  };


  return (
    <div className="pro-poster-layout">
      {/* NAVBAR / TOP HEADER */}
      <header className="top-nav">
        <div className="brand-logo">

        </div>
        <div className="nav-actions">
          {/* Example "Buy SMS" button */}

          {/* Download Button */}
          <Button variant="success" onClick={handleDownload}>
            Download Quote
          </Button>
        </div>
      </header>

      {/* MAIN AREA: 3 columns (Left Editor, Center Canvas, Right Quotes) */}
      <div className="main-content">
        {/* LEFT EDITOR: Appearance + Editor for selected quote */}
        <aside className="left-editor">
          <h4>Appearance</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Platform</Form.Label>
              <Form.Select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option value="Facebook">Facebook (1200x630)</option>
                <option value="Instagram">Instagram (1080x1080)</option>
                <option value="WhatsApp">WhatsApp (800x800)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Background Type</Form.Label>
              <Form.Select
                value={backgroundType}
                onChange={(e) => setBackgroundType(e.target.value)}
              >
                <option value="solid">Solid Color</option>
                <option value="gradient">Gradient</option>
              </Form.Select>
            </Form.Group>
            {backgroundType === "solid" && (
              <Form.Group className="mb-3">
                <Form.Label>Background Color</Form.Label>
                <Form.Control
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
              </Form.Group>
            )}
            {backgroundType === "gradient" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Gradient Start</Form.Label>
                  <Form.Control
                    type="color"
                    value={gradientStart}
                    onChange={(e) => setGradientStart(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Gradient End</Form.Label>
                  <Form.Control
                    type="color"
                    value={gradientEnd}
                    onChange={(e) => setGradientEnd(e.target.value)}
                  />
                </Form.Group>
              </>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Design Style</Form.Label>
              <Form.Select
                value={designStyle}
                onChange={(e) => setDesignStyle(e.target.value)}
              >
                <option value="classic">Classic</option>
                <option value="modern">Modern</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Logo Upload</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Show Footer"
                checked={showFooter}
                onChange={(e) => setShowFooter(e.target.checked)}
              />
              <Form.Check
                type="checkbox"
                label="Show Logo"
                checked={showLogo}
                onChange={(e) => setShowLogo(e.target.checked)}
              />
            </Form.Group>
          </Form>

          {/* If a quote is selected, show editor fields */}
          {selectedQuote && (
            <div className="quote-editor">
              <h4>Selected Quote</h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={selectedQuote.category}
                    onChange={handleQuoteFieldChange}
                  />
                </Form.Group>


                <Form.Group className="mb-3">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    type="text"
                    name="content"
                    value={selectedQuote.content}
                    onChange={handleQuoteFieldChange}
                    maxLength={100} // Prevent input beyond 100 characters
                  />
                  {selectedQuote.content.length > 100 && (
                    <Form.Text className="text-danger">
                      Only 100 characters allowed.
                    </Form.Text>
                  )}
                </Form.Group>


                <Form.Group className="mb-3">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    type="text"
                    name="author"
                    value={selectedQuote.author}
                    onChange={handleQuoteFieldChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Font Size</Form.Label>
                  <Form.Control
                    type="number"
                    name="fontSize"
                    value={selectedQuote.fontSize}
                    onChange={handleQuoteFieldChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Text Color</Form.Label>
                  <Form.Control
                    type="color"
                    name="textColor"
                    value={selectedQuote.textColor}
                    onChange={handleQuoteFieldChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Font Weight</Form.Label>
                  <Form.Control
                    type="text"
                    name="fontWeight"
                    value={selectedQuote.fontWeight}
                    onChange={handleQuoteFieldChange}
                  />
                </Form.Group>
              </Form>
            </div>
          )}
        </aside>

        {/* CENTER: Canvas Preview */}
        <div className="center-panel">
          <PosterCanvas
            ref={posterCanvasRef}
            platform={platform}
            backgroundType={backgroundType}
            bgColor={bgColor}
            gradientStart={gradientStart}
            gradientEnd={gradientEnd}
            textBlocks={selectedQuote ? [selectedQuote] : []}
            brandName={brandName}
            logo={logo}
            designStyle={designStyle}
            showFooter={showFooter}
            showLogo={showLogo}
            watermark="Generated By Futureway.in"
          />
        </div>

        {/* RIGHT: Quotes List */}
        <aside className="right-quotes">
          <h4>All Quotes</h4>
          <div className="quotes-container">
            {Object.entries(groupedQuotes).map(([cat, blocks]) => (
              <div key={cat} className="quote-category">
                <h5>{cat}</h5>
                {blocks.map((item, idx) => (
                  <div
                    key={idx}
                    className={`quote-item ${item.index === selectedQuoteIndex ? "selected" : ""
                      }`}
                    onClick={() => handleQuoteSelect(item.index)}
                  >
                    <p className="quote-content">
                      {item.content || "Empty Quote"}
                    </p>
                    <p className="quote-author">
                      <em>{item.author || "Unknown"}</em>
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Button variant="primary" onClick={handleCreateNewQuote}>
            Create New Quote
          </Button>
        </aside>
      </div>
    </div>
  );
};

export default PosterGenerator;
