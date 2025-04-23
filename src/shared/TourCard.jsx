import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import formatMoney from "../utils/formatMoney";
import "./tour-card.css";

const TourCard = ({ tour }) => {
  const { _id, busRouteName, ticketPriceList, mediaBusRouteList, overview } =
    tour;
  const parentPrice = ticketPriceList[0]["parentPrice"];
  const childPrice = ticketPriceList[0]["childPrice"];
  const ticketType = ticketPriceList[0]["ticketType"];

  const TicketTypes = ticketPriceList?.map((ticket) => ticket["ticketType"]);
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
            <Link to={`/tours/${_id}`}>{busRouteName}</Link>
          </h5>

          <h6 className="tour__desc">{overview}</h6>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <div>
              <h5>
                ${formatMoney(parentPrice)}{" "}
                <span> /Người lớn/{ticketType}</span>
              </h5>
              <h5>
                ${formatMoney(childPrice)} <span> /Trẻ em/{ticketType}</span>
              </h5>
            </div>

            <Link to={`/tours/${_id}`}>
              <button className=" booking__btn">Đặt ngay</button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
