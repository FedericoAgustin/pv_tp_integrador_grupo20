import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Table, Spinner, Alert, Button } from "react-bootstrap";
import clientesServices from "../service/clientesServices";


const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
    const [nombre, setNombre] = useState("");
    const [clienteEncontrado,setClienteEncontrado]=useState([]);


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
    const valor=e.target.value;
    setNombre(valor);
    setClientes(buscarProyectos(valor));
  }

  
  return (
    <Container className="mt-4">
      <h2>Clientes</h2>
      <div className="mb-3">
        <input type="text" className="form-control w-50" value={nombre} onChange={(e)=>{handleBuscar(e)}} placeholder=""/>
      </div>

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
              <th>Ficha Personal</th>
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
                <td>
                  <Link to={`/clientes/${cliente.id}`}>
                    <Button variant="success" size="sm">
                      Ver Ficha Completa
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ListaClientes;