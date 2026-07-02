import { Link } from "react-router-dom";
import { useState } from "react";
import { Container, Table, Spinner, Alert, Button, Card } from "react-bootstrap";
import { useClientes } from "../context/ClienteContext";

const ListaClientes = () => {
  const { clientes, cargando, error } = useClientes();
  const [nombre, setNombre] = useState("");

  const clientesFiltrados = clientes.filter(c => {
    const texto = nombre.toLowerCase();

    const apellido = c.name?.lastname.toLowerCase().includes(texto);
    const ciudad = c.address?.city.toLowerCase().includes(texto);

    return apellido || ciudad;
  });

  return (
    <Container className="mt-4">
      <Card className="shadow-sm border-0 mb-5">
        {/* HEADER */}
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            <strong>Lista de Clientes</strong>
          </h4>
          <Link to="/dashboard">
            <Button variant="success" size="sm">
              <strong>Volver a las opciones</strong>
            </Button>
          </Link>
        </Card.Header>
        <Card.Body>
          {/* BUSCADOR */}
          <div className="mb-4">
            <input type="text" className="form-control w-50" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Buscar por apellido o ciudad" />
          </div>
          {/* LOADING */}
          {cargando && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
          {/* ERROR */}
          {error && <Alert variant="danger">{error}</Alert>}
          {/* TABLA */}
          {!cargando && !error && (
            <Table striped hover responsive className="align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombre Completo</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Ciudad</th>
                  <th className="text-center">Ficha Personal</th>
                </tr>
              </thead>
              <tbody>
                {clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>
                      {cliente.name.firstname} {cliente.name.lastname}
                    </td>
                    <td>{cliente.email}</td>
                    <td>{cliente.phone}</td>
                    <td>{cliente.address.city}</td>
                    <td className="text-center">
                      <Link to={`/clientes/${cliente.id}`}>
                        <Button variant="success" size="sm">
                          <strong>Ver Ficha Completa</strong>
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ListaClientes;