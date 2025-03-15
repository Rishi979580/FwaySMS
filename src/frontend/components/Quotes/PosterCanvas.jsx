import React, { useRef, useEffect } from "react";

const PosterCanvas = ({ selectedQuote }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedQuote.textColor || "#000";
    ctx.font = `${selectedQuote.fontSize || 40}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText(selectedQuote.content, canvas.width / 2, canvas.height / 2);
  }, [selectedQuote]);

  return <canvas ref={canvasRef} width="600" height="400" className="border" />;
};

export default PosterCanvas;
