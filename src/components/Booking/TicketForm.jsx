import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { mockTourDetail } from "../../mockData";
import formatMoney from "../../utils/formatMoney";

const TicketForm = (params) => {
  console.log("render ticket form");

  const {
    NumberOfSeats = 30,
    TicketPriceList,
    TicketPrices = mockTourDetail["TicketPriceList"],
  } = params;

  const [ticketTypeSelected, setTicketTypeSelected] = useState(null);

  const handleTicketTypeSelected = (type) => {
    // console.log(type); // "24h"
    setTicketTypeSelected(type);
  };

  const formik = useFormik({
    initialValues: {
      adults: 1,
      children: 0,
    },
    validateOnChange: true,
    validationSchema: Yup.object({
      adults: Yup.number()
        .min(0, "Số lượng người lớn không thể nhỏ hơn 0")
        .required("Vui lòng nhập số lượng người lớn"),
      children: Yup.number()
        .min(0, "Số lượng trẻ em không thể nhỏ hơn 0")
        .required("Vui lòng nhập số lượng trẻ em"),
    }),
    validate: (values) => {
      const errors = {};
      const total = values.adults + values.children;
      if (total < 1) {
        errors.total = "Tổng số người phải ít nhất là 1";
      } else if (total > NumberOfSeats) {
        errors.total = `Chúng tôi chỉ hỗ trợ đặt vé online tối đa ${NumberOfSeats} vé. Nếu muốn đặt nhiều hơn, hãy liên hệ tư vấn viên!`;
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  return (
    <>
      {TicketPrices.map((price, i) => (
        <div key={i} className="col-md-6 mb-3 ">
          <div
            onClick={() => {
              handleTicketTypeSelected(price.TicketType);
            }}
            className={`card text-dark ${
              ticketTypeSelected == price?.TicketType && "bg-warning"
            }`}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-0">
                  Loại vé: <span className="fw-bold ">{price.TicketType}</span>
                </p>
                <p className="mb-0">
                  {formatMoney(price.ParentPrice)}/Người lớn
                </p>
                <p className="mb-0">{formatMoney(price.ChildPrice)}/Trẻ em</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      {ticketTypeSelected && (
        <div className=" card pt-3 mb-3">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group  mb-3">
              <div className="container">
                <div class="row">
                  <div className="col-8">
                    <input
                      type="number"
                      min={0}
                      className={`form-control ${
                        formik.touched.adults && formik.errors.adults
                          ? "is-invalid"
                          : ""
                      }`}
                      id="adults"
                      name="adults"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.adults}
                    />
                    {formik.touched.adults && formik.errors.adults ? (
                      <div className="invalid-feedback">
                        {formik.errors.adults}
                      </div>
                    ) : null}
                  </div>
                  <div class="col-4 d-flex align-items-center">
                    <p className="m-0"> Người lớn</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group mb-3">
              <div className="container">
                <div class="row">
                  <div className="col-8">
                    <input
                      type="number"
                      min={0}
                      className={`form-control ${
                        formik.touched.children && formik.errors.children
                          ? "is-invalid"
                          : ""
                      }`}
                      id="children"
                      name="children"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.children}
                    />
                    {formik.touched.children && formik.errors.children ? (
                      <div className="invalid-feedback">
                        {formik.errors.children}
                      </div>
                    ) : null}
                  </div>
                  <div class="col-4 d-flex align-items-center">
                    <p className="m-0"> Trẻ em</p>
                  </div>
                </div>
              </div>
            </div>
            {formik.errors.total && (
              <div className="alert alert-danger">{formik.errors.total}</div>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default React.memo(TicketForm);
