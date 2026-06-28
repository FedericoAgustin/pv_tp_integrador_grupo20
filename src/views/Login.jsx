import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { Container, Card, Form, Button } from "react-bootstrap";
import { validarInicio } from "../components/validaciones/validarInicio";

const Login = () => {
  const [nombre, setNombre] = useState("");
  const [sector, setSector] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState({});
  const { iniciarSesion } = useAdmin();
  const navigate = useNavigate();

  const manejarSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validarInicio({ nombre, password });
    setErrores(erroresValidacion);
    if (Object.keys(erroresValidacion).length > 0) return;

    iniciarSesion(nombre, sector);
    navigate("/dashboard");
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <Card className="shadow-sm p-4 border border-2 border-secondary">
        <h2>Iniciar Sesión</h2>
        <Form onSubmit={manejarSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Administrador</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              isInvalid={errores.nombre ? true : false}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errores.nombre}
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Sector</Form.Label>
            <Form.Select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              required
            >
              <option value="" disabled>Seleccione</option>
              <option value="Soporte">Soporte</option>
              <option value="Gerencia">Gerencia</option>
            </Form.Select>

          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Ingresar
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;