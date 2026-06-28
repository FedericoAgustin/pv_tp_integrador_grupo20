import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Table, Spinner, Alert, Button, Card } from "react-bootstrap";
import clientesServices from "../service/clientesServices";


const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [nombre, setNombre] = useState("");
  const [clienteEncontrado, setClienteEncontrado] = useState([]);


  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        setCargando(true);
        setError(null);
        const respuestaClientes = await clientesServices.listarClientes();
        setClientes(respuestaClientes);
        setClienteEncontrado(respuestaClientes);
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
  const buscarProyectos = (nombre) => {
    let resultado = clienteEncontrado.filter(c => {
      const apellido = c.name.lastname.toLowerCase().includes(nombre.toLowerCase());
      const ciudad = c.address.city.toLowerCase().includes(nombre.toLowerCase());
      return apellido || ciudad;
    });

    return resultado;
  }

  const handleBuscar = (e) => {
    const valor = e.target.value;
    setNombre(valor);
    setClientes(buscarProyectos(valor));
  }

  return (
    <Container className="mt-4">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            <strong>Lista de Clientes</strong>
          </h4>
          <Link to="/dashboard">
            <Button variant="success" size="sm"><strong>Volver a las opciones</strong></Button>
          </Link>
        </Card.Header>

        <Card.Body>
          <div className="mb-4">
            <input type="text" className="form-control w-50" value={nombre} onChange={(e) => handleBuscar(e)} placeholder="Buscar por apellido o ciudad" />
          </div>
          {cargando && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
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
                {clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.name.firstname} {cliente.name.lastname}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.phone}</td>
                    <td>{cliente.address.city}</td>
                    <td className="text-center">
                      <Link to={`/clientes/${cliente.id}`}>
                        <Button variant="success" size="sm"><strong>Ver Ficha Completa</strong></Button>
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