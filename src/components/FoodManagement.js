import React, { Component, useEffect, useState } from "react";
import FoodView from './FoodView'
import { Button, CardDeck, Form, Modal, Table } from "react-bootstrap";

export default class FoodManagement extends Component {
    constructor(props) {
        super(props)
        this.onFoodViewClicked = this.onFoodViewClicked.bind(this)
        this.onFoodClicked = this.onFoodClicked.bind(this)
        this.onAddFoodFormEnable = this.onAddFoodFormEnable.bind(this)
        this.onEditFoodFormOpened = this.onEditFoodFormOpened.bind(this)
        this.onDeleteFoodConfirmation = this.onDeleteFoodConfirmation.bind(this)
    }

    state = {
        foods: [
            {
                _id: 1,
                imageUrl: '',
                description: 'dfdfdgsngngimromkbfmkgmkmgkfmgkfmgkmkmfgkmgkfmgkmgfkmg \
                fgfgfdgdfgdgdfgdfgfdgfdggggggdfgfgfgfgfdgfgf gjfngjnnjnjnjnnjnjminmim',
                name: "Good food",
                price: 1000,
            },
            {
                _id: 2,
                category: 'Test2',
                name: "Good food 2",
                imageUrl: '',
                description: 'dfdfdgsngngimromkbfmkgmkmgkfmgkfmgkmkmfgkmgkfmgkmgfkmg \
                fgfgfdgdfgdgdfgdfgfdgfdggggggdfgfgfgfgfdgfgf gjfngjnnjnjnjnnjnjminmim',
                price: 2000,
            },
            {
                _id: 3,
                category: 'Test2',
                name: "Good food 2",
                imageUrl: '',
                description: 'dfdfdgsngngimromkbfmkgmkmgkfmgkfmgkmkmfgkmgkfmgkmgfkmg \
                fgfgfdgdfgdgdfgdfgfdgfdggggggdfgfgfgfgfdgfgf gjfngjnnjnjnjnnjnjminmim',
                price: 2000,
            }
        ],
        foodSelected: null,
        isShowingAddFoodForm: false,
        isShowingEditFoodForm: false,
        isShowingDeleteConfirmation: false
    }

    async componentDidMount() {

    }

    render() {
        const selectedId = this.state.foodSelected
        const food = this.state.foods.find(x => x._id === selectedId)
        const addForm = this.state.isShowingAddFoodForm ? this.getAddFoodForm() : <div />
        const editForm = this.state.isShowingEditFoodForm && food ? this.getEditFoodForm(food) : <div />
        const deleteConfirmation = this.state.isShowingDeleteConfirmation && food ? this.getFoodDeleteConfirmationModal(food, this.state.isShowingDeleteConfirmation) : <div />
        const foodView = food ? <FoodView key={this.state.foodSelected} food={food} onFoodViewClicked={this.onFoodViewClicked}/> : <div />
        return (
            <div className="container">
                {foodView}
                <h3>🍽 Food List</h3>
                <FoodList foods={this.state.foods} onFoodClicked={this.onFoodClicked}/>
                <div className="container px-1">
                    <div className="row gx-1">
                        <Button className="col m-2" onClick={this.onAddFoodFormEnable}>Thêm món</Button>
                        { food ? <Button className="col m-2" onClick={this.onEditFoodFormOpened}>Sửa món</Button> : <Button className="col m-2" disabled>Sửa món</Button> }
                        { food ? <Button className="col m-2" variant="danger" onClick={this.onDeleteFoodConfirmation}>Xóa món</Button> : <Button className="col m-2" variant="danger" disabled>Xóa món</Button>}
                    </div>
                </div>
                <hr />
                {addForm}
                {editForm}
                {deleteConfirmation}
            </div>
        );
    }

    async getAllFoods() {

    }

    async addFood(food) {
        
    }

    onFoodViewClicked(foodId, isSelected) {
        const foodSelected = this.state.foodSelected
        if (isSelected) {
            foodSelected.push(foodId)
        } else {
            const i = foodSelected.indexOf(foodId)
            foodSelected.splice(i, 1)
        }
        this.setState(prev => ({
            foodSelected: foodSelected
        }))
    }

