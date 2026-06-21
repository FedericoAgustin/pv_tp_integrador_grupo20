import { Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { AdminProvider } from "./context/AdminContext";
import Login from "./views/Login";
import RutaProtegida from "./components/common/RutaProtegida";
import Dashboard from "./views/Dashboard";
import ListaClientes from "./views/ListaClientes";

const App = () => {
  return (
    <AdminProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<RutaProtegida><Dashboard /></RutaProtegida>}/>
        <Route path="/clientes" element={<RutaProtegida><ListaClientes /></RutaProtegida>}/>
      </Routes>
    </AdminProvider>
  );
};

export default App;