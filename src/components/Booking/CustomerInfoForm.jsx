import "bootstrap/dist/css/bootstrap.min.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const CustomerInfoForm = (params) => {
  const { customerInfoRef } = params;

  const initialValues = customerInfoRef.current;

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Vui lòng nhập họ và tên"),
    email: Yup.string()
      .email("email không hợp lệ")
      .required("Vui lòng nhập email"),
    phoneNumber: Yup.string()
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
        {({ values, errors, touched, isValid }) => (
          <Form>
            <div className="mb-3">
              <Field
                name="fullName"
                type="text"
                className="form-control"
                placeholder="Họ và tên"
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <Field
                name="email"
                type="email"
                className="form-control"
                placeholder="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <Field
                name="phoneNumber"
                type="text"
                className="form-control"
                placeholder="Số điện thoại"
              />
              <ErrorMessage
                name="phoneNumber"
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default React.memo(CustomerInfoForm);
