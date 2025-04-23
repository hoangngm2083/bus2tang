import React from "react";
import { Col, Container, Row } from "reactstrap";
import experienceImg from "../assets/images/experience.png";
import helloImg1 from "../assets/images/hello1.png";
import helloImg2 from "../assets/images/hello2.png";
import helloImg3 from "../assets/images/hello3.png";
import worldImg from "../assets/images/world.png";
import "../styles/home.css";

import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Testimonials from "../components/Testimonial/Testimonials";
import NewsLetter from "../shared/Newsletter";
import Subtitle from "./../shared/subtitle";

const Home = () => {
  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Xe buýt 2 tầng"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Dịch vụ xe buýt <span className="hightlight"> 2 tầng</span>{" "}
                  Việt Nam
                </h1>
                <p>
                  Xe buýt 2 tầng Vietnam Sightseeing đưa du khách đi tham quan
                  quanh Hà Nội mỗi ngày. Đây lựa chọn xe buýt du lịch tốt nhất
                  trong thành phố và cho bạn biết các điểm dừng chính xác, tất
                  cả thời gian di chuyển và tất nhiên là giá vé tốt nhất. Chúng
                  tôi có mặt ở 5 tỉnh lớn của Việt Nam như Hà Nội, Hồ Chí Minh,
                  Quảng Ninh, Huế, Đà Lạt.
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box">
                <img src={helloImg1} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box hero__video-box mt-4">
                <img src={helloImg2} alt="" controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={helloImg3} alt="" />
              </div>
            </Col>

            {/* <SearchBar /> */}
          </Row>
        </Container>
      </section>
      {/* ============================================================== */}

      {/* ==================== HERO SECTION START ====================== */}
      {/* <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">What we serve</h5>
              <h2 className="services__title">We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section> */}

      {/* ========== FEATURED TOUR SECTION START ========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Khám phá"} />
              <h2 className="featured__tour-title">Thành phố của chúng ta</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/* ========== FEATURED TOUR SECTION END =========== */}

      {/* ========== EXPERIENCE SECTION START ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Trải nghiệm"} />
                <h2>Tận tâm phục vụ, hài lòng khách hàng</h2>
                <p>
                  Chúng tôi luôn đặt khách hàng làm trung tâm, phục vụ bằng sự
                  tận tâm và nhiệt huyết để mang lại trải nghiệm tốt nhất. Đội
                  ngũ của chúng tôi không chỉ chuyên nghiệp mà còn chu đáo, sẵn
                  sàng đáp ứng mọi nhu cầu của bạn với sự quan tâm đến từng chi
                  tiết. Sự hài lòng của khách hàng là thước đo thành công của
                  chúng tôi – hãy để chúng tôi đồng hành và vượt qua mong đợi
                  của bạn!
                </p>
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successful trip</h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Regular clients</h6>
                </div>
                <div className="counter__box">
                  <span>15</span>
                  <h6>Year experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ========== EXPERIENCE SECTION END ============== */}

      {/* ========== GALLERY SECTION START ============== */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Ảnh thành phố"} />
              <h2 className="gallery__title">Một số ảnh về thành phố</h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ========== GALLERY SECTION END ================ */}

      {/* ========== TESTIMONIAL SECTION START ================ */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Đánh giá của khách hàng"} />
              <h2 className="testimonial__title">
                Những gì khách hàng nói về chúng tôi{" "}
              </h2>
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ========== TESTIMONIAL SECTION END ================== */}
      <NewsLetter />
    </>
  );
};

export default Home;
