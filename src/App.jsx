import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import RutaProtegida from "./components/common/RutaProtegida";
import Dashboard from "./views/Dashboard";
import ListaClientes from "./views/ListaClientes";
import Layout from "./components/layout/Layout";
import DetalleCliente from "./views/DetalleCliente";
import FormAltaCliente from "./components/common/FormAltaCliente";

const App = () => {
  return (

    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<RutaProtegida> <Layout /> </RutaProtegida>} >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="clientes" element={<ListaClientes />} />
        <Route path="clientes/:id" element={<DetalleCliente />} />
        <Route path="clientes/new" element={<FormAltaCliente />} />
      </Route>
    </Routes>

  );
};

export default App;