import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Card, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import { useAdmin } from "../context/AdminContext";

const DetalleCliente = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { admin } = useAdmin();

  const [cliente, setCliente] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        setCargando(true);
        setError(null);
        const respuesta = await axios.get(`https://fakestoreapi.com/users/${id}`);
        setCliente(respuesta.data);
      } catch (err) {
        if (err.response) {
          switch (err.response.status) {
            case 404:
              setError("Recurso no encontrado (404)");
              break;

            case 500:
              setError("Error interno del servidor (500)");
              break;

            default:
              setError(
                `Error ${err.response.status}: ${err.response.statusText}`
              );
          }
        } else if (err.request) {
          setError("No se pudo conectar con el servidor");
        } else {
          setError(err.message);
        }
      } finally {
        setCargando(false);
      }
    };

    obtenerCliente();
  }, [id]);

  const esGerencia = admin?.sector === "Gerencia";

  const manejarEliminar = async () => {
    try {
      await axios.delete(`https://fakestoreapi.com/users/${id}`);
      setMensaje("Cliente eliminado correctamente.");
      setTimeout(() => {
        navigate("/clientes");
      }, 1500);
    } catch (err) {
      setMensaje("Ocurrió un error al eliminar el cliente.");
      setTimeout(() => setMensaje(null), 3000);
    }
  };

   return (
    <Container className="mt-4">
      <h2>Ficha Completa del Cliente</h2>

      {cargando && (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {mensaje && <Alert variant="info">{mensaje}</Alert>}

      {!cargando && !error && cliente && (
        <>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>
                {cliente.name.firstname} {cliente.name.lastname}
              </Card.Title>
              <Card.Subtitle className="mb-0 text-muted">
                ID: {cliente.id}
              </Card.Subtitle>
            </Card.Body>
          </Card>

          <Row>
            <Col md={6}>
              <Card className="mb-4 shadow-sm h-100">
                <Card.Body>
                  <Card.Title as="h5">Datos de Contacto y Acceso</Card.Title>
                  <p><strong>Email:</strong> {cliente.email}</p>
                  <p><strong>Teléfono:</strong> {cliente.phone}</p>
                  <p><strong>Usuario:</strong> {cliente.username}</p>
                  <p><strong>Contraseña:</strong> {cliente.password}</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="mb-4 shadow-sm h-100">
                <Card.Body>
                  <Card.Title as="h5">Dirección</Card.Title>
                  <p><strong>Calle:</strong> {cliente.address.street}</p>
                  <p><strong>Número:</strong> {cliente.address.number}</p>
                  <p><strong>Código Postal:</strong> {cliente.address.zipcode}</p>
                  <p><strong>Ciudad:</strong> {cliente.address.city}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {esGerencia && (
            <Button variant="danger" onClick={manejarEliminar}>
              Eliminar Cliente de la Base de Datos
            </Button>
          )}
        </>
      )}

      <div className="mt-3">
        <Link to="/clientes">
          <Button variant="secondary">Volver al Listado</Button>
        </Link>
      </div>
    </Container>
  );
};

export default DetalleCliente;