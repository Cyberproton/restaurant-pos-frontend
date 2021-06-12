import React, { Component, useState } from "react";
import FoodView from './FoodView'
import { Button, Modal, Table, Dropdown } from "react-bootstrap";
import axios from '../axios'

export default class CartManage extends Component {
  constructor(props) {
    super(props)
    this.onFoodViewClicked = this.onFoodViewClicked.bind(this)
    this.onFoodClicked = this.onFoodClicked.bind(this)
  }

  state = {
    foods: [],
    foodSelected: null,
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
    const selectedId = this.state.foodSelected
    const food = this.state.foods.find(x => x._id === selectedId)
    const foodView = food ? <FoodView key={this.state.foodSelected} food={food} onFoodViewClicked={this.onFoodViewClicked} /> : <div />

    return (
      <div className="container mt-3">
        {foodView}
        <FoodList foods={this.state.foods} onFoodClicked={this.onFoodClicked} />
        <div><hr /></div>
      </div>
    );
  }

  async getAllFoods() {
    const res = await axios.get('/api/food/')
    if (res.status / 100 === 2) {
      const foods = res.data.foods
      return foods
    }
    return []
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

}

function Example(props) {
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);

  const handleShow = () => setSmShow(true);
  const handleClose = () => setLgShow(false);
  const handleShow_Lg = () => setLgShow(true);
  const totalPrice = props.totalPrice;

  return (
    <div className="container">
      <div className="input-group mb-3 gx-1">
        <span className="input-group-text input-group-prepend">Tổng tiền</span>
        <input className="form-control" value={totalPrice + " VND"} disabled ></input>
      </div>
        <Dropdown style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Dropdown.Toggle variant="outline-primary">
            Thanh toán
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleShow_Lg}>Momo</Dropdown.Item>
            <Dropdown.Item onClick={handleShow_Lg}>Zalo Pay</Dropdown.Item>
            <Dropdown.Item onClick={handleShow_Lg}>Air Pay</Dropdown.Item>
            <Dropdown.Item onClick={handleShow_Lg}>ViettelPay</Dropdown.Item>
            <Dropdown.Item onClick={handleShow_Lg}>Thẻ ngân hàng</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleShow}>Tiền mặt</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title> Thanh toán </Modal.Title>
        </Modal.Header>
        <Modal.Body> Vui lòng thanh toán tại quầy thu ngân. </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Header>
          <Modal.Title> Thanh toán </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> Vui lòng mở ứng dụng của bạn lên và đưa cho thu ngân để thanh toán.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={creatBill,handleClose}>Đồng ý</Button>
          <Button variant="danger" onClick={handleClose}>Quay lại</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function creatBill(props) {
  const idBill = 'zz1';
  const isPayed = false;
  const totalPrice = props.totalPrice;
}

function FoodList(props) {
  const foods = props.foods;
  let total = 0;

  if (foods.length > 0) {
    const foodList = foods.map((value) => {
      return <FoodRow key={value._id} food={value} />
    })

    foods.map(food => {
      total += food.price
    })
    return (
      <div className="container">
        <h3>🛒 Giỏ hàng</h3><br/>
        <Table striped bordered hover size="sm" className="text-center shadow-lg">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên món ăn</th>
              <th>Giá</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>{foodList}</tbody>
        </Table>
        <Example totalPrice={total} />
      </div>
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
  }

  render() {
    const food = this.props.food

    return (
      <tr key={food._id} /*onClick={() => this.handleClick()}*/>
        <td width="6%"> # </td>
        <td>{food.name}</td>
        <td>{food.price}</td>
        <td width="10%">1</td>
      </tr >
    )
  }

}