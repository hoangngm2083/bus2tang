import React, { useEffect, useState } from "react";
import "../styles/tour-details.css";
// import tourData from '../assets/data/tours'
import { useParams } from "react-router-dom";
import { Col, Container, ListGroup, Row } from "reactstrap";
import ReviewElement from "../components/Testimonial/ReviewElement";
import Newsletter from "../shared/Newsletter";

import Booking from "../components/Booking";
import Slide from "../components/Slide";
import { mockReviews, mockTourDetail } from "../mockData";

const TourDetails = () => {
  const { id } = useParams();

  const [tourRating, setTourRating] = useState(null);

  const tour = mockTourDetail; // api

  const {
    photo,
    busRouteName,
    overview,
    highlights,
    included,
    excluded,
    whatToBring,
    beforeYouGo,
    description,
    mediaBusRouteList,
    busStopList,
    ticketPriceList,
    desc,
    price,

    city,
    address,
    distance,
    maxGroupSize,
  } = tour; // tour

  // fetch data from database
  //   const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  const reviews = mockReviews;
  const tourImgs = mediaBusRouteList.map((ele) => ele["url"]);

  const tourInfos = [
    { title: "Tổng quan", content: overview },
    { title: "Điểm nổi bật", content: highlights },
    { title: "Bao gồm", content: included },
    { title: "Không bao gồm", content: excluded },
    { title: "Mang theo những gì", content: whatToBring },
    { title: "Trước khi đi", content: beforeYouGo },
    { title: "Mô tả", content: description },
  ];

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
                {busStopList.length > 0 && (
                  <div className="tour__info mt-4">
                    <div className="container">
                      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                        {busStopList
                          ?.sort((a, b) => a.stopOrder - b.stopOrder)
                          ?.map((stopNode) => (
                            <div className="col" key={stopNode.id}>
                              <div className="card h-100 shadow-sm border-0">
                                <img
                                  src={stopNode.mediaBusStopList[0]?.url}
                                  className="card-img-top img-fluid"
                                  alt={stopNode.busStopName}
                                  style={{
                                    objectFit: "cover",
                                    height: "200px",
                                  }}
                                />
                                <div className="card-body">
                                  <h5 className="card-title mb-0">
                                    {stopNode.busStopName}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="tour__info mt-4">
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
              <Booking
                busRouteName={busRouteName}
                ticketPriceList={ticketPriceList}
              />
            </Col>
          </Row>
        }
      </Container>
      <Newsletter />
    </section>
  );
};

export default TourDetails;