    onFoodClicked(foodId, isSelected) {
        let fid = foodId
        if (foodId === this.state.foodSelected) {
            this.setState(prev => ({
                foodSelected: null,
                isShowingAddFoodForm: false,
                isShowingEditFoodForm: false
            }))
            return true
        } else {
            if (this.state.foodSelected === null) {
                this.setState(prev => ({
                    foodSelected: foodId,
                    isShowingAddFoodForm: false,
                    isShowingEditFoodForm: false
                }))
                return true
            }
        }
        return false 
    } 

    onAddFoodFormEnable() {
        this.setState(prev => ({
            isShowingAddFoodForm: !prev.isShowingAddFoodForm,
            isShowingEditFoodForm: false,
            isShowingDeleteConfirmation: false,
        }))
    }

    getAddFoodForm() {
        return (
            <div className="container border border-primary">
                <h5 className="m-3">+ Thêm món ăn</h5>
                <Form className="m-2">
                    <Form.Group className="mb-3" controlId="formFoodName">
                        <Form.Label>Tên món ăn</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên món ăn" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.File id="formFoodImage" label="Hình ảnh món ăn" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formFoodDescription">
                        <Form.Label>Mô tả món ăn</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Nhập mô tả món ăn" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Xác nhận
                    </Button>
                </Form>
            </div>
        )
    }

    onEditFoodFormOpened() {
        this.setState(prev => ({
            isShowingAddFoodForm: false,
            isShowingDeleteConfirmation: false,
            isShowingEditFoodForm: !prev.isShowingEditFoodForm
        }))
    }

    getEditFoodForm(food) {
        return (
            <div className="container border border-primary">
                <h5 className="m-3">= Sửa món ăn</h5>
                <Form className="m-2">
                    <Form.Group className="mb-3" controlId="formFoodName">
                        <Form.Label>Tên món ăn</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên món ăn" defaultValue={food.name}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.File id="formFoodImage" label="Hình ảnh món ăn" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formFoodDescription">
                        <Form.Label>Mô tả món ăn</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Nhập mô tả món ăn" defaultValue={food.description}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }

    onDeleteFoodConfirmation() {
        this.setState(prev => ({
            isShowingAddFoodForm: false,
            isShowingEditFoodForm: false,
            isShowingDeleteConfirmation: !prev.isShowingDeleteConfirmation,
        }))
    }

    getFoodDeleteConfirmationModal(food, show) {
        return (
            <Modal 
                show={show} 
                onHide={this.onDeleteFoodConfirmation} 
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="bg-danger text-white">
                <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <b>Bạn chuẩn bị xóa món ăn sau:</b>
                    <hr/>
                    <p>ID: {food._id}</p>
                    <p>Tên: {food.name}</p>
                    <p>Giá: {food.price}</p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.onDeleteFoodConfirmation}>
                    Đóng
                </Button>
                <Button variant="danger">
                    Xóa món ăn
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

function FoodList(props) {
    const foods = props.foods;
  
    if (foods.length > 0) {
        const foodList = foods.map((value, index) => {
            return <FoodRow key={value._id} food={value} onFoodClicked={props.onFoodClicked}/>
        })
  
        return (
            <Table striped bordered hover size="sm" className="text-center shadow-lg">
            <thead>
                <tr>
                    <th>Chọn</th>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Giá</th>
                </tr>
            </thead>
            <tbody>{foodList}</tbody>
            </Table>
        )
    } else {
        return (
            <React.Fragment>
                <div>Có vẻ không có món nào cả!</div>
                <br />
            </React.Fragment>
        )
    }
}

class FoodRow extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    state = {
        isSelected: false
    }

    render() {
        const food = this.props.food
        const isSelected = this.state.isSelected
        const checkedColumn = isSelected ? '✓' : ''
        const checkedRow = isSelected ? 'table-dark text-light' : 'table-light text-dark'

        return (
            <tr className={checkedRow} key={food._id} onClick={() => this.handleClick()}>
                <td width="10%">{checkedColumn}</td>
                <td>{food._id}</td>
                <td>{food.name}</td>
                <td>{food.price}</td>
            </tr>
        )
    }

    handleClick() {
        const shouldUpdate = this.props.onFoodClicked(this.props.food._id, this.state.isSelected)
        if (shouldUpdate) {
            this.setState(prev => ({
                isSelected: !this.state.isSelected
            }))
        }
    }
} 