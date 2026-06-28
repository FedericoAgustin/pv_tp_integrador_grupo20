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


    return (
        <ClientesContext.Provider
            value={{
                clientes,
                cargando,
                error,
                eliminarCliente,

            }}
        >
            {children}
        </ClientesContext.Provider>
    );
};
export const useClientes = () => useContext(ClientesContext);