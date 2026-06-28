import React, { useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import clientesServices from '../../service/clientesServices';
import { Link } from 'react-router-dom';

const FormAltaCliente = () => {
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState("");
    // este es el objeto que se va a mandar cuando hagamos el post, tiene que tener la misma estructura que los objetos que estan en la api
    const clienteDeInicio = {
        email: "",
        username: "",
        password: "",
        phone: "",
        name: {
            firstname: "",
            lastname: "",
        },
        address: {
            city: "",
            street: "",
            number: "",
            zipcode: "",
            geolocation: {
                lat: "",
                long: "",
            },
        },
    };
    const [cliente, setCliente] = useState(clienteDeInicio);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await clientesServices.agregarCliente(cliente);
            setMensaje(`Cliente creado correctamente. ID: ${respuesta.id}`);
            setCliente(clienteDeInicio);
            setErrores({});

        } catch (error) {
            setMensaje(error.message);
        }
    };
    return (
        <Container className="py-5">
            <Card className="shadow-lg border-0 rounded-4">
                <Card.Header className="bg-primary text-white py-3 px-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="mb-0 fw-bold">Alta de Cliente</h3>
                        <Link to="/dashboard">
                            <Button variant="light"><strong>Volver a las opciones</strong></Button>
                        </Link>
                    </div>
                </Card.Header>
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <h5 className="text-primary mb-3">Datos personales</h5>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" name="firstname" placeholder="Ingrese el nombre" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control type="text" name="lastname" placeholder="Ingrese el apellido" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="ejemplo@email.com" />
                        </Form.Group>
                        <hr />
                        <h5 className="text-primary mb-3">Cuenta</h5>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control type="text" name="username" placeholder="Usuario" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="********" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr />
                        <h5 className="text-primary mb-3">Contacto</h5>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control type="text" name="phone" placeholder="11 1234-5678" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ciudad</Form.Label>
                                    <Form.Control type="text" name="city" placeholder="Ciudad" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr />
                        <h5 className="text-primary mb-3">Dirección</h5>
                        <Row>
                            <Col md={8}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Calle</Form.Label>
                                    <Form.Control type="text" name="street" placeholder="Nombre de la calle" />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Número</Form.Label>
                                    <Form.Control type="number" name="number" placeholder="1234" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Código Postal</Form.Label>
                                    <Form.Control type="text" name="zipcode" />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Latitud</Form.Label>
                                    <Form.Control type="text" name="lat" />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Longitud</Form.Label>
                                    <Form.Control type="text" name="lng" />
                                </Form.Group>
                            </Col>
                        </Row>
                        {mensaje && (
                            <Alert variant="info" className="mt-3">{mensaje}</Alert>
                        )}
                        <div className="text-center mt-4">
                            <Button type="submit" variant="success" className="px-5 rounded-3"><strong>Guardar Cliente</strong></Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default FormAltaCliente