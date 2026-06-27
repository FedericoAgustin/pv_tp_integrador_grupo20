import axios from "axios";

const API_URL = "https://fakestoreapi.com/users";

const manejarErrores = (error) => {

    if (error.response) {
        switch (error.response.status) {
            case 404:
                throw new Error("Recurso no encontrado (404)");

            case 500:
                throw new Error("Error interno del servidor (500)");

            default:
                throw new Error(
                    `Error ${error.response.status}: ${error.response.statusText}`
                );
        }
    }

    if (error.request) {
        throw new Error("No se pudo conectar con el servidor");
    }

    throw new Error(
        `Error al procesar la solicitud: ${error.message}`
    );
};


const clientesServices = (() => {
    // Obtener todos los clientes real
    const listarClientes = async () => {
        try {

            const { data } = await axios.get(API_URL);
            return [...data];

        }
        catch (error) {
            console.error("Error al obtener clientes:", error);
            manejarErrores(error);
        }
    };

    // Agregar cliente, esto va a ser simulado ya que no podemos agregar clientes a la API directamente, pero vamos a simularlo con un POST request
    const agregarCliente = async (cliente) => {
        try {

            const { data } = await axios.post(API_URL, cliente);
            return data;
        }

        catch (error) {
            console.error("Error al agregar cliente:", error);
            manejarErrores(error);
        }
    };

    // Eliminar cliente, lo mismo que agregar, va a ser simulado ya que no podemos eliminar clientes de la API directamente, pero vamos a simularlo con un DELETE request
    const eliminarCliente = async (id) => {
        try {

            const { data } = await axios.delete(`${API_URL}/${id}`);
            return data;

        }
        catch (error) {

            console.error("Error al eliminar cliente:", error);
            manejarErrores(error);

        }
    };

    return {
        listarClientes,
        agregarCliente,
        eliminarCliente
    };
})();

export default clientesServices;