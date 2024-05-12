
import { Container, Row, Col, Card } from 'react-bootstrap';

export function Home() {
    
    const productImages = [
        "/images/car.jpg",
        "/images/mouse.jpg",
        "/images/banana.jpg",
        "/images/fish.jpg"
    ];

    return (
        <Container className="mt-5">
            <h1>Welcome to my store</h1>
            <p>Explore wide variety of products</p>
            <Row xs={1} md={2} lg={4} className="g-4">
                {productImages.map((imgSrc, index) => (
                    <Col key={index}>
                        <Card>
                            <Card.Img variant="top" style={{height:"200px", width:"100%",objectFit: "cover"}}src={imgSrc} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
