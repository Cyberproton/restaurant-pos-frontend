import { Button, Container, Col, Row, InputGroup, FormControl } from "react-bootstrap";

export default function CartItem(props) {
    const food = props.food;
    const quantity = props.quantity;
    return (
        <Container fluid={true} className="shadow-lg py-2" style={{ fontSize: "11pt" }}>
            <Row>
                <Col className="mr-2" xs sm md={3}>
                    <img src={food.imageUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt=""/>
                </Col>
                <Col xs sm>
                    <Row className="row-cols-1 row-cols-sm-1 row-cols-md-3" style={{ height: "100%" }}>
                        <Col className="my-1 d-flex align-items-center" style={{ fontSize: "12pt" }}>
                            {food.name}
                        </Col>
                        <Col className="my-1 d-flex align-items-center">
                            <strong>{food.price}đ</strong>
                        </Col>
                        <Col className="my-1 d-flex align-items-center">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Button variant="outline-dark">-</Button>
                                </InputGroup.Prepend>
                                <FormControl value={quantity} type="number" readOnly/>
                                <InputGroup.Append>
                                    <Button variant="outline-dark">+</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};