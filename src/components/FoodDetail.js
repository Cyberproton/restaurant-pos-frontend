import React, { Component, useState, useEffect } from "react"
import  { Col, Container, Button, Form, Image, Row } from 'react-bootstrap'
import { FaStar, FaArrowUp, FaArrowDown } from "react-icons/fa"
import { useParams } from "react-router-dom"
import axios from '../axios'

export default function FoodDetail(props) {
    const { id } = useParams()
    const [ food, setFood ] = useState(null)
    const [ quantity, setQuantity ] = useState(1)

    useEffect(() => {
        axios
            .get('/api/food/' + id)
            .then(res => {
                setFood(res.data.food)
            })
            .catch(err => console.log(err))
    }, [id])

    const render = food ? (
        <div className="container my-3">
            <Image 
                className="my-3"
                style={{
                    objectFit: "cover",
                    width: "100%",
                }}
                src={process.env.PUBLIC_URL + '/image_not_found.png'} fluid
            />
            <Container>
                <Row className="my-2 justify-content-center">
                    <h3>{food.name}</h3>
                </Row>
                <Row>
                    <Col>
                        <Row className="d-flex my-2 ml-1">
                            <p className="align-self-center">
                                Đánh giá 
                                <FaStar className="ml-3"/>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </p>
                        </Row>
                        <Row className="my-2 ml-1 d-flex">
                            <p className="align-self-center">Giá: <b>{food.price + 'đ'}</b></p>
                        </Row>
                        <Row className="d-flex my-2 ml-1 align-items-center">
                            <span className="align-middle">Số lượng:</span>
                            <Form inline="true">
                                <Button variant="outline-secondary" size="sm"><FaArrowUp/></Button>
                                <Form.Control type="number" defaultValue="1"/>
                                <Button variant="outline-secondary" size="sm"><FaArrowDown/></Button>
                            </Form>
                        </Row>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button className="align-self-center" variant="warning">Đặt món</Button>
                    </Col>
                </Row>
            </Container>
            <hr/>
            <div>
                <h4 className="my-4">Miêu tả món ăn</h4>
                <p className="my-3">
                    {food.description}
                </p>
            </div>
            <hr/>
            <div>
                <h4 className="my-4">Đánh giá món ăn</h4>
                <p className="my-3">
                    Chưa có đánh giá
                </p>
            </div>
        </div>
    ) : <div/>

    return render
}