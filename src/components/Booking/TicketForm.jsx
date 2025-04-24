import { useFormik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { mockTourDetail } from "../../mockData";
import { BASE_URL } from "../../utils/config";
import formatMoney from "../../utils/formatMoney";
import DatePicker from "./DatePicker";

const TicketForm = ({
  ticketBookedInfoRef,
  idBusRoute,
  numberOfSeats = 30,
  ticketPriceList = mockTourDetail.ticketPriceList,
}) => {
  const [ticketTypeIdSelected, setTicketTypeIdSelected] = useState(null);
  const [voucherMessage, setVoucherMessage] = useState(null);
  const [totalMoney, setTotalMoney] = useState(0);

  // Validation schema
  const validationSchema = useMemo(
    () =>
      Yup.object({
        parentCount: Yup.number()
          .min(0, "Số lượng người lớn không thể nhỏ hơn 0")
          .required("Vui lòng nhập số lượng người lớn"),
        childCount: Yup.number()
          .min(0, "Số lượng trẻ em không thể nhỏ hơn 0")
          .required("Vui lòng nhập số lượng trẻ em"),
        voucherCode: Yup.string(),
      }),
    []
  );

  // Formik setup
  const formik = useFormik({
    initialValues: {
      parentCount: 1,
      childCount: 0,
      voucherCode: "",
    },
    validationSchema,
    validate: ({ parentCount, childCount }) => {
      const errors = {};
      const total = parentCount + childCount;
      if (total < 1) {
        errors.total = "Tổng số người phải ít nhất là 1";
      } else if (total > numberOfSeats) {
        errors.total = `Chúng tôi chỉ hỗ trợ đặt vé online tối đa ${numberOfSeats} vé. Nếu muốn đặt nhiều hơn, hãy liên hệ tư vấn viên!`;
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  // Memoized reCalcTotalMoney function
  const reCalcTotalMoney = useCallback(
    (ticket, typeId) => {
      if (!ticket || !typeId || !ticketPriceList) {
        setTotalMoney(0);
        return;
      }

      const ticketPrice = ticketPriceList.find(
        (ele) => ele.idTicketPrice === typeId
      );
      if (!ticketPrice) {
        setTotalMoney(0);
        return;
      }

      const childCount = Number(ticket.childCount || 0);
      const parentCount = Number(ticket.parentCount || 0);
      const voucherPercent = Number(ticket.voucherPercent || 0);

      if (
        childCount < 0 ||
        parentCount < 0 ||
        voucherPercent < 0 ||
        voucherPercent > 100
      ) {
        setTotalMoney(0);
        return;
      }

      const price =
        ((childCount * Number(ticketPrice.childPrice || 0) +
          parentCount * Number(ticketPrice.parentPrice || 0)) *
          (100 - voucherPercent)) /
        100;

      ticketBookedInfoRef.current = { ...ticketBookedInfoRef.current, price };
      setTotalMoney(price);
    },
    [ticketPriceList, ticketBookedInfoRef]
  );

  // Handle ticket type selection
  const handleTicketTypeSelected = useCallback(
    (typeId) => {
      ticketBookedInfoRef.current.idTicketPrice = typeId;
      setTicketTypeIdSelected(typeId);
      reCalcTotalMoney(ticketBookedInfoRef.current, typeId);
    },
    [reCalcTotalMoney, ticketBookedInfoRef]
  );

  // Handle voucher search
  const handleSearchVoucherClicked = useCallback(
    (e) => {
      e.preventDefault();
      const voucherCode = formik.values.voucherCode;
      if (!voucherCode) {
        setVoucherMessage("Bạn đang để trống!");
        return;
      }

      (async () => {
        const { data, message } = await fetch(
          `${BASE_URL}/voucher/${voucherCode}`
        );
        if (data) {
          setVoucherMessage(data?.content);
          ticketBookedInfoRef.current.voucherPercent = data?.percent;
          reCalcTotalMoney(ticketBookedInfoRef.current, ticketTypeIdSelected);
          return;
        }
        setVoucherMessage(message);
      })();
    },
    [
      formik.values.voucherCode,
      ticketBookedInfoRef,
      ticketTypeIdSelected,
      reCalcTotalMoney,
    ]
  );

  // Sync formik values with ref
  useEffect(() => {
    if (formik.isValid) {
      ticketBookedInfoRef.current = {
        ...ticketBookedInfoRef.current,
        ...formik.values,
      };
      if (ticketTypeIdSelected) {
        reCalcTotalMoney(ticketBookedInfoRef.current, ticketTypeIdSelected);
      }
    }
  }, [
    formik.values,
    formik.isValid,
    ticketTypeIdSelected,
    reCalcTotalMoney,
    ticketBookedInfoRef,
  ]);

  // Auto-select first ticket type on mount
  useEffect(() => {
    if (ticketPriceList.length > 0 && !ticketTypeIdSelected) {
      const firstTicketType = ticketPriceList[0].idTicketPrice;
      handleTicketTypeSelected(firstTicketType);
    }
  }, [ticketPriceList, ticketTypeIdSelected, handleTicketTypeSelected]);

  return (
    <div className="container">
      <div className="card mb-3">
        <DatePicker
          idBusRoute={idBusRoute}
          ticketBookedInfoRef={ticketBookedInfoRef}
        />
      </div>
      <div className="row">
        {ticketPriceList.map((ticketPrice) => (
          <div key={ticketPrice.idTicketPrice} className="col-md-6 mb-3">
            <div
              onClick={() =>
                handleTicketTypeSelected(ticketPrice.idTicketPrice)
              }
              className={`card text-dark ${
                ticketTypeIdSelected === ticketPrice.idTicketPrice
                  ? "bg-warning"
                  : ""
              }`}
              role="button"
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-0 fw-bold">
                    Loại vé: {ticketPrice.ticketType}
                  </p>
                  <p style={{ fontSize: "14px" }} className="mb-0">
                    {formatMoney(ticketPrice.parentPrice)}/Người lớn
                  </p>
                  <p style={{ fontSize: "14px" }} className="mb-0">
                    {formatMoney(ticketPrice.childPrice)}/Trẻ em
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {ticketTypeIdSelected && (
        <div className="card p-3 mb-3">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-3">
              <div className="row align-items-center">
                <div className="col-8">
                  <input
                    type="number"
                    min="0"
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
                  {formik.touched.parentCount && formik.errors.parentCount && (
                    <div className="invalid-feedback">
                      {formik.errors.parentCount}
                    </div>
                  )}
                </div>
                <div className="col-4">Người lớn</div>
              </div>
            </div>
            <div className="form-group mb-3">
              <div className="row align-items-center">
                <div className="col-8">
                  <input
                    type="number"
                    min="0"
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
                  {formik.touched.childCount && formik.errors.childCount && (
                    <div className="invalid-feedback">
                      {formik.errors.childCount}
                    </div>
                  )}
                </div>
                <div className="col-4">Trẻ em</div>
              </div>
            </div>
            <div className="form-group mb-3">
              <div className="row align-items-center">
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
                  {formik.touched.voucherCode && formik.errors.voucherCode && (
                    <div className="invalid-feedback">
                      {formik.errors.voucherCode}
                    </div>
                  )}
                </div>
                <div className="col-4">
                  <button
                    type="button"
                    onClick={handleSearchVoucherClicked}
                    className="btn btn-warning w-100"
                  >
                    Tra cứu
                  </button>
                </div>
              </div>
              {voucherMessage && (
                <div className="mt-2 text-success">{voucherMessage}</div>
              )}
            </div>
            {formik.errors.total && (
              <div className="alert alert-danger">{formik.errors.total}</div>
            )}
          </form>
        </div>
      )}
      <div className="card p-3 mb-3">
        <div className="row">
          <div className="col-4">
            <p className="m-0 fw-bold">Chi phí:</p>
          </div>
          <div className="col-8">
            <p className="m-0 fw-bold text-danger">{formatMoney(totalMoney)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TicketForm);
