import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PosterGenerator.css";

// Poster Categories
const posterCategories = {
  doctors: [...Array(10).keys()].map(
    (i) => `/img/wallpapers/doctors_Watermarked_Wallpapers/doctors_wallpaper_${i + 1}.jpeg`
  ),
  pathology: [...Array(10).keys()].map(
    (i) => `/img/wallpapers/pathology_Watermarked_Wallpapers/pathology_wallpaper_${i + 1}.jpeg`
  ),
  schools: [...Array(10).keys()].map(
    (i) => `/img/wallpapers/schools_Watermarked_Wallpapers/schools_wallpaper_${i + 1}.jpeg`
  ),
  general: [...Array(10).keys()].map(
    (i) =>
      `/img/wallpapers/wallpapers-general_Watermarked_Wallpapers/wallpapers-general_wallpaper_${i + 1}.jpeg`
  ),
};

const PosterGallery = () => {
  const [activeCategory, setActiveCategory] = useState("doctors");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const images = posterCategories[activeCategory];
  const totalPages = Math.ceil(images.length / itemsPerPage);
  const paginatedImages = images.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDownloadCategory = async () => {
    const zip = new JSZip();
    const folder = zip.folder(activeCategory);

    try {
      await Promise.all(
        images.map(async (url, index) => {
          const response = await fetch(url);
          const blob = await response.blob();
          folder.file(`image_${index + 1}.jpeg`, blob);
        })
      );

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${activeCategory}_images.zip`);
    } catch (error) {
      alert("Some images couldn't be downloaded. Please check image paths.");
    }
  };

  return (
    <div className="container py-4">
      {/* Category Buttons */}
      <div className="mb-4 text-center">
        {Object.keys(posterCategories).map((category) => (
          <button
            key={category}
            className={`btn btn-sm mx-2 ${
              activeCategory === category
                ? "btn-success"
                : "btn-outline-success"
            }`}
            onClick={() => {
              setActiveCategory(category);
              setCurrentPage(1);
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Download Button */}
      <div className="text-center mb-3">
        <button className="btn btn-outline-primary" onClick={handleDownloadCategory}>
          Download All "{activeCategory}" Images
        </button>
      </div>

      {/* Poster Grid */}
      <div className="row g-3">
        {paginatedImages.map((imgSrc, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-2-4">
            <div className="poster-wrapper">
              <img
                src={imgSrc}
                alt={`Poster ${index + 1}`}
                className="img-fluid poster-img"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          {[...Array(totalPages).keys()].map((num) => (
            <li key={num} className={`page-item ${currentPage === num + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(num + 1)}>
                {num + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PosterGallery;
