import React, { Component, useState, useEffect } from "react"
import  { Col, Container, Button, Form, Image, Row, Toast, OverlayTrigger, Popover } from 'react-bootstrap'
import { FaStar, FaArrowUp, FaArrowDown } from "react-icons/fa"
import { useParams } from "react-router-dom"
import axios from '../axios'

export default function FoodDetail(props) {
    const { id } = useParams()
    const [ food, setFood ] = useState(null)
    const [ quantity, setQuantity ] = useState(1)
    const [ showSuccess, setShowSuccess ] = useState(false)
    const shouldLogin = localStorage.getItem("token") == null

    useEffect(() => {
        axios
            .get('/api/food/' + id)
            .then(res => {
                setFood(res.data.food)
            })
            .catch(err => console.log(err))
    }, [id])

    const orderFood = (e) => {
        if (shouldLogin) {
            e.preventDefault()
            setShowSuccess(true)
        } else {
            e.preventDefault()
            const order = {
                foodId: id,
                quantity: quantity,
                userId: 1
            }
            console.log(order)
            setShowSuccess(true)
        }
    }

    const toast = shouldLogin ? (
        <Toast show={showSuccess} onClose={() => setShowSuccess(false)} delay="2000" autohide style={{ minWidth: "100%" }} className="bg-danger text-light">
            <Toast.Header className="bg-danger text-light">
                <h5 className="mr-auto">Bạn cần đăng nhập</h5>
            </Toast.Header>
            <Toast.Body>
                Bạn cần đăng nhập trước khi đặt hàng
            </Toast.Body>
        </Toast>
    ) : (
        <Toast show={showSuccess} onClose={() => setShowSuccess(false)} delay="2000" autohide style={{ minWidth: "100%" }} className="bg-warning text-dark">
            <Toast.Header className="bg-warning text-dark">
                <h5 className="mr-auto">Thành công</h5>
            </Toast.Header>
            <Toast.Body>
                Món ăn đã được thêm vào giỏ hàng
            </Toast.Body>
        </Toast>
    )

    const render = food ? (
        <div className="container my-3">
            <Container>
                {toast}
            </Container>
            <Image 
                className="my-3"
                style={{
                    objectFit: "cover",
                    width: "100%",
                }}
                src={food.imageUrl}
                onError={e => { e.target.onerror = null; e.target.src = process.env.PUBLIC_URL + '/image_not_found.png' } }
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
                            <Form inline="true">
                                <Form.Label>Số lượng</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    defaultValue="1" 
                                    min="1" 
                                    className="ml-2" 
                                    style={{ width: "50px" }}
                                    onChange={(e) => {
                                        e.preventDefault()
                                        const value = e.target.value
                                        setQuantity(value)
                                    }}/>
                            </Form>
                        </Row>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button 
                            className="align-self-center" 
                            variant="warning"
                            onClick={orderFood}
                        >
                            Đặt món
                        </Button>
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