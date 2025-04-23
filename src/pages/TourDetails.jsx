import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/tour-details.css";
// import tourData from '../assets/data/tours'
import { useParams } from "react-router-dom";
import { Col, Container, ListGroup, Row } from "reactstrap";
import ReviewElement from "../components/Testimonial/ReviewElement";
import { AuthContext } from "../context/AuthContext";
import Newsletter from "../shared/Newsletter";
import { BASE_URL } from "../utils/config";

import Booking from "../components/Booking";
import Slide from "../components/Slide";
import { mockReviews, mockTourDetail } from "../mockData";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);

  // fetch data from database
  //   const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);
  const tour = mockTourDetail;
  const avgRating = 10;
  const {
    photo,
    BusRouteName,
    Overview,
    Highlights,
    Included,
    Excluded,
    WhatToBring,
    BeforeYouGo,
    Description,
    MediaBusRouteList,
    BusStopList,
    desc,
    price,

    city,
    address,
    distance,
    maxGroupSize,
  } = tour; // tour
  const reviews = mockReviews;
  const tourImgs = MediaBusRouteList.map((ele) => ele["Url"]);

  const tourInfos = [
    { title: "Tổng quan", content: Overview },
    { title: "Điểm nổi bật", content: Highlights },
    { title: "Bao gồm", content: Included },
    { title: "Không bao gồm", content: Excluded },
    { title: "Mang theo những gì", content: WhatToBring },
    { title: "Trước khi đi", content: BeforeYouGo },
    { title: "Mô tả", content: Description },
  ];

  const options = { day: "numeric", month: "long", year: "numeric" };

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        alert("Please sign in");
      }
      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      alert(result.message);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <section>
      <Container>
        {/* {loading && <h4 className="text-center pt-5">LOADING.........</h4>}
        {error && <h4 className="text-center pt-5">{error}</h4>}
        {!loading && !error && ( */}
        {
          <Row>
            <Col lg="8">
              <div className="rounded overflow-hidden">
                <Slide slides={tourImgs} />
              </div>

              <div className="tour__content mt-4">
                {BusStopList.length > 0 && (
                  <div className="tour__info mt-4">
                    <div className="container">
                      {/* <div className="row"><div/> */}
                      <div className="row row-cols-4">
                        {BusStopList?.map((stopNode) => (
                          <div className="col">
                            <div className="row ">
                              <img src={stopNode.MediaBusStopList[0].Url} />
                            </div>
                            <div className="row">
                              <h5>{stopNode.BusStopName}</h5>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="tour__info mt-4">
                  {/* <h2>{BusRouteName}</h2>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ngày</th>
                        <th scope="col">Chỗ trống</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTicketTour
                        .filter((ele) => ele?.Status)
                        .map((slotOfTour, index) => {
                          return (
                            <tr>
                              <th scope="row">{index + 1}</th>
                              <td>{slotOfTour?.DepartureDate}</td>
                              <td>{slotOfTour?.NumberOfSeats}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table> */}

                  {tourInfos &&
                    tourInfos?.map((info) => {
                      return info?.content ? (
                        <>
                          <h5>{info?.title}</h5>
                          <p>{info?.content}</p>
                        </>
                      ) : (
                        <></>
                      );
                    })}
                </div>

                {/* ============ TOUR REVIEWS SECTION START ============ */}
                <div className="tour__reviews mt-4">
                  <h4>Reviews ({reviews?.length} reviews)</h4>

                  {/* <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      <span onClick={() => setTourRating(1)}>
                        1 <i class="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(2)}>
                        2 <i class="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(3)}>
                        3 <i class="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(4)}>
                        4 <i class="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(5)}>
                        5 <i class="ri-star-s-fill"></i>
                      </span>
                    </div>

                    <div className="review__input">
                      <input
                        type="text"
                        ref={reviewMsgRef}
                        placeholder="share your thoughts"
                        required
                      />
                      <button
                        className="btn primary__btn text-white"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </Form> */}

                  <ListGroup className="user__reviews">
                    {reviews.map((ele, index) => {
                      return <ReviewElement key={index} review={ele} />;
                    })}
                  </ListGroup>
                </div>
                {/* ============ TOUR REVIEWS SECTION END ============== */}
              </div>
            </Col>

            <Col lg="4">
              <Booking />
              {/* <Booking tour={tour} avgRating={avgRating} /> */}
            </Col>
          </Row>
        }
      </Container>
      <Newsletter />
    </section>
  );
};

export default TourDetails;
