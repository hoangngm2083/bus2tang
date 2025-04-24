import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, ListGroup, Row } from "reactstrap";
import "../styles/tour-details.css";

import apiMediafile from "../api/apiMediafile";
import Booking from "../components/Booking";
import Slide from "../components/Slide";
import ReviewElement from "../components/Testimonial/ReviewElement";
import useFetch from "../hooks/useFetch";
import { mockReviews } from "../mockData";
import Newsletter from "../shared/Newsletter";
import { BASE_URL } from "../utils/config";

// Component hiển thị danh sách bus stops
const BusStopList = ({ busStopList }) => {
  if (!busStopList?.length) return null;

  return (
    <div className="tour__info mt-4">
      <h5>Bus Stops</h5>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {busStopList
            .sort((a, b) => a.stopOrder - b.stopOrder)
            .map((stopNode) => (
              <div className="col" key={stopNode.id}>
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={
                      stopNode.mediaBusStopList?.[0]?.url ||
                      "https://via.placeholder.com/200"
                    }
                    className="card-img-top img-fluid"
                    alt={stopNode.busStopName}
                    style={{ objectFit: "cover", height: "200px" }}
                    loading="lazy"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/200")
                    }
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">{stopNode.busStopName}</h5>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// Component hiển thị thông tin tour
const TourInfo = ({ infos }) => {
  const filteredInfos = infos.filter((info) => info.content);

  if (!filteredInfos.length) return null;

  return (
    <div className="tour__info mt-4">
      {filteredInfos.map((info, index) => (
        <div key={index}>
          <h5>{info.title}</h5>
          <p>{info.content}</p>
        </div>
      ))}
    </div>
  );
};

const TourDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`${BASE_URL}/busroute/hcm/${id}`);
  const [imageUrls, setImageUrls] = useState([]);

  // Destructuring với giá trị mặc định
  const {
    idBusRoute = "",
    busRouteName = "",
    overview = "",
    highlights = "",
    included = "",
    excluded = "",
    whatToBring = "",
    beforeYouGo = "",
    description = "",
    mediaBusRouteList = [],
    busStopList = [],
    ticketPriceList = [],
  } = data?.busRoute || {};

  const tourInfos = [
    { title: "Tổng quan", content: overview },
    { title: "Điểm nổi bật", content: highlights },
    { title: "Bao gồm", content: included },
    { title: "Không bao gồm", content: excluded },
    { title: "Mang theo những gì", content: whatToBring },
    { title: "Trước khi đi", content: beforeYouGo },
    { title: "Mô tả", content: description },
  ];

  // Fetch danh sách URL hình ảnh
  useEffect(() => {
    const fetchImages = async () => {
      if (!mediaBusRouteList.length) {
        setImageUrls([]);
        return;
      }

      try {
        const results = await Promise.all(
          mediaBusRouteList.map(async (item) => {
            if (!item?.idMediaFile)
              return { data: null, error: new Error("Missing idMediaFile") };
            return await apiMediafile(item.idMediaFile);
          })
        );

        const urls = results
          .filter((result) => !result.error && result.data)
          .map((result) => result.data);

        setImageUrls(urls);
      } catch (err) {
        console.error("Error fetching images:", err);
        setImageUrls([]);
      }
    };

    fetchImages();

    // Thu hồi URL khi component unmount
    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [mediaBusRouteList]);

  // Xử lý trạng thái tải và lỗi
  if (loading) {
    return (
      <Container>
        <Row>
          <Col>
            <div className="text-center my-5">
              <h4>Loading...</h4>
              {/* Có thể thêm skeleton UI */}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error || !data?.busRoute) {
    return (
      <Container>
        <Row>
          <Col>
            <div className="text-center my-5">
              <h4>Error loading tour details. Please try again later.</h4>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8">
            <div className="rounded overflow-hidden">
              <Slide
                slides={
                  imageUrls.length > 0
                    ? imageUrls
                    : ["https://via.placeholder.com/800"]
                }
              />
            </div>

            <div className="tour__content mt-4">
              <h2>{busRouteName}</h2>
              <BusStopList busStopList={busStopList} />
              <TourInfo infos={tourInfos} />

              {/* Reviews Section */}
              <div className="tour__reviews mt-4">
                <h4>Reviews ({mockReviews.length} reviews)</h4>
                <ListGroup className="user__reviews">
                  {mockReviews.map((review, index) => (
                    <ReviewElement key={index} review={review} />
                  ))}
                </ListGroup>
              </div>
            </div>
          </Col>

          <Col lg="4">
            <Booking
              busRouteName={busRouteName}
              ticketPriceList={ticketPriceList}
              idBusRoute={idBusRoute}
            />
          </Col>
        </Row>
      </Container>
      <Newsletter />
    </section>
  );
};

// PropTypes
TourDetails.propTypes = {
  id: PropTypes.string,
};

BusStopList.propTypes = {
  busStopList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      busStopName: PropTypes.string.isRequired,
      stopOrder: PropTypes.number.isRequired,
      mediaBusStopList: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
        })
      ),
    })
  ),
};

TourInfo.propTypes = {
  infos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string,
    })
  ).isRequired,
};

export default TourDetails;
