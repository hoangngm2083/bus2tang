import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getBookingInfo } from "../store/bookingSlice";

// Hàm chuyển đổi định dạng ngày từ VNPay (YYYYMMDDHHMMSS) sang dạng dễ đọc
const formatDate = (vnpPayDate) => {
  if (!vnpPayDate) return "N/A";
  const year = vnpPayDate.slice(0, 4);
  const month = vnpPayDate.slice(4, 6);
  const day = vnpPayDate.slice(6, 8);
  const hour = vnpPayDate.slice(8, 10);
  const minute = vnpPayDate.slice(10, 12);
  return `${day}/${month}/${year} ${hour}:${minute}`;
};

// Hàm định dạng số tiền (VNPay trả về số tiền * 100)
const formatAmount = (amount) => {
  if (!amount) return "0";
  return (parseInt(amount) / 100).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

const Thanks = () => {
  // Lay thong tin dat hang trong session store
  const bookingInfo = useSelector(getBookingInfo);

  // Lấy query parameters từ URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Lấy các tham số từ VNPay
  const responseCode = queryParams.get("vnp_ResponseCode");
  const txnRef = queryParams.get("vnp_TxnRef");
  const amount = queryParams.get("vnp_Amount");
  const payDate = queryParams.get("vnp_PayDate");
  const orderInfo = queryParams.get("vnp_OrderInfo");

  // Lấy bookingData từ Redux store
  const bookingData = useSelector((state) => state.booking.bookingData);

  // Trạng thái thanh toán
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    // Kiểm tra trạng thái thanh toán dựa trên vnp_ResponseCode
    if (responseCode === "00") {
      const bookingInfo = { ...bookingData, paidDateTime: formatDate(payDate) };

      // Send to Server
      // api
      console.log(bookingInfo);

      setPaymentStatus("success");
    } else {
      setPaymentStatus("failure");
    }
  }, [responseCode]);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0 rounded-3 overflow-hidden">
            {/* <Card.Header className="bg-warning text-white text-center"> */}
            {/* Thông báo trạng thái thanh toán */}
            {paymentStatus === "success" && (
              <Alert variant="success" className=" rounded-0 shadow-sm  ">
                <h4 className="mb-3 text-danger">Cảm ơn bạn đã đặt vé!</h4>
                <p className="mb-0">
                  - Thanh toán qua VNPay thành công! Bạn đã sẵn sàng để khám phá
                  thành phố trên xe buýt 2 tầng.
                </p>
                <p className="mb-0">
                  - Hóa đơn và vé lên xe sẽ được gửi qua email của bạn!
                </p>
              </Alert>
            )}
            {paymentStatus === "failure" && (
              <Alert
                variant="danger"
                className=" rounded-0 shadow-sm"
                style={{
                  background: "linear-gradient(135deg, #dc3545, #e4606d)",
                  color: "#fff",
                }}
              >
                <h4 className="mb-3 text-white">Thanh toán không thành công</h4>
                <p className="mb-3">
                  Rất tiếc, giao dịch đã thất bại. Vui lòng kiểm tra và thử lại.
                </p>
                <Button
                  variant="light"
                  href="/booking"
                  className="rounded-pill px-4"
                  style={{ fontWeight: "bold" }}
                >
                  Thử lại
                </Button>
              </Alert>
            )}
            {/* </Card.Header> */}

            <Card.Body className="p-4">
              {/* Thông tin thanh toán từ VNPay */}
              {paymentStatus && (
                <div className="mb-4">
                  <h5 className="fw-bold mb-3 text-primary">
                    Chi tiết thanh toán
                  </h5>
                  <ListGroup variant="flush" className="bg-light rounded-3">
                    <ListGroup.Item className="d-flex justify-content-between py-3">
                      <strong>Mã giao dịch:</strong>
                      <span>{txnRef || "N/A"}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between py-3">
                      <strong>Số tiền:</strong>
                      <span>{formatAmount(amount)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between py-3">
                      <strong>Ngày thanh toán:</strong>
                      <span>{formatDate(payDate)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between py-3">
                      <strong>Thông tin đơn hàng:</strong>
                      <span>{orderInfo || "N/A"}</span>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              )}

              {/* Thông tin đặt vé từ bookingData */}
              {bookingData && (
                <div className="mb-4">
                  <h5 className="fw-bold mb-3 text-primary">
                    Thông tin đặt vé
                  </h5>
                  <ListGroup variant="flush" className="bg-light rounded-3">
                    <ListGroup.Item className="d-flex justify-content-between py-3">
                      <strong>Họ và tên:</strong>
                      <span>{bookingData.fullName || "N/A"}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between py-3">
                      <strong>Email:</strong>
                      <span>{bookingData.email || "N/A"}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between py-3">
                      <strong>Số điện thoại:</strong>
                      <span>{bookingData.phoneNumber || "N/A"}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between py-3">
                      <strong>Số vé người lớn:</strong>
                      <span>
                        {bookingData.ticketBooked?.parentCount || "0"}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between py-3">
                      <strong>Số vé trẻ em:</strong>
                      <span>{bookingData.ticketBooked?.childCount || "0"}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between py-3">
                      <strong>Tổng giá:</strong>
                      <span>
                        {bookingData.ticketBooked?.price.toLocaleString(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between py-3">
                      <strong>Mã giảm giá:</strong>
                      <span>
                        {bookingData.ticketBooked?.voucherCode || "Không có"}
                      </span>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              )}

              {/* Nút hành động */}
              <div className="text-center mt-4">
                <Button
                  variant="primary"
                  href="/"
                  className="rounded-pill px-4 me-2"
                  style={{
                    fontWeight: "bold",
                    background: "#007bff",
                    border: "none",
                  }}
                >
                  Quay lại trang chủ
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Thanks;
