import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { mockTourDetail } from "../../mockData";
import formatMoney from "../../utils/formatMoney";
import DatePicker from "./DatePicker";

const TicketForm = (params) => {
  // Get parameters
  const {
    ticketBookedInfoRef,
    numberOfSeats = 30,
    ticketPriceList = mockTourDetail["ticketPriceList"], // truyen tu component cha
  } = params;

  // States
  const [ticketTypeSelected, setTicketTypeSelected] = useState(null);
  const [voucherMessage, setVoucherMessage] = useState(null);
  const [totalMoney, setTotalMoney] = useState(0);

  // Handle Events
  const handleTicketTypeSelected = (typeId) => {
    ticketBookedInfoRef.current.idTicketPrice = typeId;
    setTicketTypeSelected(typeId);
  };

  const handleSearchVoucherClicked = (e) => {
    if (!ticketBookedInfoRef.current.voucherCode) {
      setVoucherMessage("Bạn đang để trống!");
      return;
    }

    // API
    // (async () => {
    //   const res = await fetch("...");
    //   setVoucherMessage(res);
    // })();
    // tinh lai tong so tien
    reCalcTotalMoney(ticketBookedInfoRef.current);
    setVoucherMessage("Giamr 25%");
  };

  // formik
  const formik = useFormik({
    initialValues: {
      parentCount: 1,
      childCount: 0,
      voucherCode: "",
    },
    validateOnChange: true,
    validationSchema: Yup.object({
      parentCount: Yup.number()
        .min(0, "Số lượng người lớn không thể nhỏ hơn 0")
        .required("Vui lòng nhập số lượng người lớn"),
      childCount: Yup.number()
        .min(0, "Số lượng trẻ em không thể nhỏ hơn 0")
        .required("Vui lòng nhập số lượng trẻ em"),
      voucherCode: Yup.string(),
    }),
    validate: (values) => {
      const errors = {};
      const total = values.parentCount + values.childCount;
      if (total < 1) {
        errors.total = "Tổng số người phải ít nhất là 1";
      } else if (total > numberOfSeats) {
        errors.total = `Chúng tôi chỉ hỗ trợ đặt vé online tối đa ${numberOfSeats} vé. Nếu muốn đặt nhiều hơn, hãy liên hệ tư vấn viên!`;
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  const reCalcTotalMoney = (ticket) => {
    const price =
      ((Number(ticket.childCount || 0) *
        Number(ticketPriceList[ticketTypeSelected]?.childPrice || 0) +
        Number(ticket.parentCount || 0) *
          Number(ticketPriceList[ticketTypeSelected]?.parentPrice || 0)) *
        (100 - Number(ticket.voucherPercent || 0))) /
      100;

    ticketBookedInfoRef.current = { ...ticketBookedInfoRef.current, price };
    setTotalMoney(price);
  };

  // Thêm useEffect để theo dõi giá trị và lỗi
  useEffect(() => {
    if (formik.isValid) {
      ticketBookedInfoRef.current = {
        ...ticketBookedInfoRef.current,
        ...formik.values,
      };

      // tinh lai tong so tien
      reCalcTotalMoney(ticketBookedInfoRef.current);
    }
  }, [formik.values, formik.errors, formik.isValid]);

  return (
    <>
      <div className="card mb-3">
        <DatePicker ticketBookedInfoRef={ticketBookedInfoRef} />
      </div>
      {ticketPriceList.map((price, i) => (
        <div key={i} className="col-md-6 mb-3 ">
          <div
            onClick={() => {
              handleTicketTypeSelected(price.idTicketPrice);
            }}
            className={`card text-dark ${
              ticketTypeSelected == price?.idTicketPrice && "bg-warning"
            }`}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-0">
                  Loại vé: <span className="fw-bold ">{price.ticketType}</span>
                </p>
                <p className="mb-0">
                  {formatMoney(price.parentPrice)}/Người lớn
                </p>
                <p className="mb-0">{formatMoney(price.childPrice)}/Trẻ em</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      {ticketTypeSelected && (
        <div className=" card pt-3 mb-3">
          <form onSubmit={formik.handleSubmit}>
            {/* Nguoi lon */}
            <div className="form-group  mb-3">
              <div className="container">
                <div class="row">
                  <div className="col-8">
                    <input
                      type="number"
                      min={0}
                      className={`form-control ${
                        formik.touched.parentCount && formik.errors.parentCount
                          ? "is-invalid"
                          : ""
                      }`}
                      id="parentCount"
                      name="parentCount"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.parentCount}
                    />
                    {formik.touched.parentCount && formik.errors.parentCount ? (
                      <div className="invalid-feedback">
                        {formik.errors.parentCount}
                      </div>
                    ) : null}
                  </div>
                  <div class="col-4 d-flex align-items-center">
                    <p className="m-0"> Người lớn</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Tre em */}
            <div className="form-group mb-3">
              <div className="container">
                <div class="row">
                  <div className="col-8">
                    <input
                      type="number"
                      min={0}
                      className={`form-control ${
                        formik.touched.childCount && formik.errors.childCount
                          ? "is-invalid"
                          : ""
                      }`}
                      id="childCount"
                      name="childCount"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.childCount}
                    />
                    {formik.touched.childCount && formik.errors.childCount ? (
                      <div className="invalid-feedback">
                        {formik.errors.childCount}
                      </div>
                    ) : null}
                  </div>
                  <div class="col-4 d-flex align-items-center">
                    <p className="m-0"> Trẻ em</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Voucher */}
            <div className="form-group mb-3">
              <div className="container">
                <div class="row">
                  <div className="col-8">
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.voucherCode && formik.errors.voucherCode
                          ? "is-invalid"
                          : ""
                      }`}
                      id="voucherCode"
                      name="voucherCode"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.voucherCode}
                      placeholder="Mã voucher (nếu có)"
                    />
                    {formik.touched.voucherCode && formik.errors.voucherCode ? (
                      <div className="invalid-feedback">
                        {formik.errors.voucherCode}
                      </div>
                    ) : null}
                  </div>
                  <button
                    onClick={handleSearchVoucherClicked}
                    class="col-4 d-flex align-items-center btn bg-warning justify-content-center"
                  >
                    <p className="m-0 fw-bold"> Tra cứu</p>
                  </button>
                </div>

                {voucherMessage && (
                  <div className="row mt-2">
                    <p className="m-0">{voucherMessage}</p>
                  </div>
                )}
              </div>
            </div>
            {formik.errors.total && (
              <div className="alert alert-danger">{formik.errors.total}</div>
            )}

            {!formik.errors.total && <div className="">{}</div>}
          </form>
        </div>
      )}
      <div className=" card p-3 mb-3">
        <div className="row">
          <div className="col-4">
            <p className="m-0 px-3 fw-bold">Chi phí:</p>
          </div>
          <div className="col-8">
            <p className="m-0 fw-bold text-danger">{formatMoney(totalMoney)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(TicketForm);
