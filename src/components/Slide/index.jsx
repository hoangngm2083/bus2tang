import React, { useState } from "react";

const Slide = ({ slides }) => {
  const [active, setActive] = useState(0);
  const next = () => {
    const newIndex = active + 1;
    if (newIndex >= slides?.length) {
      setActive(0);
    } else {
      setActive(newIndex);
    }
  };

  const previous = () => {
    const newIndex = active - 1;
    if (newIndex < 0) {
      setActive(slides?.length - 1);
    } else {
      setActive(newIndex);
    }
  };

  return (
    <>
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          {slides?.map((url, index) => {
            if (index == active) {
              return (
                <div class="carousel-item active">
                  <img class="d-block w-100" src={url} />
                </div>
              );
            }
            return (
              <div class="carousel-item">
                <img class="d-block w-100" src={url} />
              </div>
            );
          })}
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
          onClick={previous}
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
          onClick={next}
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </>
  );
};
export default React.memo(Slide);
