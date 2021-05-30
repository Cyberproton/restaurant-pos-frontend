import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

class CardFood extends Component {
  state = {};
  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>{this.props.description} </Card.Text>
          <Button variant="primary">Add to Cart</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default CardFood;
