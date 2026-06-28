import React from 'react'
import { Card } from 'react-bootstrap'

const CardInfoDetalle = ({ headerColor, titulo, datos }) => {
    return (
        <Card className="shadow-sm border-0 rounded-4 h-100">
            <Card.Header className={`${headerColor} text-white fw-semibold`}>
                {titulo}
            </Card.Header>
            <Card.Body>
                {datos.map((dato, index) => (
                    <div key={index}>
                        <div className="mb-3">
                            <small className="text-muted text-uppercase">
                                {dato.label}
                            </small>

                            <div>{dato.valor}</div>
                        </div>

                        {index < datos.length - 1 && <hr />}
                    </div>
                ))}
            </Card.Body>
        </Card>
    )
}

export default CardInfoDetalle