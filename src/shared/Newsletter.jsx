import React from "react";
import { Col, Container, Row } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";
import "./newsletter.css";

const NewsLetter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Đăng ký ngay để nhận thông tin hữu ích</h2>

              <div className="newsletter__input">
                <input type="email" placeholder="Nhập email của bạn" />
                <button className="btn newsletter__btn">Đăng ký</button>
              </div>
              <p>
                Hãy để lại email của bạn để không bỏ lỡ những ưu đãi hấp dẫn về
                giá vé tham quan thành phố bằng xe bus! Hệ thống của chúng tôi
                sẽ gửi đến bạn thông tin mới nhất về các chương trình khuyến
                mãi, giá vé ưu đãi và lịch trình độc quyền, giúp bạn khám phá
                thành phố một cách tiết kiệm và tiện lợi. Đăng ký ngay hôm nay
                để nhận những deal tốt nhất!
              </p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NewsLetter;
