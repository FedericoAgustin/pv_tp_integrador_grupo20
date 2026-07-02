import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const CardDashboard = (props) => {
    const { title, text, link, variant, buttonText } = props.element;
    return (
        <Card className="shadow border-0">
            <Card.Header className="bg-primary text-white text-center">
                <h5 className="mb-0">{title}</h5>
            </Card.Header>

            <Card.Body className="d-flex flex-column text-center">
                <Card.Text className="text-muted mb-4">
                    {text}
                </Card.Text>

                <Link to={link} className="mt-auto">
                    <Button
                        variant={variant}
                        className="w-100"
                    >
                        {buttonText}
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default CardDashboard