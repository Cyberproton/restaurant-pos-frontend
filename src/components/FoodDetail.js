import React, { Component, useState, useEffect } from "react"
import  { Button, Image } from 'react-bootstrap'
import { FaStar } from "react-icons/fa"
import { useParams } from "react-router-dom"
import axios from '../axios'

export default function FoodDetail(props) {
    const { id } = useParams()
    const [ food, setFood ] = useState(null)

    useEffect(() => {
        axios
            .get('/api/food/' + id)
            .then(res => {
                setFood(res.data.food)
            })
            .catch(err => console.log(err))
    }, [id])

    console.log(food)

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
            <div className="row">
                <div className="col">
                    <h3 className="my-2">{food.name}</h3>
                    <p className="my-3">
                        Giá: <b>{food.price + 'đ'}</b>
                    </p>
                    <p className="my-3">
                        Đánh giá 
                        <FaStar className="ml-3"/>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </p>
                </div>
                <div className="col  align-self-center align-self-end">
                    <div className="align-self-center">
                        <Button className="ml-5" variant="warning">Đặt món</Button>
                    </div>
                </div>
            </div>
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