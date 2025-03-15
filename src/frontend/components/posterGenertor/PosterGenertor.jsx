import React, { useState, useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import PosterCanvas from "./PosterCanvas";
import "./PosterGenerator.css";
import { BiDownload } from "react-icons/bi";

const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbwTeEaL8X99fi8_4VxG90tMJeo4z7tOf1vaJ_DNp8t6QrYEU0fntq_8Jxcvk3MyTvfG4A/exec";

const fetchQuotesFromSheet = async () => {
  try {
    const response = await fetch(SHEET_API_URL);
    const data = await response.json();

    if (Array.isArray(data)) {
      return data.filter((quote) => quote.Status === "Active").map((quote) => ({
        content: quote.Content || "No Content",
        fontSize: 40,
        textColor: "#ffffff",
        fontWeight: "bold",
        author: quote.Author || "Unknown",
        category: quote.Category || "Uncategorized",
      }));
    } else {
      console.error("Invalid Data Format", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return [];
  }
};

const PosterGenerator = () => {
  const [platform, setPlatform] = useState("Facebook");
  const [backgroundType, setBackgroundType] = useState("solid");
  const [bgColor, setBgColor] = useState("#ff9900");
  const [gradientStart, setGradientStart] = useState("#ff9900");
  const [gradientEnd, setGradientEnd] = useState("#ffffff");
  const [textBlocks, setTextBlocks] = useState([]);
  const [brandName, setBrandName] = useState("FutureWay");
  const [logo, setLogo] = useState(null);
  const [designStyle, setDesignStyle] = useState("classic");
  const [showFooter, setShowFooter] = useState(true);
  const [showLogo, setShowLogo] = useState(true);
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(null);


  const posterCanvasRef = useRef(null);

  useEffect(() => {
    const loadQuotes = async () => {
      const fetchedQuotes = await fetchQuotesFromSheet();
      setTextBlocks(fetchedQuotes);
    };
    loadQuotes();
  }, []);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleQuoteSelect = (index) => {
    setSelectedQuoteIndex(index);
  };

  const handleCreateNewQuote = () => {
    const newBlock = {
      content: "",
      fontSize: 40,
      textColor: "#ffffff",
      fontWeight: "bold",
      author: "",
      category: "Uncategorized",
    };
    setTextBlocks((prev) => [...prev, newBlock]);
    setSelectedQuoteIndex(textBlocks.length);
  };

  const handleQuoteFieldChange = (e) => {
    if (selectedQuoteIndex === null) return;
    const { name, value } = e.target;
    setTextBlocks((prev) => {
      const updated = [...prev];
      updated[selectedQuoteIndex] = { ...updated[selectedQuoteIndex], [name]: value };
      return updated;
    });
  };

  const handleDownload = () => {
    posterCanvasRef.current?.downloadPoster();
  };

  
  const [selectedQuote, setSelectedQuote] = useState({ content: "" });

  useEffect(() => {
    if (selectedQuoteIndex !== null) {
      setSelectedQuote(textBlocks[selectedQuoteIndex]);
    } else {
      setSelectedQuote({ content: "" }); // Set a default empty object instead of null
    }
  }, [selectedQuoteIndex, textBlocks]);
  
  return (
    <div className="pro-poster-layout ">


<header className="top-nav no-hover d-flex align-items-center justify-content-between px-4 py-2 shadow-sm bg-white border-bottom">
  {/* Left Side: Text Styling Controls */}
  <div className="d-flex align-items-center gap-3">
    {/* Font Size Control */}
    <div className="d-flex align-items-center gap-2">
      <i className="bi bi-text-paragraph text-muted"></i>
      <Form.Control
        type="number"
        name="fontSize"
        value={selectedQuote?.fontSize || 16}
        onChange={handleQuoteFieldChange}
        className="form-control-sm text-center"
        min="10"
        max="100"
        style={{ width: "60px" }}
      />
    </div>

    {/* Bold & Italic Toggles */}
    <div className="btn-group">
      <Button
        variant={selectedQuote?.fontWeight === "bold" ? "dark" : "light"}
        className="px-3 no-hover"
        onClick={() => handleQuoteFieldChange({ target: { name: "fontWeight", value: selectedQuote?.fontWeight === "bold" ? "normal" : "bold" } })}
      >
        <i className="bi bi-type-bold"></i>
      </Button>

      <Button
        variant={selectedQuote?.fontStyle === "italic" ? "dark" : "light"}
        className="px-3 no-hover"
        onClick={() => handleQuoteFieldChange({ target: { name: "fontStyle", value: selectedQuote?.fontStyle === "italic" ? "normal" : "italic" } })}
      >
        <i className="bi bi-type-italic"></i>
      </Button>
    </div>

    {/* Font Color Picker */}
    <div className="d-flex align-items-center gap-2">
      <i className="bi bi-palette text-muted"></i>
      <Form.Control
        type="color"
        name="textColor"
        value={selectedQuote?.textColor || "#000000"}
        onChange={handleQuoteFieldChange}
        className="form-control-color border-0"
        style={{ width: "40px", height: "30px" }}
      />
    </div>

     {/* Right Side: Download Button */}
  <div>
    <Button variant="success" className="px-4 fw-bold d-flex align-items-center no-hover border-1" onClick={handleDownload}>
      <BiDownload className="me-2 text-dark  " />
    </Button>
  </div>
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
  <Form.Label>Content</Form.Label>
  <Form.Control
    as="textarea"
    name="content"
    value={selectedQuote?.content || ""} // Use optional chaining and default empty string
    onChange={handleQuoteFieldChange}
    maxLength={100}
    rows={3}
  />
  {(selectedQuote?.content?.length || 0) > 100 && (
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

         
        </aside>


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

        <aside className="right-quotes">
          <h4>All Quotes</h4>
          <div className="quotes-container">
            {textBlocks.map((item, idx) => (
              <div key={idx} className={`quote-item ${idx === selectedQuoteIndex ? "selected" : ""}`} onClick={() => handleQuoteSelect(idx)}>
                <p className="quote-content">{item.content || "Empty Quote"}</p>
                <p className="quote-author">
                  <em>{item.author || "Unknown"}</em>
                </p>
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
