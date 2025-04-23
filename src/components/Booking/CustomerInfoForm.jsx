import "bootstrap/dist/css/bootstrap.min.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const CustomerInfoForm = (params) => {
  const initialValues = {
    FullName: "",
    Email: "",
    PhoneNumber: "",
    paymentMethod: "",
    paymentVia: "",
    VoucherCode: "",
    TicketBookedList: [],
  };

  const validationSchema = Yup.object().shape({
    FullName: Yup.string().required("Vui lòng nhập họ và tên"),
    Email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    PhoneNumber: Yup.string()
      .matches(/^\d{10,}$/, "Số điện thoại không hợp lệ")
      .required("Vui lòng nhập số điện thoại"),
    paymentMethod: Yup.string()
      .oneOf(["0", "1"], "Phương thức thanh toán không hợp lệ")
      .required("Vui lòng chọn phương thức thanh toán"),
    paymentVia: Yup.string().when("paymentMethod", {
      is: "1",
      then: Yup.string().required(
        "Vui lòng chọn phương thức thanh toán trực tuyến"
      ),
      otherwise: Yup.string().nullable(),
    }),
    VoucherCode: Yup.string().nullable(),
  });

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ values }) => (
          <Form>
            <div className="mb-3">
              <Field
                name="FullName"
                type="text"
                className="form-control"
                placeholder="Họ và tên"
              />
              <ErrorMessage
                name="FullName"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <Field
                name="Email"
                type="email"
                className="form-control"
                placeholder="Email"
              />
              <ErrorMessage
                name="Email"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <Field
                name="PhoneNumber"
                type="text"
                className="form-control"
                placeholder="Số điện thoại"
              />
              <ErrorMessage
                name="PhoneNumber"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <Field as="select" name="paymentMethod" className="form-select">
                <option value="" disabled>
                  Phương thức thanh toán
                </option>
                <option value="0">Thanh toán tại quầy</option>
                <option value="1">Thanh toán trực tuyến</option>
              </Field>
              <ErrorMessage
                name="paymentMethod"
                component="div"
                className="text-danger"
              />
            </div>
            {values.paymentMethod === "1" && (
              <div className="mb-3">
                <Field as="select" name="paymentVia" className="form-select">
                  <option value="" disabled>
                    Thanh toán qua
                  </option>
                  <option value="zalopay">ZaloPay</option>
                  <option value="vnpay">VN Pay</option>
                  <option value="momo">MoMo</option>
                </Field>
                <ErrorMessage
                  name="paymentVia"
                  component="div"
                  className="text-danger"
                />
              </div>
            )}
            <div className="mb-3">
              <Field
                name="VoucherCode"
                type="text"
                className="form-control"
                placeholder="Mã voucher (nếu có)"
              />
              <ErrorMessage
                name="VoucherCode"
                component="div"
                className="text-danger"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default React.memo(CustomerInfoForm);
