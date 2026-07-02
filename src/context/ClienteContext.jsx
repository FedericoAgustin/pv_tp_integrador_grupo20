import { createContext, useContext, useEffect, useState } from "react";
import clientesServices from "../service/clientesServices";

const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarClientes = async () => {
            try {
                setCargando(true);
                const data = await clientesServices.listarClientes();
                setClientes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        cargarClientes();
    }, []);

    const eliminarCliente = async (id) => {
        try {
            await clientesServices.eliminarCliente(id);

            setClientes(prev =>
                prev.filter(c => Number(c.id) !== Number(id))
            );

        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const agregarCliente = async (cliente) => {
  try {
    await clientesServices.agregarCliente(cliente);

    const maxId = clientes.length > 0 ? Math.max(...clientes.map(c => Number(c.id))) : 0;

    const clienteNormalizado = {
      id: maxId + 1,
      email: cliente.email,
      username: cliente.username,
      password: cliente.password,
      phone: cliente.phone,
      name: {
        firstname: cliente.name.firstname,
        lastname: cliente.name.lastname,
      },
      address: {
        city: cliente.address.city,
        street: cliente.address.street,
        number: cliente.address.number,
        zipcode: cliente.address.zipcode,
        geolocation: {
          lat: cliente.address.geolocation.lat,
          long: cliente.address.geolocation.long,
        }
      }
    };

    setClientes(prev => [...prev, clienteNormalizado]);

    return clienteNormalizado;

  } catch (err) {
    setError(err.message);
    throw err;
  }
};

    return (
        <ClientesContext.Provider
            value={{
                clientes,
                cargando,
                error,
                eliminarCliente,
                agregarCliente,

            }}
        >
            {children}
        </ClientesContext.Provider>
    );
};
export const useClientes = () => useContext(ClientesContext);