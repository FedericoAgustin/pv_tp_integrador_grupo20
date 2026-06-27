import { Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Login from "./views/Login";
import RutaProtegida from "./components/common/RutaProtegida";
import Dashboard from "./views/Dashboard";
import ListaClientes from "./views/ListaClientes";
import Layout from "./components/layout/Layout";
// import DetalleCliente from "./views/DetalleCliente";

const App = () => {
  return (

    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<RutaProtegida> <Layout /> </RutaProtegida>} >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="clientes" element={<ListaClientes />} />
        {/* <Route path="clientes/:id" element={<DetalleCliente />} /> */}
      </Route>
    </Routes>

  );
};

export default App;