import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import apiMediafile from "../api/apiMediafile";
import formatMoney from "../utils/formatMoney";
import "./tour-card.css";

const TourCard = ({ tour }) => {
  const { urlImg, setUrlImg } = useState(null);

  const {
    idBusRoute,
    busRouteName,
    ticketPriceList,
    mediaBusRouteList,
    overview,
  } = tour;
  const parentPrice = ticketPriceList[0]["parentPrice"];
  const childPrice = ticketPriceList[0]["childPrice"];

  const TicketTypes = ticketPriceList?.map((ticket) => ticket["ticketType"]);

  useEffect(() => {
    (async () => {
      const { data, error } = await apiMediafile(
        mediaBusRouteList[0]?.idMediaFile
      );
      if (data) {
        setUrlImg(data);
        return;
      }
      console.log(error);
    })();
  }, []);
  const Img = mediaBusRouteList[0]["url"];
  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={Img} alt="tour-img" />
          <span>
            {TicketTypes?.reduce((s, type) => s + " " + type, "").trim()}
          </span>
        </div>

        <CardBody>
          <h5 className="tour__title">
            <Link to={`/tours/${idBusRoute}`}>{busRouteName}</Link>
          </h5>

          <h6 className="tour__desc">{overview}</h6>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <div>
              <h5>
                ${formatMoney(parentPrice)} <span> /Người lớn</span>
              </h5>
              <h5>
                ${formatMoney(childPrice)} <span> /Trẻ em</span>
              </h5>
            </div>

            <Link to={`/tours/${idBusRoute}`}>
              <button className=" booking__btn">Đặt ngay</button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
