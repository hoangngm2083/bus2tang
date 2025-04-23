import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import formatMoney from "../utils/formatMoney";
import "./tour-card.css";

const TourCard = ({ tour }) => {
  const { _id, BusRouteName, TicketPriceList, MediaBusRouteList, Overview } =
    tour;
  const ParentPrice = TicketPriceList[0]["ParentPrice"];
  const ChildPrice = TicketPriceList[0]["ChildPrice"];
  const TicketType = TicketPriceList[0]["TicketType"];

  const TicketTypes = TicketPriceList?.map((ticket) => ticket["TicketType"]);
  const Img = MediaBusRouteList[0]["Url"];
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
            <Link to={`/tours/${_id}`}>{BusRouteName}</Link>
          </h5>

          <h6 className="tour__desc">{Overview}</h6>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <div>
              <h5>
                ${formatMoney(ParentPrice)}{" "}
                <span> /Người lớn/{TicketType}</span>
              </h5>
              <h5>
                ${formatMoney(ChildPrice)} <span> /Trẻ em/{TicketType}</span>
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
