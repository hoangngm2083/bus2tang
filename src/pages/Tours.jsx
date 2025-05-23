import React, { useEffect, useState } from "react";
import CommonSection from "../shared/CommonSection";
// import tourData from '../assets/data/tours'
import { Col, Container, Row } from "reactstrap";
import useFetch from "../hooks/useFetch";
import "../styles/tour.css";
import { BASE_URL } from "../utils/config";
import Newsletter from "./../shared/Newsletter";
import TourCard from "./../shared/TourCard";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const { data: tours, loading, error } = useFetch(`${BASE_URL}/busroute/hcm`);

  const tourCount = 10;
  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  return (
    <>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>{/* <SearchBar /> */}</Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          {
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
                  {" "}
                  <TourCard tour={tour} />{" "}
                </Col>
              ))}

              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          }
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Tours;
