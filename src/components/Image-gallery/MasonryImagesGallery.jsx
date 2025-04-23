import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import galleryImages from "./galleryImage";

const MasonryImagesGallery = ({ images = galleryImages }) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 1, 992: 4 }}>
      <Masonry gutter="1rem">
        {images.map((url, index) => (
          <img
            className="masonry__img"
            src={url}
            key={index}
            alt=""
            style={{ width: "100%", display: "block", borderRadius: "10px" }}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonryImagesGallery;
