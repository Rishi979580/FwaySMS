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

    canvas.width = width;
    canvas.height = height;

    // Set background
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

    // Apply layout based on design style
    if (designStyle === "modern") {
      drawModern(ctx, width, height);
    } else {
      drawClassic(ctx, width, height);
    }

    // Watermark
    if (watermark) {
      ctx.font = `italic 18px ${fontFamily}`;
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.textAlign = "right";
      ctx.fillText(watermark, width - 20, height - 60);
    }
  };

  const drawClassic = (ctx, width, height) => {
    const footerHeight = showFooter ? 100 : 0;
    const textAreaHeight = height - footerHeight - 20;
    const textTop = 200;
    const maxTextHeight = textAreaHeight - textTop;
    const centerX = width / 2;
    const maxTextWidth = width - 100;

    drawMultipleTextBlocks(ctx, textBlocks, centerX, textTop, maxTextWidth, maxTextHeight);

    if (showFooter) {
      drawFooter(ctx, width, height, footerHeight);
    }
  };

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
      drawFooter(ctx, width, height, 50);
    }
  };

  function drawFooter(ctx, width, height, footerHeight) {
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
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold 30px ${fontFamily}`;
        ctx.textAlign = "left";
        ctx.fillText(brandName, logoX + logoSize + 10, height - footerHeight + footerHeight / 2);
      };
    } else {
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold 30px ${fontFamily}`;
      ctx.textAlign = "left";
      ctx.fillText(brandName, margin, height - footerHeight + (footerHeight - 30) / 2);
    }
  }

  function drawMultipleTextBlocks(ctx, blocks, centerX, startY, maxWidth, maxHeight) {
    if (!blocks || blocks.length === 0) return;

    let currentY = startY;
    blocks.forEach(block => {
      const textColor = block.textColor || "#ffffff";
      const fontWeight = block.fontWeight || "bold";
      const author = block.author || "";

      const { lines, fontSize } = autoAdjustText(ctx, block.content, maxWidth, maxHeight / blocks.length, block.fontSize || 40);
      
      const lineHeight = fontSize * 1.2;
      const totalHeight = lines.length * lineHeight;
      const textY = currentY + (maxHeight / blocks.length - totalHeight) / 2;

      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;

      let y = textY;
      lines.forEach(line => {
        ctx.fillText(line, centerX, y);
        y += lineHeight;
      });

      if (author) {
        ctx.font = `italic ${fontSize * 0.8}px ${fontFamily}`;
        ctx.fillText(`- ${author}`, centerX, y + 10);
      }

      currentY += maxHeight / blocks.length;
    });
  }

  function autoAdjustText(ctx, text, maxWidth, maxHeight, initialFontSize) {
    let fontSize = initialFontSize;
    let lines;

    while (fontSize > 10) {
      ctx.font = `bold ${fontSize}px ${fontFamily}`;
      lines = wrapLines(ctx, text, maxWidth);
      const totalHeight = lines.length * fontSize * 1.2;
      
      if (totalHeight <= maxHeight) break;
      fontSize--;
    }

    return { lines, fontSize };
  }

  function wrapLines(ctx, text, maxWidth) {
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

    if (line.trim()) lines.push(line.trim());
    return lines;
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
