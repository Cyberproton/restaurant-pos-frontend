import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import carousel1 from "../assets/carousel1.png";
import carousel2 from "../assets/carousel2.png";
import carousel3 from "../assets/carousel3.png";

class Introduce extends Component {
  state = {};
  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 img-carousel"
            src={carousel1}
            alt="First slide"
          />
          <Carousel.Caption className="caption-carousel">
            <h3>Chào mừng</h3>
            <p>Chào mừng bạn đến với nhà hàng số 1 tại Việt Nam</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-carousel"
            src={carousel2}
            alt="Second slide"
          />

          <Carousel.Caption className="caption-carousel">
            <h3>Điểm nổi bật</h3>
            <p>
              Những món ăn đến từ đa quốc gia với nhiều loại cho quý khách thỏa
              sức lựa chọn.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-carousel"
            src={carousel3}
            alt="Third slide"
          />

          <Carousel.Caption className="caption-carousel">
            <h3>Thành tựu</h3>
            <p>
              Là nhà hàng được đánh giá cao với tiêu chuẩn 5 sao. Chúng tôi tự
              tin đưa dến cho khách hàng hương vị suất sắc trong từng món ăn
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default Introduce;
