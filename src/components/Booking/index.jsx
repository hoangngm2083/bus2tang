import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import apiPayment from "../../api/apiPayment";
import { mockTourDetail } from "../../mockData";
import { setBookingData } from "../../store/bookingSlice";
import CustomerInfoForm from "./CustomerInfoForm";
import TicketForm from "./TicketForm";

const Booking = ({
  busRouteName = mockTourDetail["busRouteName"],
  idBusRoute = mockTourDetail["idBusRoute"],
  ticketPriceList = mockTourDetail["ticketPriceList"],
}) => {
  const dispatch = useDispatch();
  // States

  // Ref
  const customerInfoRef = useRef({
    fullName: "",
    email: "",
    phoneNumber: "",
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
    console.log("handleClickBooking", data);
    // Dispatch dữ liệu vào Redux store
    dispatch(setBookingData(data));

    const apiPaymentURL = apiPayment(data.ticketBooked.price);
    window.location.href = apiPaymentURL;
    // (Tùy chọn) Log để kiểm tra
    console.log("Booking data saved:", data);
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
          <TicketForm
            idBusRoute={idBusRoute}
            ticketPriceList={ticketPriceList}
            ticketBookedInfoRef={ticketBookedInfoRef}
          />
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
