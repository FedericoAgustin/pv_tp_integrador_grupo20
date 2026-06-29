import React, { useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import clientesServices from '../../service/clientesServices';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useClientes } from "../../context/ClienteContext"

const FormAltaCliente = () => {
    const { agregarCliente } = useClientes();
    const navigate = useNavigate();
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("success");
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente((prev) => {
            if (name === "firstname" || name === "lastname") {
                return {
                    ...prev,
                    name: {
                        ...prev.name,
                        [name]: value,
                    },
                };
            }
            if (["city", "street", "number", "zipcode"].includes(name)) {
                return {
                    ...prev,
                    address: {
                        ...prev.address,
                        [name]: value,
                    },
                };
            }
            if (name === "lat" || name === "lng") {
                return {
                    ...prev,
                    address: {
                        ...prev.address,
                        geolocation: {
                            ...prev.address.geolocation,
                            [name === "lng" ? "long" : "lat"]: value,
                        },
                    },
                };
            }
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await agregarCliente(cliente);
            setTipoMensaje("success");
            setMensaje(`Cliente creado correctamente. ID asignado: ${respuesta.id}. Redirigiendo...`);
            setCliente(clienteDeInicio);
            setErrores({});
            setTimeout(() => {
                navigate("/clientes");
            }, 2000);
        } catch (error) {
            setTipoMensaje("danger");
            setMensaje(error.message || "Ocurrió un error al crear el cliente.");
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
                {mensaje && (
                    <Alert variant="info" className="mt-3">{mensaje}</Alert>
                )}
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <h5 className="text-primary mb-3">Datos personales</h5>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" name="firstname" value={cliente.name.firstname} onChange={handleChange} placeholder="Ingrese el nombre" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control type="text" name="lastname" value={cliente.name.lastname} onChange={handleChange} placeholder="Ingrese el apellido" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={cliente.email} onChange={handleChange} placeholder="ejemplo@email.com" />
                        </Form.Group>
                        <hr />
                        <h5 className="text-primary mb-3">Cuenta</h5>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control type="text" name="username" value={cliente.username} onChange={handleChange} placeholder="Usuario" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" name="password" value={cliente.password} onChange={handleChange} placeholder="********" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr />
                        <h5 className="text-primary mb-3">Contacto</h5>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control type="text" name="phone" value={cliente.phone} onChange={handleChange} placeholder="11 1234-5678" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ciudad</Form.Label>
                                    <Form.Control type="text" name="city" value={cliente.address.city} onChange={handleChange} placeholder="Ciudad" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr />
                        <h5 className="text-primary mb-3">Dirección</h5>
                        <Row>
                            <Col md={8}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Calle</Form.Label>
                                    <Form.Control type="text" name="street" value={cliente.address.street} onChange={handleChange} placeholder="Nombre de la calle" />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Número</Form.Label>
                                    <Form.Control type="number" name="number" value={cliente.address.number} onChange={handleChange} placeholder="1234" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Código Postal</Form.Label>
                                    <Form.Control type="text" name="zipcode" value={cliente.address.zipcode} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Latitud</Form.Label>
                                    <Form.Control type="text" name="lat" value={cliente.address.geolocation.lat} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Longitud</Form.Label>
                                    <Form.Control type="text" name="lng" value={cliente.address.geolocation.long} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
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