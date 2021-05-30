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
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-carousel"
            src={carousel2}
            alt="Second slide"
          />

          <Carousel.Caption className="caption-carousel">
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-carousel"
            src={carousel3}
            alt="Third slide"
          />

          <Carousel.Caption className="caption-carousel">
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default Introduce;
