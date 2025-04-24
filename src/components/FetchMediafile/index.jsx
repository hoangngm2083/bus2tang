import PropTypes from "prop-types";
import React, { useEffect } from "react";
import apiMediafile from "./apiMediafile"; // Đường dẫn đến apiMediafile

const FetchMediafile = ({ imgIds, imgUrlRef }) => {
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Gọi API đồng thời với Promise.all
        const results = await Promise.all(
          imgIds.map(async (item) => {
            if (!item?.idMediaFile) {
              return { data: null, error: new Error("Missing idMediaFile") };
            }
            return await apiMediafile(item.idMediaFile);
          })
        );

        // Lọc và lưu URL hợp lệ
        const urls = results
          .filter((result) => !result.error && result.data)
          .map((result) => result.data);

        imgUrlRef.current = urls;
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };

    fetchImages();

    // Thu hồi URL khi component unmount
    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imgIds]);

  return <></>;
};

// Định nghĩa PropTypes để kiểm tra kiểu dữ liệu đầu vào
FetchMediafile.propTypes = {
  imgIds: PropTypes.arrayOf(
    PropTypes.shape({
      idMediaFile: PropTypes.string.isRequired,
    })
  ).isRequired,
  imgUrlRef,
};

export default React.memo(FetchMediafile);
