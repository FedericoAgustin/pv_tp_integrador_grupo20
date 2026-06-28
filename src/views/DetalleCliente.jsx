import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Card, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import { useAdmin } from "../context/AdminContext";
import CardInfoDetalle from "../components/common/CardInfoDetalle";

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
    <Container className="py-4">
      <h2 className="fw-bold text-primary mb-4">
        Ficha Completa del Cliente
      </h2>
      {cargando && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {mensaje && <Alert variant="success">{mensaje}</Alert>}
      {!cargando && !error && cliente && (
        <>
          {/* Cabecera */}
          <Card className="shadow border-0 rounded-4 mb-4">
            <Card.Body>
              <h3 className="mb-1">
                {cliente.name.firstname} {cliente.name.lastname}
              </h3>
              <p className="text-muted mb-0">
                Cliente N.º {cliente.id}
              </p>
            </Card.Body>
          </Card>
          <Row className="g-4">
            <Col md={6}>
              <CardInfoDetalle
                headerColor="bg-primary"
                titulo="Datos de Contacto"
                datos={[
                  { label: "Email", valor: cliente.email },
                  { label: "Teléfono", valor: cliente.phone },
                  { label: "Usuario", valor: cliente.username },
                  { label: "Contraseña", valor: cliente.password }
                ]}
              />
            </Col>
            <Col md={6}>
              <CardInfoDetalle
                headerColor="bg-secondary"
                titulo="Dirección"
                datos={[
                  { label: "Calle", valor: cliente.address.street },
                  { label: "Número", valor: cliente.address.number },
                  { label: "Código Postal", valor: cliente.address.zipcode },
                  { label: "Ciudad", valor: cliente.address.city }
                ]}
              />
            </Col>
          </Row>
          <div className="d-flex gap-2 mt-4">
            <Link to="/clientes">
              <Button variant="outline-secondary">
                Volver al listado
              </Button>
            </Link>
            {esGerencia && (
              <Button variant="outline-danger" onClick={manejarEliminar} >
                Eliminar Cliente
              </Button>
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default DetalleCliente;