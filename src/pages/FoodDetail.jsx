import React, { useState, useEffect } from "react";
import { Col, Container, Button, Form, Image, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "../axios";

export default function FoodDetail(props) {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get("/api/food/" + id)
      .then((res) => {
        setFood(res.data.food);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const orderFood = (e) => {
    e.preventDefault();
    let item = {
      amount: parseInt(quantity),
      _id: food._id,
      name: food.name,
      price: food.price,
    };
    props.onInc(item);
  };

  const render = food ? (
    <div className="margin-top-50 container">
      <Image
        className="my-3"
        style={{
          objectFit: "cover",
          width: "100%",
        }}
        src={food.imageUrl}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = process.env.PUBLIC_URL + "/image_not_found.png";
        }}
        fluid
      />
      <Container>
        <Row className="my-2 justify-content-center">
          <h3>{food.name}</h3>
        </Row>
        <Row>
          <Col xs={8}>
            <Row className="d-flex my-2 ml-1">
              <p className="align-self-center">
                Đánh giá
                <FaStar className="ml-3" />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </p>
            </Row>
            <Row className="my-2 ml-1 d-flex">
              <p className="align-self-center">
                Giá: <b>{food.price + "đ"}</b>
              </p>
            </Row>
            <Row className="d-flex my-2 ml-1 align-items-center">
              <Form inline="true">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue="1"
                  min="1"
                  className="ml-2"
                  style={{ width: "50px" }}
                  onChange={(e) => {
                    e.preventDefault();
                    const value = e.target.value;
                    setQuantity(value);
                  }}
                />
              </Form>
            </Row>
          </Col>
          <Col className="d-flex justify-content-end">
            {!food.lock && (
              <Button
                className="align-self-center"
                variant="warning"
                onClick={orderFood}
              >
                Đặt
              </Button>
            )}
          </Col>
        </Row>
      </Container>
      <hr />
      <div className="container my-4">
        <h4 className="my-4">Miêu tả món ăn</h4>
        <p className="my-3">{food.description}</p>
      </div>
      <hr />
      <div className="container my-4">
        <h4 className="my-4">Đánh giá món ăn</h4>
        <p className="my-3">Chưa có đánh giá</p>
      </div>
    </div>
  ) : (
    <div />
  );

  return render;
}
