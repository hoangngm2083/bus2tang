import React, { useRef } from "react";
import { mockTicketTour, mockTourDetail } from "../../mockData";
import CustomerInfoForm from "./CustomerInfoForm";
import DatePicker from "./DatePicker";
import TicketForm from "./TicketForm";

const Booking = ({
  TicketTour = mockTicketTour,
  busRouteName = mockTourDetail["busRouteName"],
}) => {
  // Variables

  const bookingInfoRef = useRef({
    FullName: "",
    Email: "",
    PhoneNumber: "",
    updateAt: "",
    Region: "",
    TicketBookedList: [
      {
        idRouteDepartureDate: null,
        Price: 0,
        ChildCount: 0,
        ParentCount: 0,
        ticketType: "",
      },
      // {
      //   idRouteDepartureDate: 0,
      //   Price: 0,
      //   ChildCount: 0,
      //   ParentCount: 0,
      //   ticketType: "",
      // },
    ],
    PaidDateTime: "",
    paymentMethod: 0,
    paymentVia: "",
    VoucherCode: "",
  });
  const ticket = {
    idRouteDepartureDate: 3,
    Price: 4500000,
    ChildCount: 1,
    ParentCount: 2,
    ticketType: "48h",
  };

  // State

  return (
    <div className="container bg-white rounded shadow-lg">
      {/* Top Row: Date Selection */}
      <DatePicker TicketTour={TicketTour} />

      {/* Bottom Row: Ticket Information */}
      <div className="p-3">
        {/* Sub-Row 1*/}
        <div className=" card text-dark p-3 rounded mb-3 d-flex justify-content-between align-items-center">
          <div>
            <p className="fw-bold mb-0">{busRouteName}</p>
          </div>
        </div>

        {/* Sub-Row 2: Price */}
        <div className="row">
          <TicketForm />
        </div>

        <div className="row card pt-3">
          <CustomerInfoForm
            initialValues={{
              FullName: "",
              Email: "",
              PhoneNumber: "",
              paymentMethod: "",
              paymentVia: "",
              VoucherCode: "",
            }}
          />
        </div>

        {/* Sub-Row 3*/}
        <div className="row mt-3">
          <button
            onMouseOver={() => {}}
            onMouseOut={() => {}}
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
