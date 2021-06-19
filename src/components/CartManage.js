import React, { Component, useState } from "react";
import { Button, Modal, Table, Dropdown, Tabs, TabContent, Tab } from "react-bootstrap";
import axios from '../axios'

export default class CartManage extends Component {
  constructor(props) {
    super(props)
    this.onClickOrder = this.onClickOrder.bind(this)
    this.onPopup = this.onPopup.bind(this)
    this.onViewClicked = this.onViewClicked.bind(this)
  }

  state = {
    orders: [],
    orderSelected: null,
    isSelected: false,
    isPopup: false,
  }

  componentDidMount() {
    axios
      .get('/api/order')
      .then((res) => {
        const order = res.data.orders
        this.setState({
          orders: order
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    const order = this.state.orders.find(x => x._id === this.state.orderSelected)
    const removeOrder = (this.state.isPopup && order) ? this.getPopup(order, this.state.isPopup) : <div />
    return (
      <div className="container mt-3" size="sm">
        <h4><span role='img' aria-label='accessible-emoji'>🛒</span>Giỏ hàng </h4>
        <OrderViewer orders={this.state.orders} onClickOrder={this.onClickOrder} remove={order} onPopup={this.onPopup} />
        <hr />
        {removeOrder}
      </div>
    );
  }

  onViewClicked(OrderId, isSelected) {
    const selectedOrder = this.state.orderSelected
    if (isSelected) {
      selectedOrder.push(OrderId)
    }
    else {
      const i = selectedOrder.indexOf(OrderId)
      selectedOrder.splice(i, 1)
    }
    this.setState({
      selectedOrder: selectedOrder
    })
  }

  onClickOrder(OrderId) {
    if (OrderId === this.state.orderSelected) {
      this.setState({
        orderSelected: null,
        isPopup: false,
        isSelected: false,
      })
      return true
    }
    else {
      if (this.state.orderSelected === null) {
        this.setState({
          orderSelected: OrderId,
          isSelected: false,
          isPopup: false
        })
        return true
      }
    }
    return false
  }

  onPopup() {
    this.setState(prev => ({
      isPopup: !prev.isPopup
    }))
  }

  handleDelete(order) {
    order.state = 'Canceled'
    this.setState(prev => ({
      isPopup: !prev.isPopup,
    }))
  }

  getPopup(order, show) {
    return (
      <Modal
        show={show}
        onHide={this.onPopup}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-warning text-white">
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>Bạn chuẩn bị xóa đơn hàng:</b>
          <br />
          <p>
            Tên món ăn: {order.food.name} &nbsp; &nbsp; &nbsp;  &nbsp;
            Số lượng: {order.quantity}  <br />
            Tổng tiền: {order.food.price * order.quantity}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => { this.onPopup() }}> Đóng </Button>
          <Button variant="danger" onClick={() => { this.handleDelete(order) }}>
            Xóa món ăn
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

class OrderViewer extends Component {
  render() {
    const orders = this.props.orders
    const remove = this.props.remove
    const onClickOrder = this.props.onClickOrder
    const onPopup = this.props.onPopup
    if (orders.length === 0)
      return (
        <React.Fragment>
          <p>
            <i>Có vẻ không có gì ở đây cả, quý khách vui lòng kiểm tra lại nhé</i>
            <span role='img' aria-label='accessible-emoji'>🙄</span>
          </p>
          <br />
        </React.Fragment>
      )
    else {
      const listByPending = orders.map((value) => {
        if (value.state === 'Pending')
          return <TableRender
            key={value._id} order={value} onClickOrder={onClickOrder} />
        else return null
      })

      const listByAccept = orders.map((value) => {
        if (value.state === 'Accepted')
          return <TableRender
            key={value._id} order={value} onClickOrder={onClickOrder} />
        else return null
      })

      const listByReject = orders.map((value) => {
        if (value.state === 'Rejected')
          return <TableRender
            key={value._id} order={value} onClickOrder={onClickOrder} />
        else return null
      })

      let a = 0, b = 0, c = 0
      orders.map(order => {
        if (order.state === 'Accepted') a += 1
        if (order.state === 'Pending') b += 1
        if (order.state === 'Rejected') c += 1
        return null
      })
      return (
        <div width='100%'>
          <br />
          <Tabs defaultActiveKey="Confirmed" justify>
            <Tab eventKey="Confirmed" title="Đã xác nhận">
              <TabContent><TableView ListBy={listByAccept} control={a} /></TabContent>
              {remove ? <Button variant="danger" onClick={onPopup}>Xóa đơn hàng</Button> :
                <Button className="col m-2" variant="danger" disabled>Xóa đơn hàng</Button>}
              {console.log(remove)}
              <Popup />
            </Tab>
            <Tab eventKey="Confirming" title="Đang chờ xác nhận">
              <TabContent><TableView ListBy={listByPending} control={b} /></TabContent>
              {remove ? <Button variant="danger" onClick={onPopup}>Xóa đơn hàng</Button> : <Button className="col m-2" variant="danger" disabled>Xóa đơn hàng</Button>}
            </Tab>
            <Tab eventKey="Reject" title="Từ chối">
              <TabContent><TableView ListBy={listByReject} control={c} /></TabContent>
            </Tab>
          </Tabs>
        </div>
      )
    }
  }
}

class TableRender extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      isSelected: false
    }
  }

  render() {
    const order = this.props.order
    const buyer = order.buyer.substring(0, 5) + '[...]'
    const food = order.food
    const checkedRow = this.state.isSelected ? 'table-primary text-dark' : 'table-light text-dark'

    if (order.food === null)
      return null
    else return (
      <tr key={order._id} className={checkedRow} onClick={this.handleClick}>
        <td>{buyer}</td>
        <td>{food.name}</td>
        <td>{order.state}</td>
        <td>{order.quantity}</td>
        <td width="12%">{food.price * order.quantity}</td>
      </tr >
    )
  }

  handleClick() {
    const update = this.props.onClickOrder(this.props.order._id, this.state.isSelected);
    if (update){
      this.setState({
        isSelected: !this.state.isSelected
      })
    }
    console.log(this.state.isSelected)
  }
}

function TableView(props) {
  const control = props.control;
  if (control === 0)
    return (
      <React.Fragment>
        <p>
          <i>Có vẻ không có gì ở đây cả, quý khách vui lòng kiểm tra lại nhé</i>
          <span role='img' aria-label='accessible-emoji'>🙄</span>
        </p>
        <br />
      </React.Fragment>
    )
  else return (
    <Table striped bordered size="sm" className="text-center shadow-lg">
      <thead>
        <tr>
          <th>Khách hàng</th>
          <th>Tên món ăn</th>
          <th>State</th>
          <th>Số lượng</th>
          <th>Tổng tiền</th>
        </tr>
      </thead>
      <tbody>{props.ListBy}</tbody>
    </Table>
  )
}

function Popup() {
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);

  const handleShow = () => setSmShow(true);
  const handleClose = () => setLgShow(false);
  const handleShow_Lg = () => setLgShow(true);

  return (
    <div className="container">
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
        show={smShow}
        onHide={() => setSmShow(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title> Thanh toán </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <i>Vui lòng thanh toán tại quầy thu ngân. </i>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
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
          <Button variant="success" onClick={handleClose}>Đồng ý</Button>
          <Button variant="warning" onClick={handleClose}>Quay lại</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}