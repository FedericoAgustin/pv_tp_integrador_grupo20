import { Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { AdminProvider } from "./context/AdminContext";
import Login from "./views/Login";
import RutaProtegida from "./components/common/RutaProtegida";
import Dashboard from "./views/Dashboard";
import ListaClientes from "./views/ListaClientes";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <AdminProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<RutaProtegida><Layout /></RutaProtegida>}        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<ListaClientes />} />
        </Route>
      </Routes>
    </AdminProvider>
  );
};

export default App;