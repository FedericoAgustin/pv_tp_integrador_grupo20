return (

    <Container className="mt-5" style={{ maxWidth: "600px" }}>
        <Card className="shadow-sm p-4 border border-2 border-secondary">
            <h2>Alta de Cliente</h2>
            <Form onSubmit={handleSubmit}>
                {/* NOMBRE DEL CLIENTE */}
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>

                    <Form.Control
                        type="text"
                        name="firstname"
                        value={cliente.name.firstname}
                        onChange={handleChange}
                        isInvalid={errores.firstname ? true : false}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errores.firstname}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* APELLIDO DEL CLIENTE */}
                <Form.Group className="mb-3">
                    <Form.Label>Apellido</Form.Label>

                    <Form.Control
                        type="text"
                        name="lastname"
                        value={cliente.name.lastname}
                        onChange={handleChange}
                        isInvalid={errores.lastname ? true : false}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errores.lastname}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* EMAIL DEL CLIENTE */}
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>

                    <Form.Control
                        type="email"
                        name="email"
                        value={cliente.email}
                        onChange={handleChange}
                        isInvalid={errores.email ? true : false}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errores.email}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Usuario y contraseña del cliente */}
                <Form.Group className="mb-3">
                    <Form.Label>Usuario</Form.Label>

                    <Form.Control
                        type="text"
                        name="username"
                        value={cliente.username}
                        onChange={handleChange}
                        isInvalid={errores.username ? true : false}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.username}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>

                    <Form.Control
                        type="text"
                        name="password"
                        value={cliente.password}
                        onChange={handleChange}
                        isInvalid={errores.password ? true : false}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.password}
                    </Form.Control.Feedback>
                </Form.Group>



                {/* TELEFONO DEL CLIENTE */}

                <Form.Group className="mb-3">
                    <Form.Label>Telefono</Form.Label>

                    <Form.Control
                        type="text"
                        name="phone"
                        value={cliente.phone}
                        onChange={handleChange}
                        isInvalid={errores.phone ? true : false}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.phone}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* CIUDAD DEL CLIENTE */}
                <Form.Group className="mb-3">
                    <Form.Label>Ciudad</Form.Label>

                    <Form.Control
                        type="text"
                        name="city"
                        value={cliente.address.city}
                        onChange={handleChange}
                        isInvalid={errores.city ? true : false}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errores.city}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* CALLE DEL CLIENTE */}
                <Form.Group className="mb-3">
                    <Form.Label>Calle</Form.Label>

                    <Form.Control
                        type="text"
                        name="street"
                        value={cliente.address.street}
                        onChange={handleChange}
                        isInvalid={errores.street ? true : false}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errores.street}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* NÚMERO */}
                <Form.Group className="mb-3">
                    <Form.Label>Número</Form.Label>

                    <Form.Control
                        type="number"
                        name="number"
                        value={cliente.address.number}
                        onChange={handleChange}
                        isInvalid={errores.number ? true : false}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errores.number}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* CÓDIGO POSTAL */}
                <Form.Group className="mb-3">
                    <Form.Label>Código Postal</Form.Label>

                    <Form.Control
                        type="text"
                        name="zipcode"
                        value={cliente.address.zipcode}
                        onChange={handleChange}
                        isInvalid={errores.zipcode ? true : false}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errores.zipcode}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* LATITUD */}
                <Form.Group className="mb-3">
                    <Form.Label>Latitud</Form.Label>

                    <Form.Control
                        type="text"
                        name="lat"
                        value={cliente.address.geolocation.lat}
                        onChange={handleChange}
                        isInvalid={errores.lat ? true : false}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errores.lat}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* LONGITUD */}
                <Form.Group className="mb-3">
                    <Form.Label>Longitud</Form.Label>

                    <Form.Control
                        type="text"
                        name="lng"
                        value={cliente.address.geolocation.lng}
                        onChange={handleChange}
                        isInvalid={errores.lng ? true : false}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errores.lng}
                    </Form.Control.Feedback>
                </Form.Group>

                {mensaje && <Alert variant="info">{mensaje}</Alert>}

                <Button type="submit" variant="primary" className="w-100">
                    Guardar Cliente
                </Button>

            </Form>
        </Card>
    </Container>
)


}
export default AltaCliente
