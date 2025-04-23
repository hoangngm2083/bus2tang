import React, { useEffect, useRef } from "react";
import { mockTourDetail } from "../../mockData";
import CustomerInfoForm from "./CustomerInfoForm";
import TicketForm from "./TicketForm";

const Booking = ({ busRouteName = mockTourDetail["busRouteName"] }) => {
  // States

  // API
  useEffect(() => {
    // Call API get Tour Detail
  }, []);

  // Ref
  const customerInfoRef = useRef({
    fullName: "",
    email: "",
    phoneNumber: "",
    updateAt: "",
    region: "VietNam",
    paidDateTime: "",
    paymentMethod: 0,
    paymentVia: "",
  });

  const ticketBookedInfoRef = useRef({
    idRouteDepartureDate: null,
    price: 0,
    childCount: 0,
    parentCount: 1,
    idTicketPrice: "",
    voucherCode: "",
    voucherPercent: 0,
  });

  // Handle Events
  const handleClickBooking = () => {
    const data = {
      ...customerInfoRef.current,

      ticketBooked: ticketBookedInfoRef.current,
    };
    console.log(data);
  };

  return (
    <div className="container bg-white rounded shadow-lg">
      <div className="p-3">
        {/* Sub-Row 1*/}
        <div className=" card bg-warning text-dark p-3 rounded mb-3 d-flex justify-content-between align-items-center">
          <div>
            <p className="fw-bold mb-0">{busRouteName}</p>
          </div>
        </div>

        {/* Sub-Row 2: price */}
        <div className="row">
          <TicketForm ticketBookedInfoRef={ticketBookedInfoRef} />
        </div>

        <div className="row card pt-3">
          <CustomerInfoForm customerInfoRef={customerInfoRef} />
        </div>

        {/* Sub-Row 3*/}
        <div className="row mt-3">
          <button
            onClick={handleClickBooking}
            className="card border-warning border w-100  justify-content-center text-center text-dark p-3 rounded  d-flex justify-content-center align-items-center"
          >
            <p className="mb-0 fw-bold">Đặt ngay</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default React.memo(Booking);
