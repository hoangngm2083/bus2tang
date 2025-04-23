import React, { useState } from "react";

const DatePicker = (props) => {
  const { TicketTour } = props; // call api

  const numOfDateToDisplay = 4;
  const [selectedDate, setSelectedDate] = useState(0);
  const [startDate, setStartDate] = useState(0);

  const handleNextDateGroup = () => {
    setStartDate((pre) => {
      if (pre + numOfDateToDisplay >= TicketTour?.length) {
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
    console.log(TicketTour[dateIndex]["IdRouteDepartureDate"]);

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
        {TicketTour.slice(startDate, startDate + numOfDateToDisplay).map(
          (d, i) => {
            const realIndex = i + startDate;
            const mm = d.DepartureDate.slice(0, 2);
            const dd = d.DepartureDate.slice(3, 5);
            return (
              <div
                key={i}
                onClick={() => {
                  if (d.Status) {
                    handleDateClick(realIndex);
                    return;
                  }

                  alert("Khong the chon!");
                }}
                className={`${
                  d.Status || "opacity-50"
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
          }
        )}
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
