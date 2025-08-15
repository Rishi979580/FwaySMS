import React, { useState, useEffect, useRef } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import InfiniteScroll from "react-infinite-scroll-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PosterGenerator.css";

const PosterGallery = () => {
  const [posterCategories, setPosterCategories] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    fetch("https://rishi979580.pythonanywhere.com/api/wallpapers")
      .then((res) => res.json())
      .then((data) => {
        setPosterCategories(data);
        Object.keys(data).forEach((cat) => {
          sectionRefs.current[cat] = React.createRef();
        });
      })
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  const scrollToCategory = (category) => {
    sectionRefs.current[category]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleDownloadPlatform = async (category, platform, images) => {
    const zip = new JSZip();
    const folder = zip.folder(`${category}/${platform}`);

    try {
      await Promise.all(
        images.map(async (url, index) => {
          const response = await fetch(url);
          const blob = await response.blob();
          folder.file(`image_${index + 1}.jpeg`, blob);
        })
      );

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${category}_${platform}_images.zip`);
    } catch (error) {
      alert(`Some images in "${category} - ${platform}" couldn't be downloaded.`);
    }
  };

  const handleDownloadSingle = async (imgSrc, platform, index) => {
    try {
      const response = await fetch(imgSrc);
      const blob = await response.blob();
      saveAs(blob, `${platform}_poster_${index + 1}.jpeg`);
    } catch (error) {
      alert("Failed to download image");
    }
  };

  const handleShare = async (imgSrc) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this poster!",
          text: "Found this cool poster for you!",
          url: imgSrc
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(imgSrc);
      alert("Image link copied to clipboard!");
    }
  };

  return (
    <div className="container py-4">
      {/* Category Buttons */}
      <div className="mb-4 category-bar text-center category-scroll">
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {Object.keys(posterCategories).map((category) => (
            <button
              key={category}
              className="category-btn"
              onClick={() => scrollToCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Categories and Platforms */}
      {Object.keys(posterCategories).map((category) => (
        <div
          key={category}
          ref={sectionRefs.current[category]}
          className="mb-5"
        >
          <h3 className="text-center mb-4">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h3>

          {/* Platforms inside category */}
          {Object.keys(posterCategories[category]).map((platform) => (
            <div key={platform} className="mb-4">
              {/* Platform title + Download all */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </h5>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() =>
                    handleDownloadPlatform(
                      category,
                      platform,
                      posterCategories[category][platform]
                    )
                  }
                >
                  Download All
                </button>
              </div>

              {/* Infinite Scroll for images */}
              <InfiniteScroll
                dataLength={posterCategories[category][platform].length}
                next={() => {}} // backend pagination add karoge to logic yahan aayega
                hasMore={false} // abhi saara data ek baar me aa raha hai
                loader={<h6 className="text-center my-3">Loading...</h6>}
              >
                <div className="row g-3">
                  {posterCategories[category][platform].map((imgSrc, index) => (
                    <div key={index} className="col-6 col-md-4 col-lg-2">
                      <div className="poster-wrapper">
                        <div className="image-actions">
                          <button
                            className="action-btn"
                            title="Download"
                            onClick={() =>
                              handleDownloadSingle(imgSrc, platform, index)
                            }
                          >
                            ⬇
                          </button>
                          <button
                            className="action-btn"
                            title="Share"
                            onClick={() => handleShare(imgSrc)}
                          >
                            ➥
                          </button>
                        </div>
                        <img
                          src={imgSrc}
                          alt={`${platform} Poster ${index + 1}`}
                          className="img-fluid poster-img"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PosterGallery;
