import React, { useEffect, useState } from "react";
import { mockTicketTour } from "../../mockData";

const DatePicker = (props) => {
  const { ticketBookedInfoRef = {} } = props;

  // Variables
  const numOfDateToDisplay = 4;

  // States
  const [selectedDate, setSelectedDate] = useState(0);
  const [startDate, setStartDate] = useState(0);

  // API
  const ticketTour = mockTicketTour; // call api
  useEffect(() => {
    // call API

    ticketBookedInfoRef.current.idRouteDepartureDate =
      ticketTour[0].idRouteDepartureDate;
  }, []);

  const handleNextDateGroup = () => {
    setStartDate((pre) => {
      if (pre + numOfDateToDisplay >= ticketTour?.length) {
        return pre;
      }

      return pre + numOfDateToDisplay;
    });
  };
  const handlePreviousDateGroup = () => {
    setStartDate((pre) => {
      if (pre - numOfDateToDisplay < 0) {
        return 0;
      }

      return pre - numOfDateToDisplay;
    });
  };
  const handleDateClick = (dateIndex) => {
    ticketBookedInfoRef.current.idRouteDepartureDate =
      ticketTour[dateIndex]?.idRouteDepartureDate;

    setSelectedDate(dateIndex);
  };

  return (
    <div className=" position-relative text-white py-3 d-flex justify-content-center align-items-center ">
      <button
        onClick={handlePreviousDateGroup}
        className="btn position-absolute top-50 start-0 translate-middle-y btn-light"
      >
        &lt;
      </button>
      <div className="d-flex  overflow-auto">
        {ticketTour
          .slice(startDate, startDate + numOfDateToDisplay)
          .map((d, i) => {
            const realIndex = i + startDate;
            const mm = d.departureDate.slice(0, 2);
            const dd = d.departureDate.slice(3, 5);
            return (
              <div
                key={i}
                onClick={() => {
                  if (d.status) {
                    handleDateClick(realIndex);
                    return;
                  }

                  alert("Khong the chon!");
                }}
                className={`${
                  d.status || "opacity-50"
                }  p-2 fw-bold rounded text-center  cursor-pointer mx-1 ${
                  selectedDate === realIndex
                    ? "bg-warning text-danger"
                    : "bg-light text-dark"
                }`}
              >
                <p className="mb-0">
                  {dd}-{mm}
                </p>
              </div>
            );
          })}
      </div>
      <button
        onClick={handleNextDateGroup}
        className="btn position-absolute top-50 end-0 translate-middle-y btn-light"
      >
        &gt;
      </button>
    </div>
  );
};
export default React.memo(DatePicker);
