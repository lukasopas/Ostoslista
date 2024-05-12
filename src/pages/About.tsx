import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

export function About() {

    const productImages = [
        "/images/hymiö.jpg"
        
    ];

    const [formData, setFormData] = useState({
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        alert('Your message has been sent! We will get back to you shortly.');
        setFormData({ message: '' }); 
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">About Us</h1>
            <p className="text-center">We currently have nothing to say about the page other than it is made using React and TypeScript.</p>
            <Row className="justify-content-center">
                {productImages.map((imgSrc, index) => (
                    <Col key={index} xs={6} md={4} lg={3}>
                        <Card>
                            <Card.Img variant="top" src={imgSrc} />
                        </Card>
                    </Col>
                ))}
            </Row>
            <p className="text-center">If you have some question you can send message!</p>
            
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Type your message here"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Send Message</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
