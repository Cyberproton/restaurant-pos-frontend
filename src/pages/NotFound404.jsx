import { Container, Row } from "react-bootstrap"

export default function NotFound404(props) {
    return (
        <Container className="my-5">
            <Row className="d-flex justify-content-center" style={{ fontSize: "64pt" }}>
                <p>404</p>
            </Row>
            <Row className="d-flex justify-content-center">
                <h4>Không thể tìm thấy trang</h4>
            </Row>
        </Container>  
    );
}