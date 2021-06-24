import React, { Component } from "react";
import { Container } from "react-bootstrap";

export default class CartNew extends Component {
    constructor(props) {
        super(props);
        const items = props.items ? props.items : [];
        this.state = {
            items: items
        };
    }

    render() {
        return (
            <Container>
                
            </Container>
        ); 
    }
}