import React, {
    useRef,
    useEffect,
    forwardRef,
    useImperativeHandle
  } from "react";
  
  const PosterCanvas = forwardRef(({
    platform,
    backgroundType,
    bgColor,
    gradientStart,
    gradientEnd,
    textBlocks, // Array of text objects: { content, fontSize, textColor, fontWeight }
    brandName,
    logo,
    designStyle,  // "classic" or "modern"
    showFooter,
    showLogo,
    watermark,
    fontFamily = "Arial"
  }, ref) => {
    const canvasRef = useRef(null);
  
    // Standard dimensions per platform
    const dimensions = {
      Instagram: { width: 1080, height: 1080 },
      Facebook: { width: 1200, height: 630 },
      WhatsApp: { width: 800, height: 800 }
    };
  
    useEffect(() => {
      
      drawPoster();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      platform,
      backgroundType,
      bgColor,
      gradientStart,
      gradientEnd,
      textBlocks,
      brandName,
      logo,
      designStyle,
      showFooter,
      showLogo,
      watermark
    ]);
  
    const drawPoster = () => {
      const { width, height } = dimensions[platform] || dimensions.Instagram;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      // Set internal resolution
      canvas.width = width;
      canvas.height = height;
  
      // Set background based on backgroundType
      if (backgroundType === "solid") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
      } else {
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, gradientStart);
        grad.addColorStop(1, gradientEnd);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }
  
      // Draw design layout based on designStyle
      if (designStyle === "modern") {
        drawModern(ctx, width, height);
      } else {
        drawClassic(ctx, width, height);
      }
  
      // Draw watermark if provided
      if (watermark) {
        ctx.font = `italic 18px ${fontFamily}`;
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.textAlign = "right";
        ctx.fillText(watermark, width - 20, height - 60);
      }
    };
  
    // CLASSIC layout: text blocks in lower area above a footer bar.
    const drawClassic = (ctx, width, height) => {
      const footerHeight = showFooter ? 100 : 0;
      const textAreaHeight = height - footerHeight - 20;
      const textTop = 200;
      const maxTextHeight = textAreaHeight - textTop;
      const centerX = width / 2;
      const maxTextWidth = width - 100;
  
      drawMultipleTextBlocks(ctx, textBlocks, centerX, textTop, maxTextWidth, maxTextHeight);
  
      if (showFooter) {
        ctx.fillStyle = "rgba(0,0,0,0.65)";
        ctx.fillRect(0, height - footerHeight, width, footerHeight);
        const margin = 20;
        const logoSize = 50;
        if (showLogo && logo) {
          const logoX = margin;
          const logoY = height - footerHeight + (footerHeight - logoSize) / 2;
          const img = new Image();
          img.src = logo;
          img.onload = () => {
            ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
            const marginBetween = 10;
            ctx.fillStyle = "#ffffff";
            ctx.font = `bold 30px ${fontFamily}`;
            ctx.textAlign = "left";
            const brandX = logoX + logoSize + marginBetween;
            const brandY = height - footerHeight + (footerHeight) / 2;
            ctx.fillText(brandName, brandX, brandY);
          };
        } else {
          ctx.fillStyle = "#ffffff";
          ctx.font = `bold 30px ${fontFamily}`;
          ctx.textAlign = "left";
          ctx.fillText(brandName, margin, height - footerHeight + (footerHeight - 30) / 2);
        }
      }
    };
  
    // MODERN layout: text blocks near the top with a soft shadow and a stylish bottom bar.
    const drawModern = (ctx, width, height) => {
      const textTop = 80;
      const textAreaHeight = height / 2 - textTop;
      const centerX = width / 2;
      const maxTextWidth = width - 100;
      ctx.shadowColor = "rgba(0,0,0,0.3)";
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      drawMultipleTextBlocks(ctx, textBlocks, centerX, textTop, maxTextWidth, textAreaHeight);
      ctx.shadowColor = "transparent";
  
      if (showFooter) {
        const barHeight = 50;
        const grad = ctx.createLinearGradient(0, height - barHeight, width, height);
        grad.addColorStop(0, "rgba(0,0,0,0.6)");
        grad.addColorStop(1, "rgba(0,0,0,0.2)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, height - barHeight, width, barHeight);
        const margin = 20;
        const marginBetween = 10;
        const logoSize = 50;
        if (showLogo && logo) {
          const logoX = margin;
          const logoY = height - barHeight + (barHeight - logoSize) / 2;
          const img = new Image();
          img.src = logo;
          img.onload = () => {
            ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
            ctx.fillStyle = "#ffffff";
            ctx.font = `bold 28px ${fontFamily}`;
            ctx.textAlign = "left";
            const brandX = logoX + logoSize + marginBetween;
            const brandY = height - barHeight + (barHeight - 28) / 2;
            ctx.fillText(brandName, brandX, brandY);
          };
        } else {
          ctx.fillStyle = "#ffffff";
          ctx.font = `bold 28px ${fontFamily}`;
          ctx.textAlign = "left";
          ctx.fillText(brandName, margin, height - barHeight + (barHeight - 28) / 2);
        }
      }
    };
  
    // Helper: Render multiple text blocks in a given bounding box.
   

    function drawMultipleTextBlocks(ctx, blocks, centerX, startY, maxWidth, maxHeight) {
      if (!blocks || blocks.length === 0) return;
      const blockHeight = maxHeight / blocks.length;
      let currentY = startY;
    
      blocks.forEach(block => {
        const fs = block.fontSize || 40;
        const tc = block.textColor || "#ffffff";
        const bgc = block.bgColor || ""; // Background color for text
        const fw = block.fontWeight || "bold";
        const author = block.author || ""; // Optional author field
    
        // Wrap text into multiple lines
        const { lines } = wrapLines(ctx, block.content, maxWidth);
        const lineHeight = fs * 1.2;
        const totalHeight = lines.length * lineHeight;
        const textY = currentY + (blockHeight - totalHeight) / 2;
    
        // Draw background rectangle only for content text
        const bgPadding = 10;
        ctx.fillStyle = bgc;
        const textWidth = maxWidth - 20;
        const bgX = centerX - textWidth / 2 - bgPadding;
        const bgY = textY - bgPadding;
        ctx.fillRect(bgX, bgY, textWidth + 2 * bgPadding, totalHeight + 2 * bgPadding);
    
        // Draw content text
        ctx.fillStyle = tc;
        ctx.textAlign = "center";
        ctx.font = `${fw} ${fs}px ${fontFamily}`;
        let y = textY;
    
        lines.forEach(line => {
          ctx.fillText(line, centerX, y);
          y += lineHeight;
        });
    
        // Draw author (if available) BELOW content without background
        if (author) {
          ctx.font = `italic ${fs * 0.8}px ${fontFamily}`;
          ctx.fillText(`- ${author}`, centerX, y + 10); // 10px space after content
        }
    
        currentY += blockHeight;
      });
    }
    
    // Helper: Auto-fit multiline text within a bounding box.
    function autoFitMultilineText(ctx, text, centerX, startY, maxWidth, maxHeight, initialFontSize, lineHeightMult, fillColor, fontWeight = "bold") {
      if (!text) return;
      let fontSizeCandidate = initialFontSize;
      let linesInfo;
      while (fontSizeCandidate > 5) {
        ctx.font = `${fontWeight} ${fontSizeCandidate}px ${fontFamily}`;
        linesInfo = wrapLines(ctx, text, maxWidth);
        const lineHeight = fontSizeCandidate * lineHeightMult;
        const totalHeight = linesInfo.lines.length * lineHeight;
        if (totalHeight <= maxHeight) break;
        fontSizeCandidate--;
      }
      ctx.font = `${fontWeight} ${fontSizeCandidate}px ${fontFamily}`;
      ctx.fillStyle = fillColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      const lineHeight = fontSizeCandidate * lineHeightMult;
      const blockHeight = linesInfo.lines.length * lineHeight;
      const actualY = startY + (maxHeight - blockHeight) / 2;
      let y = actualY;
      linesInfo.lines.forEach(line => {
        ctx.fillText(line, centerX, y);
        y += lineHeight;
      });
    }
  
    // Helper: Split text into lines that fit within maxWidth.
    function wrapLines(ctx, text, maxWidth) {
      if (!text) return { lines: [] };
      const words = text.split(" ");
      const lines = [];
      let line = "";
      words.forEach(word => {
        const testLine = line + word + " ";
        if (ctx.measureText(testLine).width > maxWidth && line !== "") {
          lines.push(line.trim());
          line = word + " ";
        } else {
          line = testLine;
        }
      });
      if (line.trim().length > 0) lines.push(line.trim());
      return { lines };
    }
  
    const downloadPoster = () => {
      const canvas = canvasRef.current;
      const link = document.createElement("a");
      link.download = `poster-${platform}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  
    useImperativeHandle(ref, () => ({
      downloadPoster
    }));
  
    return (
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} className="canvas-preview" />
      </div>
    );
  });
  
  export default PosterCanvas;
  