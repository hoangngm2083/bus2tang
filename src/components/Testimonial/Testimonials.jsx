import React from "react";
import Slider from "react-slick";
import { mockReviews } from "../../mockData";
import ReviewElement from "./ReviewElement";

const Testimonials = () => {
  const reviews = mockReviews;

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {reviews.map((ele, index) => {
        return <ReviewElement key={index} review={ele} />;
      })}
    </Slider>
  );
};

export default Testimonials;
