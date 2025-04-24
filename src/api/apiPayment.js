import CryptoJS from "crypto-js";

const tmnCode = "FJQHPODF"; // Mã TmnCode của bạn
const secretKey = "F1DJD91C8EZA2T2FNRY01ODDE0P2JXTS"; // Hash Secret của bạn
const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const vnpReturnUrl = "http://localhost:3000/thanks";

const createVnpayHash = (params, secretKey) => {
  // Sắp xếp các tham số theo thứ tự alphabet, loại bỏ tham số rỗng
  const sortedKeys = Object.keys(params)
    .filter(
      (key) =>
        params[key] !== "" && params[key] !== null && params[key] !== undefined
    )
    .sort();

  // Tạo chuỗi query với các tham số được sắp xếp
  const queryString = sortedKeys
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");

  // Tạo hash sử dụng HMAC-SHA512
  const hmac = CryptoJS.HmacSHA512(queryString, secretKey);
  return hmac.toString(CryptoJS.enc.Hex);
};

const apiPayment = (amount) => {
  const date = new Date();

  const formattedDate = `${date.getFullYear()}${String(
    date.getMonth() + 1
  ).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}${String(
    date.getHours()
  ).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}${String(
    date.getSeconds()
  ).padStart(2, "0")}`;

  const createDate = formattedDate;
  const orderId = `${date.getTime()}`; // Mã đơn hàng duy nhất

  // Tạo các tham số yêu cầu
  const params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Amount: amount * 100, // Đơn vị: VND (nhân 100)
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: "Thanhtoandonhang",
    vnp_OrderType: "other",
    vnp_Locale: "vn",
    vnp_ReturnUrl: vnpReturnUrl,
    vnp_IpAddr: "127.0.0.1", // Giả định IP client
    vnp_CreateDate: createDate,
  };

  // Tạo chữ ký hash
  const secureHash = createVnpayHash(params, secretKey);

  // Thêm SecureHash vào params
  const paramsWithHash = {
    ...params,
    vnp_SecureHash: secureHash,
  };

  // Tạo URL thanh toán
  const queryString = Object.keys(paramsWithHash)
    .map((key) => `${key}=${encodeURIComponent(paramsWithHash[key])}`)
    .join("&");

  const paymentUrl = `${vnpUrl}?${queryString}`;
  return paymentUrl;
};

export default apiPayment;
