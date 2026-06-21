import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const CardDashboard = (props) => {
    const { title, text, link, variant, buttonText } = props.element;
    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {text}
                </Card.Text>
                <Link to={link}>
                    <Button variant={props.element.variant}>
                        {buttonText}
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default CardDashboard