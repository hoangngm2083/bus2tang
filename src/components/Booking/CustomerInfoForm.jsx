import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import React, { useEffect } from "react";
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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (formik.isValid) {
      customerInfoRef.current = {
        ...customerInfoRef.current,
        ...formik.values,
      };
    }
  }, [formik.values, formik.errors, formik.isValid]);

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <input
            name="fullName"
            type="text"
            className="form-control"
            placeholder="Họ và tên"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <div className="text-danger">{formik.errors.fullName}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger">{formik.errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            name="phoneNumber"
            type="text"
            className="form-control"
            placeholder="Số điện thoại"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div className="text-danger">{formik.errors.phoneNumber}</div>
          )}
        </div>
        <div className="mb-3">
          <select
            name="paymentMethod"
            className="form-select"
            value={formik.values.paymentMethod}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" disabled>
              Phương thức thanh toán
            </option>
            <option value="0">Thanh toán tại quầy</option>
            <option value="1">Thanh toán trực tuyến</option>
          </select>
          {formik.touched.paymentMethod && formik.errors.paymentMethod && (
            <div className="text-danger">{formik.errors.paymentMethod}</div>
          )}
        </div>
        {formik.values.paymentMethod === "1" && (
          <div className="mb-3">
            <select
              name="paymentVia"
              className="form-select"
              value={formik.values.paymentVia}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" disabled>
                Thanh toán qua
              </option>
              <option value="zalopay">ZaloPay</option>
              <option value="vnpay">VN Pay</option>
              <option value="momo">MoMo</option>
            </select>
            {formik.touched.paymentVia && formik.errors.paymentVia && (
              <div className="text-danger">{formik.errors.paymentVia}</div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default React.memo(CustomerInfoForm);
