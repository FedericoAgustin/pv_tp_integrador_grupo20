import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Table, Spinner, Alert } from "react-bootstrap";
import clientesServices from "../service/clientesServices";

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        setCargando(true);
        setError(null);
        const respuestaClientes = await clientesServices.listarClientes();
        setClientes(respuestaClientes);
      }
      catch (err) {
        setError(err.message);
      }
      finally {
        setCargando(false);
      }
    };

    obtenerClientes();
  }, []);
  /** */

  return (
    <Container className="mt-4">
      <h2>Clientes</h2>

      {cargando && (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!cargando && !error && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Ciudad</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.name.firstname} {cliente.name.lastname}</td>
                <td>{cliente.email}</td>
                <td>{cliente.phone}</td>
                <td>{cliente.address.city}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ListaClientes;