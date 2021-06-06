import React, { Component } from "react"
import { Button, Card, CardDeck, Container, Dropdown, DropdownButton } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from '../axios'

export default class FoodMenu extends Component {
    state = {
        foods: []
    }

    componentDidMount() {
        axios
            .get('/api/food')
            .then((res) => {
                const foods = res.data.foods
                this.setState({
                    foods: foods
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return <FoodDeck foods={this.state.foods}/>
    }
}

function FoodDeck(props) {
    const foods = props.foods
    const foodViews = foods.map((food, index) => {
        return (
            <FoodView className="col-auto m-1" key={index} food={food} />
        )
    })
    return (
        <Container>
            <CardDeck className="row justify-content-around mt-3">{foodViews}</CardDeck>
        </Container>
    )
}

class FoodView extends Component {
    constructor(props) {
        super(props)
        this.handleImageError = this.handleImageError.bind(this)
    }

    state = {
        isSelected: false,
        imageError: true,
    }

    handleClick = (e) => {
    }

    handleImageError() {
        this.setState(prev => ({ imageError: true }))
    }

    render() {
        const isSelected = this.state.isSelected
        const food = this.props.food
        const bgcolor = isSelected? 'success' : 'light'
        const textColor = isSelected ? 'light' : 'dark'
        const borderColor = isSelected ? 'success' : ''

        let description = food.description ? food.description : 'Không có mô tả'
        if (description.length > 50) {
            description = description.substring(0, 50) + '...'
        }

        return (
            <Card
                as={Link}
                to={`food/${food._id}`}
                style={{ width: "12rem", textDecoration: 'none' }}
                bg={bgcolor}
                text={textColor}
                border={borderColor}
                className="mb-3"
            >
                <Card.Header 
                    as="h5"
                    className="text-center bg-light text-dark"
                >
                    {food.name}
                </Card.Header>
                <Card.Img
                    variant="top"
                    style={{
                        height: "25vw",
                        objectFit: "cover",
                        width: "100%",
                    }}
                    src={this.state.imageError ? process.env.PUBLIC_URL + '/image_not_found.png' : food.image_url}
                    onError={this.handleImageError}
                />
                <Card.Body>
                    <Card.Text>
                        Giá: <b>{food.price}đ</b>
                    </Card.Text>
                    <Card.Text className="justify-content-center">{description}</Card.Text>
                </Card.Body>
                <Card.Footer className="bg-light">
                    <div className="d-grid">
                        <Button variant="warning" block>Đặt món</Button>
                    </div>
                </Card.Footer>
            </Card>
        )
    }
}
