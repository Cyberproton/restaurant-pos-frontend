import React, { Component } from "react"
import { Button, Card, CardDeck, Container, Dropdown, DropdownButton, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from '../axios'
import Search from "./Search"
import SearchBar from "./SearchBar"
import { replaceLatinDiacritics } from "../untils/functions"

export default class FoodMenu extends Component {
    constructor(props) {
        super(props);
        this.onFoodSearch = this.onFoodSearch.bind(this);
    }

    state = {
        foods: [],
        foodSearch: ""
    };

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
            });
    }

    onFoodSearch(event) {
        let s = event.target.value;
        if (s) {
            s = s.trim();
        }
        this.setState({
            foodSearch: s
        });
    }

    render() {
        const foodSearch = replaceLatinDiacritics(this.state.foodSearch.toLowerCase());
        const foodViews = this.state.foods.filter(food => replaceLatinDiacritics(food.name.toLowerCase()).includes(foodSearch)).map((food, index) => {
            return (
                <FoodView className="col-auto" key={index} food={food} />
            );
        });

        return (
            <Container>
                <Search onFoodSearch={this.onFoodSearch}/>
                <Row className="row row-cols-2 mt-3">{foodViews}</Row>
            </Container>
        );
    }
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
        const bgcolor = isSelected ? 'success' : 'light'
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
                style={{ width: "50%", textDecoration: 'none' }}
                bg={bgcolor}
                text={textColor}
                border={borderColor}
                className="col mb-3"
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
                    src={food.imageUrl}
                    onError={e => { e.target.onerror = null; e.target.src = process.env.PUBLIC_URL + '/image_not_found.png' }}
                />
                <Card.Body>
                    <Card.Text>
                        Giá: <b>{food.price}đ</b>
                    </Card.Text>
                    <Card.Text className="justify-content-center">{description}</Card.Text>
                </Card.Body>
                <Card.Footer className="bg-light">
                    <div className="d-grid">
                        <Button variant="warning" block>Xem ngay</Button>
                    </div>
                </Card.Footer>
            </Card>
        )
    }
}
